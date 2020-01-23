import React, {useState} from 'react';
import {ViroBox} from 'react-viro';
import {BoxType} from '../types';

export const Box: React.FC<BoxType> = ({
  dimensions,
  position,
}) => {
  return (
    <ViroBox
      width={dimensions[0]}
      height={dimensions[1]}
      length={dimensions[2]}
      position={position}
      materials={['green']}
      physicsBody={{
        type: 'Static',
      }}
    />
  );
};

export const MovingBox: React.FC<BoxType> = ({dimensions, position, onTransformUpdate}) => {
  const [run, setRun] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setRun(true);
    }, 1000);
  }, []);

  return (
    <ViroBox
      onTransformUpdate={onTransformUpdate}
      width={dimensions[0]}
      height={dimensions[1]}
      length={dimensions[2]}
      position={position}
      materials={['green']}
      physicsBody={{
        type: 'Kinematic',
        mass: 0,
      }}
      animation={{
        name: 'spring',
        run,
        loop: true
      }}
    />
  );
};
