import { DocumentReference, Timestamp, WithIdAndRef, createConverter } from "u";

export type UserData = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type IUserModel = WithIdAndRef<UserData>;

export class UserModel {
  id: string;
  ref: DocumentReference;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  constructor({ id, ref, createdAt, updatedAt }: IUserModel) {
    this.id = id;
    this.ref = ref;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static collectionPath() {
    return "users";
  }

  static get converter() {
    return createConverter<UserData>();
  }
}
