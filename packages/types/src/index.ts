export * from './dto/auth.dto.js';
export * from './dto/tasks.dto.js';
export * from './enums.js';
import { Priority, Status } from './enums.js';

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: Priority;
  author: User[];
  status: Status;
  assignedUsers: User[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  task: Task;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  type: 'TASK_ASSIGNED' | 'STATUS_CHANGED' | 'NEW_COMMENT';
  userId: string;
  taskId: string;
  read: boolean;
  createdAt: Date;
}

export type TaskEvent =
  | { type: 'task.created'; payload: Task }
  | { type: 'task.updated'; payload: Task }
  | { type: 'task.comment.created'; payload: Comment };
