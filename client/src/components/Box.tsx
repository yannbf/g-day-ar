import React from 'react';
import {ViroBox} from 'react-viro';
import {BoxType} from '../types';

export const Box: React.FC<BoxType> = ({dimensions, position}) => {
  return (
    <ViroBox
      dragType="FixedToPlane"
      dragPlane={{
        planePoint: [0, -1.5, 0],
        planeNormal: [0, 1, 0],
        maxDistance: 10,
      }}
      width={dimensions[0]}
      height={dimensions[1]}
      length={dimensions[2]}
      position={position}
      materials={['green']}
      physicsBody={{
        type: 'Dynamic',
        mass: 0,
        restitution: 1,
        shape: {
          type: 'Box',
          params: dimensions,
        },
        force: {value: [10, 0, 0]},
      }}
    />
  );
};
