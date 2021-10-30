import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  Timestamp,
} from "firebase-admin/firestore";

export { DocumentReference, Timestamp };

export type WithIdAndRef<Data> = { id: string; ref: DocumentReference } & Data;

export const createConverter = <Data>(): FirestoreDataConverter<Data> => {
  return {
    toFirestore: (data) => {
      return data as DocumentData;
    },
    fromFirestore: (snap) => {
      return snap.data() as Data;
    },
  };
};
