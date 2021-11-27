import {
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  Timestamp,
  collection,
  doc,
  serverTimestamp,
  FieldValue,
} from "firebase/firestore";

export {
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  Timestamp,
  serverTimestamp,
  FieldValue,
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

export const createTypedCollectionRef = <Data, CollectionPath extends (...args: any) => string>(
  collectionPath: CollectionPath,
  converter: FirestoreDataConverter<Data>
) => {
  return (db: Firestore, ...collectionPathArgs: Parameters<CollectionPath>) => {
    return collection(db, collectionPath(collectionPathArgs)).withConverter(converter);
  };
};

export const createTypedDocRef = <Data, DocPath extends (...args: any) => string>(
  docPath: DocPath,
  converter: FirestoreDataConverter<Data>
) => {
  return (db: Firestore, ...docPathArgs: Parameters<DocPath>) => {
    return doc(db, docPath(docPathArgs)).withConverter(converter);
  };
};
