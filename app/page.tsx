"use client";

import axios from "axios";
import { Template2 } from "@/templates";

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

export default function Home() {
  return (
    <Template2
      heading="The 1-on-1 Software Engineering Mentorship!"
      message="Please check your inbox! You'll receive an email shortly."
      onSubmit={async (emailAddress, name) => {
        await axios.post(
          "https://api.brevo.com/v3/smtp/email",
          {
            sender: {
              name: "Barend",
              email: "barend@untitledpages.co",
            },
            to: [
              {
                email: emailAddress,
                name,
              },
            ],
            templateId: 3,
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
      }}
      segment="landing-page"
      subheadings={[
        "Grab your chance to be personally mentored by me. Reserve your spot on my mentorship waitlist today.",
        "Over 20 individuals are already on the waitlist.",
      ]}
    />
  );
}
