import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../helpers/swagger/not-found.swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDtoSwagger } from './swagger/create-todo.swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { ShowTodoSwagger } from './swagger/show-todo.swagger';
import { UpdateTodoSwagger } from './swagger/update-todo.swagger';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({summary: 'List all tasks'})
  @ApiResponse({ status: 200, description: 'List of Tasks', type: IndexTodoSwagger, isArray: true })
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Add a new task'})
  @ApiResponse({ status: 201, description: 'New Task Suscessful added', type: CreateTodoDtoSwagger })
  @ApiResponse({status: 400, description: 'Bad Request', type: BadRequestSwagger})
  async create(@Body() body: CreateTodoDto) {
    return await this.todoService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search for a specific task by id' })
  @ApiResponse({ status: 200, description: 'Task located', type: ShowTodoSwagger })
  @ApiResponse({status: 404, description: 'Task couldn\'t be located', type: NotFoundSwagger })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Task' })
  @ApiResponse({ status: 200, description: 'Task Suscessful Updated', type: UpdateTodoSwagger })
  @ApiResponse({ status: 400, description: 'Invalid Parameters', type: BadRequestSwagger})
  @ApiResponse({ status: 404, description: 'Task couldn\'t be located', type: NotFoundSwagger })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDto) {
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft Delete a task' })
  @ApiResponse({ status: 204, description: 'Task Deleted' })
  @ApiResponse({ status: 404, description: 'Task couldn\'t be located', type: NotFoundSwagger })
  @HttpCode(204)  
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id);
  }
}
