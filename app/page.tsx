"use client";

import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { BsFiles } from "react-icons/bs";
import * as Yup from "yup";

export default function Home() {
  const [record, setRecord] = useState(
    null as { "Email Address": string; Name: string; Position: number } | null
  );

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      name: "",
    },
    onSubmit: async (values) => {
      const response = await axios.post<{
        records: Array<{
          fields: { "Email Address": string; Name: string; Position: number };
        }>;
      }>(
        "https://api.airtable.com/v0/appF0GZFRkzXlzIYN/Leads",
        {
          records: [
            {
              fields: {
                "Email Address": values.emailAddress,
                Name: values.name,
              },
            },
          ],
        },
        {
          headers: {
            Authorization:
              "Bearer patyzPiIsrpFV8kvw.0a04121ead945583b1169acbafe6b3a60b34851ff5884d5813c07c709704bf84",
          },
        }
      );

      setRecord(response.data.records[0].fields);

      formik.resetForm();
    },
    validationSchema: Yup.object().shape({
      emailAddress: Yup.string().email().required(),
      name: Yup.string().required(),
    }),
  });

  if (record) {
    return (
      <Container className="px-5" style={{ marginTop: "12rem" }}>
        <Row>
          <Col xs={12} md={{ offset: 3, span: 6 }} lg={{ offset: 3, span: 6 }}>
            <h1 className="display-5 fw-bold mb-4 text-center">
              You're <span className="text-primary">#{record.Position}</span>
            </h1>
            <h2 className="lead lh-base mb-5 text-center">
              I appreciate your interest! You'll be notified as soon as a spot
              opens up.
            </h2>

            <div className="border border-2 border-primary p-4 rounded text-center">
              <h2 className="fs-5 fw-bold">Move up by sharing!</h2>
              <h3 className="lead lh-base mb-4">
                Want a higher spot? Share this link with your friends. For each
                friend who signs up, you'll climb up in the queue.
              </h3>

              <Form.Group className="mb-4">
                <InputGroup>
                  <Form.Control
                    disabled={true}
                    value={`https://untitledpages.co?emailAddress=${encodeURIComponent(
                      record["Email Address"]
                    )}`}
                  />
                  <Button
                    className="align-items-center d-flex justify-content-center text-white"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://untitledpages.co?emailAddress=${encodeURIComponent(
                          record["Email Address"]
                        )}`
                      );
                    }}
                    variant="dark"
                  >
                    <BsFiles size={14} />
                    &nbsp;Copy
                  </Button>
                </InputGroup>
              </Form.Group>

              {/* <div>
                The more you share, the higher you&apos;ll climb up the list.
              </div> */}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="px-5" style={{ marginTop: "6rem" }}>
      <Row>
        <Col
          className="text-center"
          xs={12}
          md={{ offset: 6, span: 6 }}
          lg={{ offset: 6, span: 6 }}
        >
          <h5>Unlock Your Potential</h5>
          <h1 className="display-5 fw-bold mb-4">
            Exclusive 1-on-1 Software Engineering Mentorship!
          </h1>
          <h2 className="lead lh-base mb-5">
            With over a decade in the industry and hands-on business experience,
            I'm here to guide you through your software development journey.
            Learn from my successes and setbacks to accelerate your growth.
            Limited mentorship slots available – join the waitlist today!
          </h2>

          <Form.Group className="mb-4">
            <Form.Control
              id="name"
              isInvalid={
                formik.touched.name && formik.errors.name ? true : false
              }
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Tell me your name..."
              size="lg"
              type="text"
              value={formik.values.name}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              id="emailAddress"
              isInvalid={
                formik.touched.emailAddress && formik.errors.emailAddress
                  ? true
                  : false
              }
              name="emailAddress"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter your email address..."
              size="lg"
              type="text"
              value={formik.values.emailAddress}
            />
          </Form.Group>

          <Button
            className="mb-4 w-100"
            onClick={() => formik.submitForm()}
            size="lg"
          >
            Continue
          </Button>

          <div>
            By clicking "Continue" you agree to our{" "}
            <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
