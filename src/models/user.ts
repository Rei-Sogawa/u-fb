import { createConverter, DocumentReference, Timestamp, WithIdAndRef } from "u";

export type UserData = {
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type IUser = WithIdAndRef<UserData>;

export class User implements IUser {
  id: string;
  ref: DocumentReference;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  static collectionPath = () => "users";
  static docPath = ({ userId }: { userId: string }) => `users/${userId}`;
  static converter = createConverter<UserData>();

  constructor({ id, ref, name, createdAt, updatedAt }: IUser) {
    this.id = id;
    this.ref = ref;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get typedRef() {
    return this.ref.withConverter(User.converter);
  }

  validate() {
    return this.name.length < 25;
  }
}
