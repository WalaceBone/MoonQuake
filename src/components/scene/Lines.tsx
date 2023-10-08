import { Line } from '@react-three/drei'

interface LineProps {
  color?: number
  lat?: number
  long?: number
  az?: number
}

interface Vector {
  x: number;
  y: number;
  z: number;
}

const calculateInclination = (vector: Vector): number => {
  // Calculate the angle between the vector and the Z-axis (horizontal plane)
  const inclinationRad = Math.acos(vector.z / Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2));
  const inclinationDeg = (inclinationRad * 180) / Math.PI;
  return inclinationDeg;
};

const rotateVector = (vector: Vector, azimuth: number, inclination: number): Vector => {
  // Convert azimuth and inclination to radians
  const azimuthRad = (azimuth * Math.PI) / 180;
  const inclinationRad = (inclination * Math.PI) / 180;

  // Calculate the rotated vector
  const cosAzimuth = Math.cos(azimuthRad);
  const sinAzimuth = Math.sin(azimuthRad);
  const cosInclination = Math.cos(inclinationRad);
  const sinInclination = Math.sin(inclinationRad);

  const x = vector.x;
  const y = vector.y;
  const z = vector.z;

  const newX = x * cosAzimuth - y * sinAzimuth;
  const newY = x * sinAzimuth + y * cosAzimuth;
  const newZ = z * cosInclination - y * sinInclination;

  return { x: newX, y: newY, z: newZ };
}

const latLngToCartesian = (longitude: number, latitude: number, radius: number): Vector => {
  const phiRad = (latitude - 90) * (Math.PI / 180);
  const thetaRad = longitude * (Math.PI / 180);

  // console.log(phiRad, thetaRad);

  const x = radius * Math.sin(phiRad) * Math.cos(thetaRad);
  const y = radius * Math.sin(phiRad) * Math.sin(thetaRad);
  const z = radius * Math.cos(phiRad);

  return { x, y, z };
};

const DirectionalVector = ({ long, lat, az }: LineProps): JSX.Element => {
  const vector = latLngToCartesian(long, lat, az)
  const inclinationAngle = calculateInclination(vector);

  // Example usage:
  const originalVector = vector; // Replace with your vector
  const azimuthAngle = az; // Replace with your azimuth angle in degrees
  const rotatedVector = rotateVector(vector, azimuthAngle, inclinationAngle);
  // console.log(`Original Vector: (${originalVector.x}, ${originalVector.y}, ${originalVector.z})`);
  // console.log(`Rotated Vector: (${rotatedVector.x}, ${rotatedVector.y}, ${rotatedVector.z})`);

  const endX = 2 * vector.x;
  const endY = 2 * vector.y;
  const endZ = 2 * vector.z;

  return (
    <Line
      points={[[-vector.x, vector.y, vector.z], [endX, endY, endZ]]} // Define the line's start and end points
      color="green" // Set the line color
      lineWidth={2} // Set the line width
    />
  );
};

export default DirectionalVector;
