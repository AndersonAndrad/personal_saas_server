import { TaskRepositoryDb } from '@app/core/db-repositories/tasks-repository.interface';
import { PaginatedResponse } from '@app/core/interfaces/response.interface';
import { Filter, Pause, Task, TaskNotation } from '@app/core/interfaces/tasks.interface';
import { TasksSchemaValidator } from '@app/core/schame-validation/tasks-schema.validation';
import { TaskRepositorySymbol } from '@app/infra/db/mongoose/repositories/mongoose-tasks.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TaskRepositorySymbol) private readonly taskRepostiory: TaskRepositoryDb,
    private readonly taskSchemaValidator: TasksSchemaValidator,
  ) {}

  async retrieveAllTasks(): Promise<Task[]> {
    return this.taskRepostiory.retrieveAllTasks();
  }

  async create(task: Pick<Task, 'name' | 'description' | 'project' | 'scheduled'>): Promise<Task> {
    this.taskSchemaValidator.createTasksValidate(task);

    if (!task.scheduled) {
      task['start'] = new Date();
    }

    return await this.taskRepostiory.create(task);
  }

  async findOne(taskId: Task['_id']): Promise<Task> {
    this.taskSchemaValidator.idEntityValidate(taskId);

    return await this.taskRepostiory.findOne(taskId);
  }

  async findAll(filter?: Filter): Promise<PaginatedResponse<Task>> {
    return await this.taskRepostiory.findAll(filter);
  }

  async update(taskId: Task['_id'], task: Partial<Omit<Task, '_id'>>): Promise<void> {
    this.taskSchemaValidator.updateTasksValidate({ _id: taskId, ...task });

    await this.taskRepostiory.update(taskId, task);
  }

  async delete(taskId: Task['_id']): Promise<void> {
    this.taskSchemaValidator.idEntityValidate(taskId);

    await this.taskRepostiory.delete(taskId);
  }

  async toggleStatusPause(taskId: Task['_id'], pauseTask: Partial<Omit<Pause, '_id'>>): Promise<void> {
    this.taskSchemaValidator.idEntityValidate(taskId);

    await this.taskRepostiory.pause(taskId, pauseTask);
  }

  async addNotation(taskId: Task['_id'], notation: Pick<TaskNotation, 'notation'>): Promise<void> {
    this.taskSchemaValidator.addNotationValidate(taskId, notation);

    await this.taskRepostiory.addNotation(taskId, notation);
  }

  async finishTask(taskId: Task['_id']): Promise<void> {
    this.taskSchemaValidator.idEntityValidate(taskId);

    await this.taskRepostiory.finishTask(taskId);
  }

  async deleteNotation(taskId: Task['_id'], notationId: TaskNotation['_id']): Promise<void> {
    this.taskSchemaValidator.idEntityValidate(taskId);
    this.taskSchemaValidator.idEntityValidate(notationId);

    await this.taskRepostiory.deleteNotation(taskId, notationId);
  }

  async getNotationsByTask(taskId: Task['_id']): Promise<TaskNotation[]> {
    return this.taskRepostiory.getNotationsByTask(taskId);
  }

  async pause(taskId: Task['_id'], pauseTask: Partial<Omit<Pause, '_id'>>): Promise<void> {
    return this.taskRepostiory.pause(taskId, pauseTask);
  }

  async startTask(taskId: Task['_id']): Promise<void> {
    return this.update(taskId, { start: new Date(), scheduled: false });
  }
}
