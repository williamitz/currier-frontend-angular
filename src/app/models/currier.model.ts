export class CurrierModel {
  _id: string;
  observation: string;
  weight: number;
  coordsOrigin: ICoords;
  coordsFinish: ICoords;

  constructor() {
    this._id = '';
    this.observation = '';
    this.weight = null;
    this.coordsOrigin = { latitude : -12.040824100078229, longitude: -77.04198469848635 };
    this.coordsFinish = { latitude : -12.043678124669363, longitude: -77.02327360839845 };
  }
}


interface ICoords {
  latitude: number;
  longitude: number;
}
