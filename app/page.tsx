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
          className="d-none d-md-block"
          style={{ height: "100dvh" }}
          xs={12}
          md={6}
          lg={6}
        ></Col>
        <Col
          className="bg-dark custom-container px-3 px-md-5 text-center text-white"
          style={{ height: "100dvh" }}
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
