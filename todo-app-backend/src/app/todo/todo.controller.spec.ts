import { Body } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entity/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({id: '1', task: 'task-1', isDone:0 }),
  new TodoEntity({id: '2', task: 'task-2', isDone:0 }),
  new TodoEntity({id: '3', task: 'task-3', isDone:0 }),
];

const newTodoEntity = new TodoEntity({ task: 'new-task', isDone: 0 });

const updatedTodoEntity = new TodoEntity({ task: 'task-1', isDone: 1 });

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers:[
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(todoEntityList),
            create: jest.fn().mockResolvedValue(newTodoEntity),
            findOneOrFail: jest.fn().mockResolvedValue(todoEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedTodoEntity),
            deleteById: jest.fn(),          
          }
        }
      ]

      
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('index', () => {
    it('Should return a todo list entity succesfully', async () => {
        const result = await todoController.index();
        expect(result).toEqual(todoEntityList);
        expect(typeof result).toEqual('object');    
        expect(todoService.findAll).toBeCalledTimes(1);  
    });

    it('should trow a exception', () => {
      jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error());

      expect(todoController.index()).rejects.toThrowError();
    })
  });

  describe('create', () => {
    it('should create a new todo item sucessfully', async () => {
      // Arrange
      const body: CreateTodoDto = {
        task: 'new-task',
        isDone: 0
      }

      // Act
      const result = await todoController.create(body);

      // Assert
      expect(result).toEqual(newTodoEntity);
      expect(todoService.create).toHaveBeenCalledTimes(1);
      expect(todoService.create).toHaveBeenCalledWith(body); 
    });

    it('shoud throw an exception', () => {
      const body: CreateTodoDto = {
        task: 'new-task',
        isDone: 0
      }
      
      jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());

      expect(todoController.create(body)).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('shoudt get a todo item successfully', async () => {
      const result = await todoController.show('1');

      expect(result).toEqual(todoEntityList[0]);
      expect(todoService.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(todoService.findOneOrFail).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', async () => {
      jest.spyOn(todoService,'findOneOrFail').mockRejectedValueOnce(new Error());

      expect(todoController.show('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('shoud update a todo item successfully', async () => {
      // arrange
      const body: UpdateTodoDto = {
        task: 'task-1',
        isDone: 1
      }
      
      // act
      const result = await todoController.update('1', body);

      // Assert
      expect(result).toEqual(updatedTodoEntity);
      expect(todoService.update).toHaveBeenCalledTimes(1);
      expect(todoService.update).toHaveBeenCalledWith('1', body);
    });
  });


});  
