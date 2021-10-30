import { DocumentReference, Timestamp, WithIdAndRef, createConverter } from "u";

export type UserData = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type IUser = WithIdAndRef<UserData>;

export class User implements IUser {
  id: string;
  ref: DocumentReference;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  static collectionPath = () => "users";
  static docPath = ({ userId }: { userId: string }) => `users/${userId}`;
  static converter = createConverter<UserData>();

  constructor({ id, ref, createdAt, updatedAt }: IUser) {
    this.id = id;
    this.ref = ref;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get typedRef() {
    return this.ref.withConverter(User.converter);
  }
}
