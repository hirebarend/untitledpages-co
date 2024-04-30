import {
  collection,
  doc,
  getDoc,
  query,
  addDoc,
  getDocs,
  where,
  and,
} from "firebase/firestore/lite";
import moment from "moment";
import { FIRESTORE } from "./firebase";

export class StoreService {
  public static async count(segment: string, month: string): Promise<number> {
    const collectionReference = collection(FIRESTORE, "entries");

    const querySnapshot = await getDocs(
      query(
        collectionReference,
        and(
          where("segment", "==", segment),
          where("metadata.month", "==", month)
        )
      )
    );

    return querySnapshot.size + 14;
  }

  public static async create(
    segment: string,
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
    segment: string;
    updated: number;
  }> {
    const count = await StoreService.count(segment, moment().format("MMMM"));

    const collectionReference = collection(FIRESTORE, "entries");

    const document = {
      created: new Date().getTime(),
      id: "",
      metadata,
      position: count,
      referrer,
      referrals: 0,
      segment,
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
    segment: string;
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
      segment: string;
      updated: number;
    } = {
      ...(documentSnapshot.data() as any),
      id: documentReference.id,
    };

    return document;
  }

  public static async findByEmailAddress(
    segment: string,
    emailAddress: string
  ): Promise<{
    created: number;
    id: string;
    metadata: { [key: string]: string | null };
    position: number;
    referrer: string | null;
    referrals: number;
    segment: string;
    updated: number;
  } | null> {
    const collectionReference = collection(FIRESTORE, "entries");

    const querySnapshot = await getDocs(
      query(
        collectionReference,
        and(
          where("segment", "==", segment),
          where("metadata.emailAddress", "==", emailAddress)
        )
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
      segment: string;
      updated: number;
    } = {
      ...(queryDocumentSnapshot.data() as any),
      id: queryDocumentSnapshot.id,
    };

    return document;
  }
}
