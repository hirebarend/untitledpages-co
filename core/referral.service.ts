import {
  collection,
  query,
  addDoc,
  getDocs,
  where,
  and,
} from "firebase/firestore/lite";
import { FIRESTORE } from "./firebase";

export class ReferralService {
  protected static async count(segment: string): Promise<number> {
    const collectionReference = collection(FIRESTORE, "referrals");

    const querySnapshot = await getDocs(
      query(collectionReference, and(where("segment", "==", segment)))
    );

    return querySnapshot.size + 14;
  }

  public static async create(
    segment: string,
    emailAddress: string,
    referrer: string | null
  ): Promise<{
    emailAddress: string;
    id: string;
    position: number;
    referrer: string | null;
    segment: string | null;
  }> {
    const count = await ReferralService.count(segment);

    const collectionReference = collection(FIRESTORE, "referrals");

    const documentReference = await addDoc(collectionReference, {
      emailAddress,
      position: count,
      referrer,
      segment,
    });

    return {
      emailAddress,
      id: documentReference.id,
      position: count,
      referrer,
      segment,
    };
  }

  // public static async find(id: string): Promise<{
  //   created: number;
  //   id: string;
  //   metadata: { [key: string]: string | null };
  //   position: number;
  //   referrer: string | null;
  //   referrals: number;
  //   segment: string;
  //   updated: number;
  // } | null> {
  //   const collectionReference = collection(FIRESTORE, "entries");

  //   const documentReference = await doc(collectionReference, id);

  //   const documentSnapshot = await getDoc(documentReference);

  //   if (!documentSnapshot.exists()) {
  //     return null;
  //   }

  //   const document: {
  //     created: number;
  //     id: string;
  //     metadata: { [key: string]: string | null };
  //     position: number;
  //     referrer: string | null;
  //     referrals: number;
  //     segment: string;
  //     updated: number;
  //   } = {
  //     ...(documentSnapshot.data() as any),
  //     id: documentReference.id,
  //   };

  //   return document;
  // }

  public static async findByEmailAddress(
    segment: string,
    emailAddress: string
  ): Promise<{
    emailAddress: string;
    id: string;
    position: number;
    referrer: string | null;
    segment: string | null;
  } | null> {
    const collectionReference = collection(FIRESTORE, "referrals");

    const querySnapshot = await getDocs(
      query(
        collectionReference,
        and(
          where("segment", "==", segment),
          where("emailAddress", "==", emailAddress)
        )
      )
    );

    if (querySnapshot.empty) {
      return null;
    }

    const queryDocumentSnapshot = querySnapshot.docs[0];

    return {
      ...(queryDocumentSnapshot.data() as any),
      id: queryDocumentSnapshot.id,
    };
  }
}
