import {
  createConverter,
  createTypedCollectionRef,
  createTypedDocRef,
  FieldValue,
  serverTimestamp,
  Timestamp,
  WithIdAndRef,
} from "@u";
import { Merge } from "type-fest";

import { Todo } from "./todo";

export type UserData = {
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

type DefaultData = Merge<UserData, { createdAt: FieldValue; updatedAt: FieldValue }>;

export type IUser = WithIdAndRef<UserData>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User extends IUser {}
export class User {
  static readonly convertor = createConverter<UserData>();

  static readonly collectionPath = () => "users";

  static readonly docPath = ({ userId }: { userId: string }) => ["users", userId].join("/");

  static readonly collectionRef = createTypedCollectionRef(this.collectionPath, this.convertor);

  static readonly docRef = createTypedDocRef(this.docPath, this.convertor);

  static readonly defaultData = (): DefaultData => ({
    name: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  constructor(init: IUser) {
    Object.assign(this, init);
  }
}
