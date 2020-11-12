import React from 'react';
import { ICar } from './demo';

interface IProps {
  car: ICar;
}

export const CarItems: React.FC<IProps> = (props) => {
  return (
    <div>
      <h1>{props.car.color}</h1>
    </div>
  );
};


