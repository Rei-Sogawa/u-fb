import {
  createConverter,
  createTypedCollectionRef,
  createTypedDocRef,
  Timestamp,
  WithIdAndRef,
} from "@u";

import { User } from "./user";

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Todo extends ITodo {}
export class Todo {
  static readonly converter = createConverter<TodoData>();

  static readonly collectionPath = ({ userId }: { userId: string }) =>
    ["users", userId, "todos"].join("/");

  static readonly docPath = ({ userId, todoId }: { userId: string; todoId: string }) =>
    ["users", userId, "todos", todoId].join("/");

  static readonly collectionRef = createTypedCollectionRef(this.collectionPath, this.converter);

  static readonly docRef = createTypedDocRef(this.docPath, this.converter);

  constructor(init: ITodo) {
    Object.assign(this, init);
  }

  toData() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ref, ...data } = this;
    return data;
  }
}
