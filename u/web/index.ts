import {
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  Timestamp,
  collection,
  doc,
} from "firebase/firestore";

export { DocumentReference, Firestore, FirestoreDataConverter, Timestamp };

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

export const createTypedCollectionRef = <Data>(
  db: Firestore,
  collectionPath: string,
  converter: FirestoreDataConverter<Data>
) => {
  return collection(db, collectionPath).withConverter(converter);
};

export const createTypedDocRef = <Data>(
  db: Firestore,
  docPath: string,
  converter: FirestoreDataConverter<Data>
) => {
  return doc(db, docPath).withConverter(converter);
};
