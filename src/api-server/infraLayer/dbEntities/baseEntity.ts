import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @Column()
  createdBy!: string;

  @CreateDateColumn({
    precision: 0,
  })
  createdAt!: Date;

  @Column()
  updatedBy!: string;

  @UpdateDateColumn({
    precision: 0,
  })
  updatedAt!: Date;
}
