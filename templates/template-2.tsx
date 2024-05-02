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
  heading: string;
  message: string;
  onSubmit: (emailAddress: string, name: string) => Promise<void>;
  segment: string;
  subheadings: Array<string>;
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
          <h5 className="fw-bold text-primary">Exclusive</h5>
          <h1 className="display-5 fw-bold mb-4">{props.heading}</h1>
          <h2 className="lead lh-base mb-4">{props.subheadings[0]}</h2>

          <div className="d-flex justify-content-center mb-1">
            {[
              "https://media.licdn.com/dms/image/C4D03AQEn7dr7sb-Mcw/profile-displayphoto-shrink_400_400/0/1619977048027?e=1719446400&v=beta&t=0OQwD1aAqCoAbP_Ge0HjHpMxHuMfX-xyoi3lu-r0pN8",
              "https://media.licdn.com/dms/image/C5103AQHivmtnC3h65w/profile-displayphoto-shrink_400_400/0/1517612713175?e=1719446400&v=beta&t=tz1xTMhVxG830j0FIPM_znUzN9GMcMO75Nj5wovkq0A",
              "https://media.licdn.com/dms/image/D4D03AQFtg8AGEYfyQA/profile-displayphoto-shrink_400_400/0/1713178817714?e=1719446400&v=beta&t=lkzvU3rDQOJB4y7jnxASNZevzI8WMr9duVU8A-OyiX8",
              "https://media.licdn.com/dms/image/D4D03AQFfK-zhFL2E1w/profile-displayphoto-shrink_400_400/0/1669488535518?e=1719446400&v=beta&t=z-nLmnEIpztppthXm4agrNoeLjD7nYANvVFg4WKck8A",
              "https://media.licdn.com/dms/image/D4D03AQEUjbaZdUsgGQ/profile-displayphoto-shrink_400_400/0/1688470769990?e=1719446400&v=beta&t=e71HunuR1o9EDI6G7moQK3292jqqmvApI5CDyJQ1Pxc",
              "https://media.licdn.com/dms/image/D4E03AQGA3K3AVHRACg/profile-displayphoto-shrink_400_400/0/1699610969845?e=1719446400&v=beta&t=WAlFNn9xt2NGTxuzFUU6nvj6YlnQ8LBL59zrbJ7Mlug",
              "https://media.licdn.com/dms/image/C5603AQHSg60zgYsq0w/profile-displayphoto-shrink_400_400/0/1572587126292?e=1719446400&v=beta&t=a4DE6lrebzR0MrTf15B7pr4QuL-9oDoBmo9DId-OS-k",
            ].map((x, index) => (
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

          <div className="fst-italic mb-5 text-primary">
            {props.subheadings[1]}
          </div>

          {state ? (
            <Alert variant="success">{props.message}</Alert>
          ) : (
            <>
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
                disabled={formik.isSubmitting}
                onClick={() => formik.submitForm()}
                size="lg"
              >
                Continue&nbsp;
                <BsArrowRight strokeWidth={0.375} />
              </Button>

              <div>
                By clicking &quot;Continue&quot; you agree to our{" "}
                <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
