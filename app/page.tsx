"use client";

import axios from "axios";
import { faker } from "@faker-js/faker";
import mixpanel from "mixpanel-browser";
import moment from "moment";
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
    "https://media.licdn.com/dms/image/D4D03AQG3J9ypQM2yAA/profile-displayphoto-shrink_400_400/0/1675257908638?e=1720656000&v=beta&t=jMOzAHHMHap9DyQ6OI2u52p8Gxr74Pwg-fadpODIdL8",
    "https://media.licdn.com/dms/image/D4D03AQFfK-zhFL2E1w/profile-displayphoto-shrink_400_400/0/1669488535518?e=1719446400&v=beta&t=z-nLmnEIpztppthXm4agrNoeLjD7nYANvVFg4WKck8A",
    "https://media.licdn.com/dms/image/D4D03AQHCCnzCqO8Mrg/profile-displayphoto-shrink_400_400/0/1710873945873?e=1721260800&v=beta&t=2UPdDSyUt4Y9DsQbJ6eIu_QoGA59ezqwU_Tc5BCKE6E",
    "https://media.licdn.com/dms/image/C5103AQHivmtnC3h65w/profile-displayphoto-shrink_400_400/0/1517612713175?e=1719446400&v=beta&t=tz1xTMhVxG830j0FIPM_znUzN9GMcMO75Nj5wovkq0A",
    "https://media.licdn.com/dms/image/D4D03AQFtg8AGEYfyQA/profile-displayphoto-shrink_400_400/0/1713178817714?e=1719446400&v=beta&t=lkzvU3rDQOJB4y7jnxASNZevzI8WMr9duVU8A-OyiX8",
    "https://media.licdn.com/dms/image/C4D03AQEn7dr7sb-Mcw/profile-displayphoto-shrink_400_400/0/1619977048027?e=1719446400&v=beta&t=0OQwD1aAqCoAbP_Ge0HjHpMxHuMfX-xyoi3lu-r0pN8",
    "https://media.licdn.com/dms/image/D4D03AQEUjbaZdUsgGQ/profile-displayphoto-shrink_400_400/0/1688470769990?e=1719446400&v=beta&t=e71HunuR1o9EDI6G7moQK3292jqqmvApI5CDyJQ1Pxc",
  ]);

  useEffect(() => {
    mixpanel.init("6570fb6b55412e8145762b070dd25c3b");

    mixpanel.track("Page View");
  }, []);

  useEffect(() => {
    setState(
      faker.helpers.arrayElements(
        [
          "https://media.licdn.com/dms/image/D4D03AQEnhOVJiCkIKw/profile-displayphoto-shrink_400_400/0/1669053875661?e=1721260800&v=beta&t=68LfOwD7r69GnIBf5PX3w5YLge70L23GQViv7D0SCDo",
          "https://media.licdn.com/dms/image/D4D03AQHCCnzCqO8Mrg/profile-displayphoto-shrink_400_400/0/1710873945873?e=1721260800&v=beta&t=2UPdDSyUt4Y9DsQbJ6eIu_QoGA59ezqwU_Tc5BCKE6E",
          "https://media.licdn.com/dms/image/C4D03AQEn7dr7sb-Mcw/profile-displayphoto-shrink_400_400/0/1619977048027?e=1719446400&v=beta&t=0OQwD1aAqCoAbP_Ge0HjHpMxHuMfX-xyoi3lu-r0pN8",
          "https://media.licdn.com/dms/image/C5103AQHivmtnC3h65w/profile-displayphoto-shrink_400_400/0/1517612713175?e=1719446400&v=beta&t=tz1xTMhVxG830j0FIPM_znUzN9GMcMO75Nj5wovkq0A",
          "https://media.licdn.com/dms/image/D4D03AQFtg8AGEYfyQA/profile-displayphoto-shrink_400_400/0/1713178817714?e=1719446400&v=beta&t=lkzvU3rDQOJB4y7jnxASNZevzI8WMr9duVU8A-OyiX8",
          "https://media.licdn.com/dms/image/D4D03AQFfK-zhFL2E1w/profile-displayphoto-shrink_400_400/0/1669488535518?e=1719446400&v=beta&t=z-nLmnEIpztppthXm4agrNoeLjD7nYANvVFg4WKck8A",
          "https://media.licdn.com/dms/image/D4D03AQEUjbaZdUsgGQ/profile-displayphoto-shrink_400_400/0/1688470769990?e=1719446400&v=beta&t=e71HunuR1o9EDI6G7moQK3292jqqmvApI5CDyJQ1Pxc",
          "https://media.licdn.com/dms/image/D4E03AQGA3K3AVHRACg/profile-displayphoto-shrink_400_400/0/1699610969845?e=1719446400&v=beta&t=WAlFNn9xt2NGTxuzFUU6nvj6YlnQ8LBL59zrbJ7Mlug",
          "https://media.licdn.com/dms/image/C5603AQHSg60zgYsq0w/profile-displayphoto-shrink_400_400/0/1572587126292?e=1719446400&v=beta&t=a4DE6lrebzR0MrTf15B7pr4QuL-9oDoBmo9DId-OS-k",
          "https://media.licdn.com/dms/image/D4D03AQG3J9ypQM2yAA/profile-displayphoto-shrink_400_400/0/1675257908638?e=1720656000&v=beta&t=jMOzAHHMHap9DyQ6OI2u52p8Gxr74Pwg-fadpODIdL8",
        ],
        7
      )
    );
  }, []);

  return (
    <div>
      <Row className="m-0">
        <Col
          className="custom-container px-3 px-md-5 text-center"
          style={{ minHeight: "100dvh" }}
          xs={{ order: 2, span: 12 }}
          md={{ order: 1, span: 6 }}
          lg={{ order: 1, span: 6 }}
        >
          <div className="mb-5">
            <img
              className="rounded-circle"
              width="33%"
              src="/images/1709877923476.jpeg"
            />
          </div>

          <div className="fs-5 lh-base mb-3">
            I&apos;m{" "}
            <a
              className="fw-bold text-dark"
              href="https://www.linkedin.com/in/hirebarend"
              referrerPolicy="no-referrer"
              target="_blank"
            >
              Barend Erasmus
            </a>
            , a mentor with over 10 years in the software engineering industry.
            My career has been a journey of consistent growth.
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
            message="Please check your inbox! You'll receive an email shortly."
            onSubmit={async (emailAddress, name) => {
              await axios.post(
                "https://api.brevo.com/v3/smtp/email",
                {
                  sender: {
                    name: "Barend",
                    email: "barend@untitledpages.co",
                  },
                  subject: `Barend <> ${name}`,
                  templateId: 3,
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
          >
            <h5 className="fw-bold text-primary text-uppercase">
              Starting {moment().add(1, "months").format("MMMM YYYY")}
            </h5>
            <h1 className="display-5 fw-bold mb-4">
              Accelerate Your Software Engineering Career
            </h1>
            <h2 className="lead lh-base mb-4">
              Personalized mentorship program tailored to enhance your
              engineering skills and secure a more senior role.
            </h2>

            {/* <div className="d-flex justify-content-center mb-1">
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
            </div> */ }

            {/* <div className="fst-italic mb-5 text-primary">
              Over 20 individuals are already on the waitlist
            </div> */}
          </Template2>
        </Col>
      </Row>
    </div>
  );
}
