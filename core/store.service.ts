import {
  collection,
  getCount,
  doc,
  getDoc,
  query,
  addDoc,
  getDocs,
  where,
} from "firebase/firestore/lite";
import { FIRESTORE } from "./firebase";

export class StoreService {
  public static async count(): Promise<number> {
    const collectionReference = collection(FIRESTORE, "entries");

    const querySnapshot = await getDocs(query(collectionReference));

    return querySnapshot.size + 14;
  }

  public static async create(
    referrer: string | null,
    metadata: {
      [key: string]: string | null;
    }
  ): Promise<{
    created: number;
    id: string;
    metadata: { [key: string]: string | null };
    position: number;
    referrer: string | null;
    referrals: number;
    updated: number;
  }> {
    const count = await StoreService.count();

    const collectionReference = collection(FIRESTORE, "entries");

    const document = {
      created: new Date().getTime(),
      id: "",
      metadata,
      position: count,
      referrer,
      referrals: 0,
      updated: new Date().getTime(),
    };

    const documentReference = await addDoc(collectionReference, {
      ...document,
    });

    return {
      ...document,
      id: documentReference.id,
    };
  }

  public static async find(id: string): Promise<{
    created: number;
    id: string;
    metadata: { [key: string]: string | null };
    position: number;
    referrer: string | null;
    referrals: number;
    updated: number;
  } | null> {
    const collectionReference = collection(FIRESTORE, "entries");

    const documentReference = await doc(collectionReference, id);

    const documentSnapshot = await getDoc(documentReference);

    if (!documentSnapshot.exists()) {
      return null;
    }

    const document: {
      created: number;
      id: string;
      metadata: { [key: string]: string | null };
      position: number;
      referrer: string | null;
      referrals: number;
      updated: number;
    } = {
      ...(documentSnapshot.data() as any),
      id: documentReference.id,
    };

    return document;
  }

  public static async findByEmailAddress(emailAddress: string): Promise<{
    created: number;
    id: string;
    metadata: { [key: string]: string | null };
    position: number;
    referrer: string | null;
    referrals: number;
    updated: number;
  } | null> {
    const collectionReference = collection(FIRESTORE, "entries");

    const querySnapshot = await getDocs(
      query(
        collectionReference,
        where("metadata.emailAddress", "==", emailAddress)
      )
    );

    if (querySnapshot.empty) {
      return null;
    }

    const queryDocumentSnapshot = querySnapshot.docs[0];

    const document: {
      created: number;
      id: string;
      metadata: { [key: string]: string | null };
      position: number;
      referrer: string | null;
      referrals: number;
      updated: number;
    } = {
      ...(queryDocumentSnapshot.data() as any),
      id: queryDocumentSnapshot.id,
    };

    return document;
  }
}
