from flask import Flask, jsonify
from obspy import read
import os

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
    mh1 = "ressources/mseed/xa.s16.00.mh1.1972.112.0.mseed"
    print(mh1)
    # Ouvrez le fichier en utilisant le chemin absolu
    st = read(mh1)
    # Process the data and extract necessary information
    # For example, you can return the number of traces in the stream
    print(st)
    
    num_traces = len(st)
    
    tr = st[0]
    print(tr)
    print(tr.stats)
    print(tr.data)
    st.plot(outfile='mh1.png')
    st.plot(outfile='mh1dayplot.png', type='dayplot')
    st.plot(outfile='mh1section.png', type='section')
    shz = "ressources/mseed/xa.s16..shz.1972.112.0.mseed"
    st = read(shz)
    st.plot(outfile='shz.png')
    
    shz = "ressources/mseed/xa.s16.00.mhz.1977.112.0.mseed"
    st = read(shz)
    st.plot(outfile='mhz.png')
    
    shz = "ressources/mseed/xa.s16.00.mh2.1977.112.0.mseed"
    st = read(shz)
    st.plot(outfile='mh2.png')

    shz = "ressources/mseed/xa.s16..att.1977.112.0.mseed"
    st = read(shz)
    st.plot(outfile='att.png')
    # Return the data as JSON
    data = {
        'num_traces': num_traces,
        'sample_rate': st[0].stats.sampling_rate if num_traces > 0 else None
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
