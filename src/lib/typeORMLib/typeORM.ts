import { DataSource, DataSourceOptions } from "typeorm";

export class TypeORM {
  static createConnection(options: DataSourceOptions) {
    const appDataSource = new DataSource(options);
    appDataSource
      .initialize()
      .then(() => console.log("Connection to database established"))
      .catch((err) => console.error("Error connecting to database", err));
    return appDataSource;
  }
}
