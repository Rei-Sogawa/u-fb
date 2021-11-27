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

export interface Todo extends ITodo {}

// NOTE: relation は default 値を設定できない
type DefaultDataToReturn = Omit<
  Merge<TodoData, { createdAt: FieldValue; updatedAt: FieldValue }>,
  "creator"
>;

export class Todo implements ITodo {
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
