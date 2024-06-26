import { AddNotationDto } from '@app/core/dto/tasks/add-notation.dto';
import { CreateTaskDto } from '@app/core/dto/tasks/create-tasks.dto';
import { FilterTasksDto } from '@app/core/dto/tasks/filter-tasks.dto';
import { PauseTaskDto } from '@app/core/dto/tasks/pause-tasks.dto';
import { UpdateTaskDto } from '@app/core/dto/tasks/update-tasks.dto';
import { Task, TaskNotation } from '@app/core/interfaces/tasks.interface';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TaskService } from './services/tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  @ApiOperation({ description: 'Create a task' })
  create(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.create(task);
  }

  @Get('')
  @ApiOperation({ description: 'Find all tasks' })
  findAll(@Query() filter: FilterTasksDto) {
    return this.taskService.findAll(filter);
  }

  @Get(':taskId')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Find only one task by id' })
  findOne(@Param('taskId') taskId: Task['_id']): Promise<Task> {
    return this.taskService.findOne(taskId);
  }

  @Get(':taskId/:notationId/delete-notation')
  @ApiParam({ name: 'taskId' })
  @ApiParam({ name: 'notationId' })
  @ApiOperation({ description: 'Find only one task by id' })
  deleteNotation(@Param('taskId') taskId: Task['_id'], @Param('notationId') notationId: TaskNotation['_id']): Promise<void> {
    return this.taskService.deleteNotation(taskId, notationId);
  }

  @Get(':taskId/notations')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Get all notations by task id' })
  getNotationsByTask(@Param('taskId') taskId: Task['_id']) {
    return this.taskService.getNotationsByTask(taskId);
  }

  @Get(':taskId/start-task')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Start a scheduled task' })
  startTask(@Param('taskId') taskId: Task['_id']) {
    return this.taskService.startTask(taskId);
  }

  @Delete(':taskId')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Delete only one task by Id' })
  delete(@Param('taskId') taskId: Task['_id']): Promise<void> {
    return this.taskService.delete(taskId);
  }

  @Patch(':taskId')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Update a task' })
  update(@Param('taskId') taskId: Task['_id'], @Body() update: UpdateTaskDto) {
    return this.taskService.update(taskId, update);
  }

  @Patch(':taskId/toggle-status')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Toggle paused status by id' })
  toggleStatusPaude(@Param('taskId') taskId: Task['_id'], @Body() pauseTaskDto: PauseTaskDto): Promise<void> {
    return this.taskService.toggleStatusPause(taskId, pauseTaskDto);
  }

  @Post(':taskId/add-notation')
  @ApiParam({ name: 'taskId' })
  @ApiOperation({ description: 'Add notation in only one task by id' })
  addNotation(@Param('taskId') taskId: Task['_id'], @Body() notation: AddNotationDto) {
    return this.taskService.addNotation(taskId, notation);
  }
}
