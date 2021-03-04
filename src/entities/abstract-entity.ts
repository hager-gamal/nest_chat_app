import {
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ObjectIdColumn
  } from 'typeorm';

  import { ObjectID } from 'mongodb'
import { Exclude } from 'class-transformer';
  export abstract class AbstractEntity extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    //@Number()
    @Exclude()
    _id: ObjectID;
    
    @CreateDateColumn()
    createdAt: Date;
  
    //@UpdateDateColumn()
    //updatedAt?: Date;
  }
  