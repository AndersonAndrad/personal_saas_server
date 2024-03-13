import { Project } from './project.interface';

export interface Task {
  _id: string;
  name: string;
  description: string;
  project: Omit<Project, 'enable' | 'tasks'>;
  start: Date;
  finish?: Date;
  finished: boolean;
  paused: boolean;
  notations: TaskNotation[];
}

export interface TaskNotation {
  _id: string;
  notation: string;
}
