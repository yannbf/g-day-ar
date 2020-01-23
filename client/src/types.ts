export type Point3D = [number, number, number];
export type BoxType = {
  dimensions: Point3D;
  position: Point3D;
  velocity?: number;
  onCollision?: Function;
};
