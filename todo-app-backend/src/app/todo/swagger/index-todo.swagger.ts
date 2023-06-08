import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { isArray } from "class-validator";
import { TodoEntity } from "../entity/todo.entity";

export class IndexTodoSwagger extends PartialType( OmitType( TodoEntity, ['createdAt', 'updatedAt', 'deletedAt'])) {}
// {
//     @ApiProperty({ type: TodoEntity, isArray: true })
//     items: TodoEntity[]
// }