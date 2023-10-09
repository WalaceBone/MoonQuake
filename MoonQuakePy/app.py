from flask import Flask, jsonify
from obspy import read, read_inventory, UTCDateTime
import numpy as np
import matplotlib.pyplot as plt
import os

import csv

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Welcome to the ObsPy-Three.js Backend!'

@app.route('/seismic_data')
def seismic_data():
    # file = open('MoonQuakePy/ressources/mseed/xa.s16.00.mh1.1972.112.0.mseed', 'r')
    # # Read seismic data using ObsPy (replace with your data file)
    # Obtenez le chemin absolu du fichier en utilisant os.path.join
    shz = "ressources/mseed/xa.s16..shz.1972.112.0.mseed"
    mhz = "ressources/mseed/xa.s16.00.mhz.1972.112.0.mseed"
    mh1 = "ressources/mseed/xa.s16.00.mh1.1972.112.0.mseed"
    mh2 = "ressources/mseed/xa.s16.00.mh2.1972.112.0.mseed"
    att = "ressources/mseed/xa.s16..att.1972.112.0.mseed"
    
    st = read(mh1)
    st += read(shz)
    st += read(mhz)
    st += read(mh2)
    st += read(att)

    #st.plot('plot.png')
    st.sort(['starttime'])
    st.normalize()
    t0 = st[0].stats.starttime

    fig, axes = plt.subplots(nrows=len(st)+1, sharex=True)
    ax = None

    st.plot(outfile='sorted_plot.png')
    
    for (tr, ax) in zip(st, axes):
        ax.plot(tr.times(reftime=t0), tr.data)

    st.merge(method=1)
    axes[-1].plot(st[0].times(reftime=t0), st[0].data, 'r')
    axes[-1].set_xlabel(f'seconds relative to {t0}')
    plt.show()
    plt.savefig("matplotlib")

    # Process the data and extract necessary information
    # For example, you can return the number of traces in the stream
    print(st)
    
    num_traces = len(st)
   
    st.filter('highpass', freq=0.5, corners=2, zerophase=True)
    st.plot(outfile='plot_filter.png')


    # Return the data as JSON
    for t in st:
        print(t.data)

    
    return jsonify("OK")

if __name__ == '__main__':
    app.run(debug=True)


    #for t in st:
    #     t = tr.times()
    #     data = tr.data
    #     i = 0
    #     for d in data:
    #         data[i] = d * 0.08
    #         i+=1
    #     i = 0
    #     for d in data:
    #         data[i] = round(d, 2)
    #         i+=1
    #     data = list(set(data))
    #     plt.plot(t, data)
    # plt.savefig('plot_matplotlib_filter.png')

    # ##plt.ylabel()


    # csv_name = "du.csv"
    # print(data[0])
    # i = 0
    # for d in data:
    #     data[i] = round(d, 2)
    #     i+=1


    # with open(csv_name, 'w') as csv_file:
    #     writer = csv.writer(csv_file, delimiter=' ') 
    #     # Write the data rows
    #     for row in list(set(data)):
    #         print(row)
    #         r = []
    #         r.append(row)
    #         writer.writerow(r)
