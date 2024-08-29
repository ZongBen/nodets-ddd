export class OkResponse {
  status: number = 200;
  data: any;

  constructor(data: any) {
    this.data = data;
  }
}
