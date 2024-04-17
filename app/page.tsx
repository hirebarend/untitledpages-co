"use client";

import { useEffect, useState } from "react";
import mixpanel from "mixpanel-browser";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { WaitlistStep1Page, WaitlistStep2Page } from "@/components";

export default function Home() {
  const [record, setRecord] = useState(
    null as { emailAddress: string; id: string; position: number } | null
  );

  useEffect(() => {
    mixpanel.init("6570fb6b55412e8145762b070dd25c3b");

    mixpanel.track("Page View");
  }, []);

  return (
    <div>
      <Row className="m-0">
        <Col
          className="custom-container d-none d-md-block px-3 px-md-5 text-center"
          style={{ minHeight: "100dvh" }}
          xs={12}
          md={6}
          lg={6}
        >
          {/* <div className="fs-5 lh-base mb-3">
            I&apos;m{" "}
            <a
              href="https://www.linkedin.com/in/hirebarend/"
              referrerPolicy="no-referrer"
              target="_blank"
            >
              🖖 Barend Erasmus
            </a>
            , a mentor with over 10 years in the software engineering industry.
            My career has been a journey of consistent growth, earning
            promotions annually and sometimes within just six months. Beyond my
            personal achievements, I&apos;ve dedicated myself to guiding others,
            helping them advance or pivot their careers successfully.
          </div>

          <div className="fs-5 lh-base mb-3">
            I bring a wealth of experience in LinkedIn presence, resumes,
            interviews, and personal branding, skills I&apos;ve mastered to
            stand out in the competitive tech landscape. My mentorship is built
            on a holistic approach, focusing on both technical skills and the
            personal branding essential for making a lasting impact.
          </div> */}
        </Col>
        <Col
          className="bg-dark custom-container px-3 px-md-5 text-center text-white"
          style={{ minHeight: "100dvh" }}
          xs={12}
          md={6}
          lg={6}
        >
          {record ? (
            <WaitlistStep2Page
              emailAddress={record.emailAddress}
              heading={`You're <span class="text-primary">#${record.position}</span>`}
              id={record.id}
              subheading={`Congratulations, you've secured your place! You are currently number <span class="fw-bold text-primary">#${record.position}</span> in the queue. Boost your spot by referring friends and rise up the ranks!`}
            />
          ) : (
            <WaitlistStep1Page onSubmit={(x) => setRecord(x)} />
          )}
        </Col>
      </Row>
    </div>
  );
}
