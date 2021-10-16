import { PonyModel } from './PonyModel';

export interface RaceModel {
  id: number;
  name: string;
  ponies: PonyModel[];
  startInstant: string;
}
