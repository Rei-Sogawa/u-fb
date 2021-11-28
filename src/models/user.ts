import {
  createConverter,
  createTypedCollectionRef,
  createTypedDocRef,
  Timestamp,
  WithIdAndRef,
} from "@u";

export type UserData = {
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type IUser = WithIdAndRef<UserData>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User extends IUser {}
export class User {
  static readonly convertor = createConverter<UserData>();

  static readonly collectionPath = () => "users";

  static readonly docPath = ({ userId }: { userId: string }) => ["users", userId].join("/");

  static readonly collectionRef = createTypedCollectionRef(this.collectionPath, this.convertor);

  static readonly docRef = createTypedDocRef(this.docPath, this.convertor);

  constructor(init: IUser) {
    Object.assign(this, init);
  }

  toData() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ref, ...data } = this;
    return data;
  }
}
