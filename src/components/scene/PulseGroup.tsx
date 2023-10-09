import { useContext } from "react";

import RandomSpheres from "./RandomSpheres";
import Sphere from './Sphere';
import PSEContext from "../../utils/PSEContext";

const PulseGroup = (): JSX.Element => {
  const ctx = useContext(PSEContext);
  const stations = ctx === null ? [] : ctx.getElementsByTagName("Station");

  return (
    <object3D>
      <RandomSpheres />

      {stations.map(({
        attributes: { code },
        children
      }) => {
        const longitude = children.find(child => child.name === "Longitude");
        const latitude = children.find(child => child.name === "Latitude");

        return (
          <Sphere
            key={code}
            longitude={longitude.value}
            latitude={latitude.value}
          />
        );
      })}
    </object3D>
  )
}

export default PulseGroup