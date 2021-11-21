import { createConverter, DocumentReference, Timestamp, WithIdAndRef } from "@u";
import { User, UserData } from "src";

export type TodoData = {
  title: string;
  completed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  creator: {
    id: User["id"];
    ref: User["ref"];
  };
};

export type ITodo = WithIdAndRef<TodoData>;

export class Todo implements ITodo {
  static readonly converter = createConverter<UserData>();
  static collectionPath = () => {
    return "todos";
  };
  static docPath = ({ todoId }: { todoId: string }) => {
    return `todos/${todoId}`;
  };

  readonly id: string;
  readonly ref: DocumentReference;
  readonly title: string;
  readonly completed: boolean;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly creator: {
    id: User["id"];
    ref: User["ref"];
  };

  constructor({ id, ref, title, completed, createdAt, updatedAt, creator }: ITodo) {
    this.id = id;
    this.ref = ref;
    this.title = title;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.creator = creator;
  }

  toData(): TodoData {
    const { id, ref, ...data } = this;
    return data;
  }
}
