"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import mixpanel from "mixpanel-browser";
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

  useEffect(() => {
    mixpanel.init("6570fb6b55412e8145762b070dd25c3b");

    mixpanel.track("Page View");

    if (false) {
      setRecord({
        "Email Address": "hirebarend@gmail.com",
        Name: "Barend",
        Position: 14,
      });
    }
  }, []);

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
              You&apos;re{" "}
              <span className="text-primary">#{record.Position}</span>
            </h1>
            <h2 className="lead lh-base mb-5 text-center">
              Congratulations, you&apos;ve secured your place! You are currently
              number{" "}
              <span className="fw-bold text-primary">#{record.Position}</span>{" "}
              in the queue. Boost your spot by referring friends and rise up the
              ranks!
            </h2>

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
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div>
      <Row className="m-0">
        <Col
          className="bg-dark d-none d-md-block"
          style={{ height: "100dvh" }}
          xs={12}
          md={6}
          lg={6}
        ></Col>
        <Col
          className="px-3 text-center"
          style={{ paddingTop: "5rem" }}
          xs={12}
          md={6}
          lg={6}
        >
          <h5 className="fw-bold text-primary">Unlock Your Potential</h5>
          <h1 className="display-5 fw-bold mb-4">
            Exclusive 1-on-1 Software Engineering Mentorship!
          </h1>
          <h2 className="lead lh-base mb-5">
            Grab your chance to be personally mentored by me. Reserve your spot
            on my mentorship waitlist today and start your transformative
            journey in software engineering.
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
              placeholder="Enter your name..."
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
            className="fw-semibold mb-4 text-dark w-100"
            onClick={() => formik.submitForm()}
            size="lg"
          >
            Continue
          </Button>

          <div>
            By clicking &quot;Continue&quot; you agree to our{" "}
            <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>
          </div>
        </Col>
      </Row>
    </div>
  );
}
