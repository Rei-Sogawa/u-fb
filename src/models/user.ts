import {
  createConverter,
  FieldValue,
  Timestamp,
  WithIdAndRef,
  serverTimestamp,
  createTypedCollectionRef,
  createTypedDocRef,
} from "@u";
import { Merge } from "type-fest";

export type UserData = {
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type IUser = WithIdAndRef<UserData>;

export interface User extends IUser {}

type DefaultDataToReturn = Merge<UserData, { createdAt: FieldValue; updatedAt: FieldValue }>;

export class User {
  static readonly convertor = createConverter<UserData>();
  static readonly collectionPath = () => "users";
  static readonly docPath = ({ userId }: { userId: string }) => `users/${userId}`;
  static readonly collectionRef = createTypedCollectionRef(this.collectionPath, this.convertor);
  static readonly docRef = createTypedDocRef(this.docPath, this.convertor);

  static readonly defaultDataTo = (): DefaultDataToReturn => ({
    name: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  constructor(init: IUser) {
    Object.assign(this, init);
  }
}
