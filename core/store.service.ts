import axios from "axios";
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

function scramble(str: string, shift: number): string {
  const shiftAmount = shift % 26;

  return str
    .split("")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const charCode = char.charCodeAt(0);

        const base =
          char >= "a" && char <= "z" ? "a".charCodeAt(0) : "A".charCodeAt(0);

        return String.fromCharCode(
          ((charCode - base + shiftAmount + 26) % 26) + base
        );
      }
      return char;
    })
    .join("");
}

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

    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Barend",
          email: "barend@untitledpages.co",
        },
        to: [
          {
            email: document.metadata["emailAddress"],
            name: document.metadata["name"],
          },
        ],
        subject: "Welcome Aboard – You're on the Waitlist!",
        htmlContent: `<html><head></head><body><b>Dear ${
          document.metadata["name"]
        },</b><p>Thank you for your interest in my 1-on-1 Software Engineering Mentorship! It's great to have you here, and I'm excited about the possibility of working together.<p><b>You are currently #${
          document.position
        } on the waitlist.</b> I appreciate your patience as we work to bring you into the program as soon as possible.<p>Want to move up the list quicker? You can improve your queue position! Just share this unique link with your friends: ${`https://untitledpages.co/?referrer=${documentReference.id}`}. For each friend who signs up through your link, you'll advance in the queue, bringing you closer to starting your personalized mentorship journey.<p>Keep an eye on your inbox for further updates, and please feel free to reach out if you have any questions or need additional information. I'm here to assist you!<p>Best regards,</body></html>`,
      },
      {
        headers: {
          "api-key": scramble(
            "jwqkeun-pn1m9445mp2p35nn85n79mp209qq2qnrmo3q033prq8n17orm1459n503m4oorm7-QxkUuOMvKNL8scUH",
            -12
          ),
        },
      }
    );

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
