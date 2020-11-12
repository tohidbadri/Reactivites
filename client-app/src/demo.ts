

export interface ICar {
  color: string;
  model: string;
  topSpeed?: number;
}

const Car1: ICar = {
  color: 'red',
  model: 'BMW',
};

const Car2: ICar = {
  color: 'blue',
  model: 'Benz',
  topSpeed: 100,
};

const multify = (x: any, y: any): string => {
  return (x * y).toString();
};

export const Cars = [Car1, Car2];
