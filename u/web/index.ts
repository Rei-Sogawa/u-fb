import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  Timestamp,
} from "firebase/firestore";

export { DocumentReference, Timestamp };

export type WithIdAndRef<Data> = { id: string; ref: DocumentReference } & Data;

export const createConverter = <Data>(): FirestoreDataConverter<Data> => {
  return {
    toFirestore: (data) => {
      return data as DocumentData;
    },
    fromFirestore: (snap, options) => {
      return snap.data(options) as Data;
    },
  };
};
