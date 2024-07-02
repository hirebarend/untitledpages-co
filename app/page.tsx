"use client";

import axios from "axios";
import { faker } from "@faker-js/faker";
import mixpanel from "mixpanel-browser";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Template2 } from "@/templates";
import { useEffect, useState } from "react";

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
  const [state, setState] = useState([
    "/images/profiles/1692021864573.jpeg",

    "/images/profiles/1609676225303.jpeg",
    "/images/profiles/1666675473844.jpeg",
    "/images/profiles/1682369916971.jpeg",
    "/images/profiles/1695839764154.jpeg",
    "/images/profiles/1595699719368.jpeg",
    "/images/profiles/1696133927472.jpeg",
  ]);

  useEffect(() => {
    mixpanel.init("6570fb6b55412e8145762b070dd25c3b");

    mixpanel.track("Page View");
  }, []);

  useEffect(() => {
    setState(
      faker.helpers.arrayElements(
        [
          "/images/profiles/1692021864573.jpeg",

          "/images/profiles/1609676225303.jpeg",
          "/images/profiles/1666675473844.jpeg",
          "/images/profiles/1682369916971.jpeg",
          "/images/profiles/1695839764154.jpeg",
          "/images/profiles/1595699719368.jpeg",
          "/images/profiles/1696133927472.jpeg",
        ],
        7
      )
    );
  }, []);

  return (
    <div>
      <Row className="m-0">
        <Col
          className="custom-container d-none d-md-block px-3 px-md-5 text-center"
          style={{ minHeight: "100dvh" }}
          xs={{ order: 2, span: 12 }}
          md={{ order: 1, span: 6 }}
          lg={{ order: 1, span: 6 }}
        >
          <div className="mb-5">
            <img
              className="rounded-circle"
              width="25%"
              src="/images/icon.png"
            />
          </div>

          <div className="fs-5 lh-base mb-3">
            Talented Engineers connects you with rigorously vetted, world-class
            engineers ready to tackle your most challenging projects.
          </div>
        </Col>
        <Col
          className="bg-dark custom-container px-3 px-md-5 text-center text-white"
          style={{ minHeight: "100dvh" }}
          xs={{ order: 1, span: 12 }}
          md={{ order: 1, span: 6 }}
          lg={{ order: 1, span: 6 }}
        >
          <Template2
            button={{ text: "Join" }}
            message="Please check your inbox! You'll receive an email shortly."
            onSubmit={async (emailAddress, name) => {
              await axios.post(
                "https://api.brevo.com/v3/smtp/email",
                {
                  sender: {
                    name: "Barend",
                    email: "barend@untitledpages.co",
                  },
                  subject: `Talented Engineers <> ${name}`,
                  templateId: 15,
                  to: [
                    {
                      email: emailAddress,
                      name,
                    },
                  ],
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
            variant="secondary"
          >
            <h5 className="fw-bold text-secondary text-uppercase">
              Exclusive Network
            </h5>
            <h1 className="display-5 fw-bold mb-4">Join Talented Engineers</h1>
            <h2 className="lead lh-base mb-4">
              Talented Engineers connects you with rigorously vetted,
              world-class engineers ready to tackle your most challenging
              projects.
            </h2>

            <div className="d-flex justify-content-center mb-1">
              {state.map((x, index) => (
                <img
                  alt={`Image ${index + 1}`}
                  className="rounded-circle"
                  key={x}
                  src={x}
                  style={{ marginLeft: index === 0 ? "0px" : "-24px" }}
                  width={48}
                />
              ))}
            </div>

            <div className="fst-italic mb-5 text-secondary">
              Over 164 engineers already on board!
            </div>
          </Template2>
        </Col>
      </Row>
    </div>
  );
}
