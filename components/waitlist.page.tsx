import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsFiles } from "react-icons/bs";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import { StoreService } from "@/core";

export function WaitlistStep1Page(props: {
  onSubmit: (entry: {
    created: number;
    id: string;
    metadata: { [key: string]: string | null };
    position: number;
    referrer: string | null;
    referrals: number;
    updated: number;
  }) => void;
}) {
  const urlSearchParams = useSearchParams();

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      name: "",
    },
    onSubmit: async (values) => {
      const referrer = urlSearchParams.get("referrer");

      const entry = await StoreService.create(referrer, {
        ...values,
      });

      props.onSubmit(entry);
    },
    validationSchema: Yup.object().shape({
      emailAddress: Yup.string().email().required(),
      name: Yup.string().required(),
    }),
  });

  return (
    <>
      <h5 className="fw-bold text-primary">Unlock Your Potential</h5>
      <h1 className="display-5 fw-bold mb-4">
        Exclusive 1-on-1 Software Engineering Mentorship!
      </h1>
      <h2 className="lead lh-base mb-5">
        Grab your chance to be personally mentored by me. Reserve your spot on
        my mentorship waitlist today and start your transformative journey in
        software engineering.
      </h2>

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

      <Button
        className="fw-semibold mb-4 text-dark w-100"
        disabled={formik.isSubmitting}
        onClick={() => formik.submitForm()}
        size="lg"
      >
        Continue
      </Button>

      <div>
        By clicking &quot;Continue&quot; you agree to our{" "}
        <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>
      </div>
    </>
  );
}

export function WaitlistStep2Page(props: {
  emailAddress: string;
  heading: string;
  id: string;
  subheading: string;
}) {
  return (
    <>
      <h1
        className="display-5 fw-bold mb-4 text-center"
        dangerouslySetInnerHTML={{ __html: props.heading }}
      ></h1>
      <h2
        className="lead lh-base mb-5 text-center"
        dangerouslySetInnerHTML={{ __html: props.subheading }}
      ></h2>

      <Form.Group className="mb-4">
        <InputGroup>
          <Form.Control
            disabled={true}
            size="lg"
            value={`${window.location.origin}/?referrer=${props.id}`}
          />
          <Button
            className="align-items-center d-flex justify-content-center text-white"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/?referrer=${props.id}`
              );
            }}
            size="lg"
            variant="primary"
          >
            <BsFiles size={14} />
            &nbsp;Copy
          </Button>
        </InputGroup>
      </Form.Group>
    </>
  );
}
