
import { Priority, Status } from '@repo/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  deadline: Date;

  @Column({ type: 'enum', enum: Priority })
  priority: Priority;

  @Column({ type: 'enum', enum: Status, default: 'TODO' })
  status: Status;

  @ManyToMany(() => User)
  @JoinTable()
  assignedUsers: User[];

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}
