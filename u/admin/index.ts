import {
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  Timestamp,
} from "firebase-admin/firestore";

export { DocumentReference, Firestore, Timestamp };

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

export const createTypedCollectionRef = <Data>(
  db: Firestore,
  collectionPath: string,
  convertor: FirestoreDataConverter<Data>
) => {
  return db.collection(collectionPath).withConverter(convertor);
};

export const createTypedDocRef = <Data>(
  db: Firestore,
  docPath: string,
  converter: FirestoreDataConverter<Data>
) => {
  return db.doc(docPath).withConverter(converter);
};
