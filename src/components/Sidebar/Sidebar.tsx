import { useContext } from 'react';

import PSEContext from '../../utils/PSEContext';
import './Sidebar.css';

const Sidebar = () => {
  const ctx = useContext(PSEContext);

  if (ctx === null) {
    return;
  }

  const { startDate, endDate } = ctx.attributes;
  const stations = ctx.getElementsByTagName("Station");

  return (
    <aside id="sidebar" className="fixed top-0 mr-6 z-20">
      <h6>Data from {startDate.substr(0, 4)} to {endDate.substr(0, 4)}</h6>
      <ol>
        {stations.map(({ attributes: { code, endDate, startDate } }) => (
          <li key={code}>{`${code} [${startDate.substr(0, 7)}, ${endDate.substr(0, 7)}]`}</li>
        ))}
      </ol>
    </aside>
  );
};

export default Sidebar;
