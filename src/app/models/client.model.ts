export class ClientModel {

  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  userName: string;
  userPassword: string;

  constructor() {
    this._id = '';
    this.name = '';
    this.surname = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.latitude = -12.04670;
    this.longitude = -77.03220;
    this.userName = '';
    this.userPassword = '';
  }

}
