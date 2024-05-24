"use client";

import { useState } from "react";
import { useFormik } from "formik";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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

  return (
    <>
      {props.children}

      <Form.Group className="mb-4">
        <Form.Control
          id="name"
          isInvalid={formik.touched.name && formik.errors.name ? true : false}
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
    </>
  );
}
