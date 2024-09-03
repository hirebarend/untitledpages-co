"use client";

import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Template2 } from "@/templates";

export default function Home() {
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
            Get Verified makes digital identity simple. We make it easy for
            people to access services by digitally verifying them using our
            Identity Platform.
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
            button={{ text: "Talk to us" }}
            message="Please check your inbox! You'll receive an email shortly."
            onSubmit={async (emailAddress, name) => {
              // TODO
            }}
            variant="secondary"
          >
            <h5 className="fw-bold text-secondary text-uppercase">
              Get Verified
            </h5>
            <h1 className="display-5 fw-bold mb-4">Talk to us</h1>
            <h2 className="lead lh-base mb-4">
              Reach out to us for any inquiries about our Identity Platform.
              We're here to listen and help with whatever you need.
            </h2>
          </Template2>
        </Col>
      </Row>
    </div>
  );
}
