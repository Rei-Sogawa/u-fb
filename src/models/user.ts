import { createConverter, DocumentReference, Timestamp, WithIdAndRef } from "@u";
import { createTypedFirestore } from "src/helper/create-typed-firestore";

export type UserData = {
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type IUser = WithIdAndRef<UserData>;

export class User implements IUser {
  static readonly firestore = createTypedFirestore({
    converter: createConverter<UserData>(),
    collectionPath: () => "users",
    docPath: ({ userId }: { userId: string }) => `users/${userId}`,
  });

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
    const { id, ref, ...data } = this;
    return data;
  }

  validate(): boolean {
    return this.name.length < 255;
  }
}
