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
      heading="Access To Link Bird Source Code"
      message="Please check your inbox! You'll receive an email shortly."
      onSubmit={async (emailAddress, name) => {
        await axios.post(
          "https://api.brevo.com/v3/contacts",
          {
            attributes: {
              firstName: name,
            },
            email: emailAddress,
            listIds: [5],
            updateEnabled: true,
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
            subject: "Access to Link Bird Source Code",
            htmlContent: `<html><head></head><body><p>Hi ${name},</p><p>Thanks for reaching out to explore the Link Bird source code! I'm really excited to see what you'll create with it.</p><p>Here's the link to download the source code:&nbsp;<a href="https://lnkbrd.com/np4nnf" target="_blank">Download Source Code</a></p><p>If you have any questions, ideas, or need a hand with anything, feel free to drop me a line. I’m here to help and would love to hear about your projects or any feedback you might have.</p><p>Happy coding!</p><p>Best, Barend</p></body></html>`,
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
      segment="link-bird-source-code"
      subheadings={[
        "Link Bird is an API-first alternative to Bitly, Dub.co, Bl.ink, Short.io and many others.",
        "Join 20+ other curious individuals like you",
      ]}
    />
  );
}
