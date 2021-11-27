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

export type Data = {
  title: string;
  completed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  creator: {
    id: User["id"];
    ref: User["ref"];
  };
};

export type IModel = WithIdAndRef<Data>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Model extends IModel {}
// export class Model {
//   constructor(init: IModel) {
//     Object.assign(this, init);
//   }
// }

export const converter = createConverter<Data>();

export const collectionPath = ({ userId }: { userId: string }) => `users/${userId}/todos`;

export const docPath = ({ userId, todoId }: { userId: string; todoId: string }) =>
  `users/${userId}/todos/${todoId}`;

export const collectionRef = createTypedCollectionRef(collectionPath, converter);

export const docRef = createTypedDocRef(docPath, converter);

type DefaultDataToReturn = Omit<
  Merge<Data, { createdAt: FieldValue; updatedAt: FieldValue }>,
  "creator"
>;

export const defaultDataTo = (): DefaultDataToReturn => ({
  title: "",
  completed: false,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
});
