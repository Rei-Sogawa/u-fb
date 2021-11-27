import {
  DocumentData,
  DocumentReference,
  FieldValue,
  Firestore,
  FirestoreDataConverter,
  Timestamp,
} from "firebase-admin/firestore";

const serverTimestamp = FieldValue.serverTimestamp;

export {
  DocumentReference,
  FieldValue,
  Firestore,
  FirestoreDataConverter,
  serverTimestamp,
  Timestamp,
};

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTypedCollectionRef = <Data, CollectionPath extends (...args: any) => string>(
  collectionPath: CollectionPath,
  convertor: FirestoreDataConverter<Data>
) => {
  return (db: Firestore, ...collectionPathArgs: Parameters<CollectionPath>) => {
    return db.collection(collectionPath(collectionPathArgs)).withConverter(convertor);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTypedDocRef = <Data, DocPath extends (...args: any) => string>(
  docPath: DocPath,
  converter: FirestoreDataConverter<Data>
) => {
  return (db: Firestore, ...docPathArgs: Parameters<DocPath>) => {
    return db.doc(docPath(docPathArgs)).withConverter(converter);
  };
};
