import {
  createConverter,
  createTypedCollectionRef,
  createTypedDocRef,
  FieldValue,
  serverTimestamp,
  Timestamp,
  WithIdAndRef,
} from "@u";
import { User } from "src";
import { Merge } from "type-fest";

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

type DefaultDataToReturn = Omit<
  Merge<TodoData, { createdAt: FieldValue; updatedAt: FieldValue }>,
  "creator"
>;

export class Todo {
  static readonly converter = createConverter<TodoData>();
  static readonly collectionPath = ({ userId }: { userId: string }) => `users/${userId}/todos`;
  static readonly docPath = ({ userId, todoId }: { userId: string; todoId: string }) =>
    `users/${userId}/todos/${todoId}`;
  static readonly collectionRef = createTypedCollectionRef(this.collectionPath, this.converter);
  static readonly docRef = createTypedDocRef(this.docPath, this.converter);

  static readonly defaultDataTo = (): DefaultDataToReturn => ({
    title: "",
    completed: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  constructor(init: ITodo) {
    Object.assign(this, init);
  }
}
