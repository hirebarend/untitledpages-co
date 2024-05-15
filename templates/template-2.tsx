"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import mixpanel from "mixpanel-browser";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { BsArrowRight } from "react-icons/bs";
import * as Yup from "yup";

export function Template2(props: {
  children: string | JSX.Element | JSX.Element[];
  message: string;
  onSubmit: (emailAddress: string, name: string) => Promise<void>;
}) {
  const [state, setState] = useState(false);

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      name: "",
    },
    onSubmit: async (values) => {
      await props.onSubmit(values.emailAddress, values.name);

      setState(true);

      formik.resetForm();
    },
    validationSchema: Yup.object().shape({
      emailAddress: Yup.string().email().required(),
      name: Yup.string().required(),
    }),
  });

  useEffect(() => {
    mixpanel.init("6570fb6b55412e8145762b070dd25c3b");

    mixpanel.track("Page View");
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
              src="https://media.licdn.com/dms/image/D4D03AQFPoVsv5Iy2Eg/profile-displayphoto-shrink_400_400/0/1709877923476?e=1718841600&v=beta&t=jS0N9bJRFs9Jyhcli-d4XHNGxMez3dtA_CuXTKW9tw4"
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
          {props.children}

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

          {state ? <Alert variant="success">{props.message}</Alert> : null}

          <Button
            className="fw-semibold mb-4 w-100"
            disabled={formik.isSubmitting || state}
            onClick={() => formik.submitForm()}
            size="lg"
            variant="primary"
          >
            Register&nbsp;
            <BsArrowRight strokeWidth={0.375} />
          </Button>

          <div>
            By clicking &quot;Register&quot; you agree to our{" "}
            <a href="/not-found">Privacy Policy</a> and{" "}
            <a href="/not-found">Terms of Use</a>
          </div>
        </Col>
      </Row>
    </div>
  );
}
