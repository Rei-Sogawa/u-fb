import {
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  Timestamp,
  FieldValue,
} from "firebase-admin/firestore";

const serverTimestamp = FieldValue.serverTimestamp;

export {
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  Timestamp,
  FieldValue,
  serverTimestamp,
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

export const createTypedCollectionRef = <Data, CollectionPath extends (...args: any) => string>(
  collectionPath: CollectionPath,
  convertor: FirestoreDataConverter<Data>
) => {
  return (db: Firestore, ...collectionPathArgs: Parameters<CollectionPath>) => {
    return db.collection(collectionPath(collectionPathArgs)).withConverter(convertor);
  };
};

export const createTypedDocRef = <Data, DocPath extends (...args: any) => string>(
  docPath: DocPath,
  converter: FirestoreDataConverter<Data>
) => {
  return (db: Firestore, ...docPathArgs: Parameters<DocPath>) => {
    return db.doc(docPath(docPathArgs)).withConverter(converter);
  };
};
