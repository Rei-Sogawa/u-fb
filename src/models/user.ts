import { createConverter, DocumentReference, Timestamp, WithIdAndRef } from "@u";

export type UserData = {
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type IUser = WithIdAndRef<UserData>;

export class User implements IUser {
  static readonly converter = createConverter<UserData>();
  static collectionPath = () => {
    return "users";
  };
  static docPath = ({ userId }: { userId: string }) => {
    return `users/${userId}`;
  };

  readonly id: string;
  readonly ref: DocumentReference;
  readonly name: string;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;

  constructor({ id, ref, name, createdAt, updatedAt }: IUser) {
    this.id = id;
    this.ref = ref;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toData(): UserData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ref, ...data } = this;
    return data;
  }

  validate(): boolean {
    return this.name.length < 255;
  }
}
