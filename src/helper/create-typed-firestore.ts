import { FirestoreDataConverter, Firestore, createTypedCollectionRef, createTypedDocRef } from "@u";

export const createTypedFirestore = <
  Data,
  CollectionPath extends (...args: any) => string,
  DocPath extends (...args: any) => string
>({
  converter,
  collectionPath,
  docPath,
}: {
  converter: FirestoreDataConverter<Data>;
  collectionPath: CollectionPath;
  docPath: DocPath;
}) => {
  const typedCollectionRef = (
    db: Firestore,
    ...collectionPathParams: Parameters<CollectionPath>
  ) => {
    return createTypedCollectionRef(db, collectionPath(collectionPathParams), converter);
  };

  const typedDocRef = (db: Firestore, ...docPathParams: Parameters<DocPath>) => {
    return createTypedDocRef(db, docPath(docPathParams), converter);
  };

  return {
    converter,
    collectionPath,
    docPath,
    typedCollectionRef,
    typedDocRef,
  };
};
