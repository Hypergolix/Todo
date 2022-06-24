import { TodoItem } from "../TodoItem/TodoItem.types";

export interface TodoList {
  title: string,
  todoItems: TodoItem[],
  guid: string,
  // Date
}
