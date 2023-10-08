import { useContext } from 'react';
import { Vector3 } from 'three';

import PSEContext from '../../utils/PSEContext';
import MoveCameraToTarget from '../Utils/MoveCameraToTarget';
import './Sidebar.css';

const Sidebar = () => {
  const ctx = useContext(PSEContext);

  if (ctx === null) {
    return;
  }

  const { startDate, endDate } = ctx.attributes;
  const stations = ctx.getElementsByTagName("Station");

  const handleStationClick = ({ children }) => {
    const longitude = children.find(child => child.name === "Longitude");
    const latitude = children.find(child => child.name === "Latitude");
    const vector = new Vector3(longitude, latitude, 0)

    MoveCameraToTarget({ cameraTarget: vector });
  };

  return (
    <aside id="sidebar" className="fixed top-0 mr-6 z-20">
      <h6>Data from {startDate.substr(0, 4)} to {endDate.substr(0, 4)}</h6>
      <ol>
        {stations.map(station => {
          const { attributes: { code, endDate, startDate } } = station;

          return (
            <li key={code} onClick={() => handleStationClick(station)}>
              {`${code} [${startDate.substr(0, 7)}, ${endDate.substr(0, 7)}]`}
            </li>
          );
        })}
      </ol>
    </aside>
  );
};

export default Sidebar;
