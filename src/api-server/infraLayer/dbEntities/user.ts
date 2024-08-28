import { Column, Entity, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity({
  name: "user",
})
export class User extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  account!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;
}
