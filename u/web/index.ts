import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  FieldValue,
  Firestore,
  FirestoreDataConverter,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

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
    fromFirestore: (snap, options) => {
      return snap.data(options) as Data;
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTypedCollectionRef = <Data, CollectionPath extends (...args: any) => string>(
  collectionPath: CollectionPath,
  converter: FirestoreDataConverter<Data>
) => {
  return (db: Firestore, ...collectionPathArgs: Parameters<CollectionPath>) => {
    return collection(db, collectionPath(collectionPathArgs)).withConverter(converter);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTypedDocRef = <Data, DocPath extends (...args: any) => string>(
  docPath: DocPath,
  converter: FirestoreDataConverter<Data>
) => {
  return (db: Firestore, ...docPathArgs: Parameters<DocPath>) => {
    return doc(db, docPath(docPathArgs)).withConverter(converter);
  };
};
