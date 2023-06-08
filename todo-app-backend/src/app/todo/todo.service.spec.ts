import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';

const mockTodoEntityList: TodoEntity[] = [ 
  new TodoEntity({task: 'task-1', isDone: 0}),
  new TodoEntity({task: 'task-2', isDone: 0}),
  new TodoEntity({task: 'task-3', isDone: 0}),
];

const mockData:CreateTodoDto = { task: 'task-X', isDone: 0 };

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository : Repository<TodoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService,{
        provide: getRepositoryToken(TodoEntity),
        useValue: {
          find: jest.fn().mockResolvedValue(mockTodoEntityList),
          findOneOrFail: jest.fn().mockResolvedValue(mockTodoEntityList[2]),
          create: jest.fn().mockReturnValue(mockTodoEntityList[0]),
          merge: jest.fn(). mockReturnValue(mockTodoEntityList[2]),
          save: jest.fn().mockResolvedValue(mockTodoEntityList[0]),
          softDelete: jest.fn().mockReturnValue(undefined),
        }
      }],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<TodoEntity>>(
      getRepositoryToken(TodoEntity),
    )
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
    expect(todoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a todo list entity succesfully',async () => {
      const result = await todoService.findAll();

      expect(result).toEqual(mockTodoEntityList);
      expect(todoRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw a execption', () => {
      jest.spyOn(todoRepository,'find').mockRejectedValueOnce(new Error());

      expect(todoService.findAll()).rejects.toThrowError();

    });

  });

  describe('findOneOrFail', () => {
    it('should return a todo list item', async () => {
      const result = await todoService.findOneOrFail('2');

      expect(result).toEqual(mockTodoEntityList[2]);
      expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(todoRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(todoService.findOneOrFail('1')).rejects.toThrowError(NotFoundException);
    })

  })

  describe('create', () => {
    
    it('should create a new todo entity item succesfully', async ()=>{
      const result = await todoService.create(mockData);

      expect(result).toEqual(mockTodoEntityList[0]);
      expect(todoRepository.create).toHaveBeenCalledTimes(1);
      expect(todoRepository.save).toHaveBeenCalledTimes(1);


    });

    it('should throw an exeption', () => {
      jest.spyOn(todoRepository,'save').mockRejectedValueOnce(new Error());

      expect(todoService.create(mockData)).rejects.toThrowError();
    });

  });

  describe('update', () => {
    it('should update a todo entity item succesfully',async () => {
      const result = await todoService.update('0', mockData);

      expect(result).toEqual(mockTodoEntityList[0]);
      expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(todoRepository.merge).toHaveBeenCalledTimes(1);
      expect(todoRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should trow a not found exception', ()=>{
      jest
        .spyOn(todoRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      expect(todoService.update('1', mockData)).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception', () =>{
      jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());

      expect(todoService.update('1', mockData)).rejects.toThrowError(); 
    }); 
  });

  describe('deleteById', () =>{
    it('should delete a todo entity item succesfully', async() => {
      const result = await todoService.deleteById('1');

      expect(result).toBeUndefined();
      expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(todoRepository.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', async ()=> {
      jest.spyOn(todoRepository,'findOneOrFail').mockRejectedValueOnce(new Error());

      expect(todoService.deleteById('1')).rejects.toThrowError(NotFoundException);
    });

    it('should throw a exception', async ()=> {
      jest.spyOn(todoRepository,'softDelete').mockRejectedValueOnce(new Error());

      expect(todoService.deleteById('1')).rejects.toThrowError();
    });
  });
});
