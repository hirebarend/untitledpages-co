import { useEffect } from "react";
import { useFormik } from "formik";
import mixpanel from "mixpanel-browser";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { BsArrowRight, BsFiles } from "react-icons/bs";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import { StoreService } from "@/core";
import { useFetch } from "@/hooks";

export function WaitlistStep1(props: {
  heading: string;
  onSubmit: (
    entry: {
      created: number;
      id: string;
      metadata: { [key: string]: string | null };
      position: number;
      referrer: string | null;
      referrals: number;
      segment: string;
      updated: number;
    },
    isNew: boolean
  ) => Promise<void>;
  segment: string;
  subheadings: Array<string>;
}) {
  const urlSearchParams = useSearchParams();

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      name: "",
    },
    onSubmit: async (values) => {
      const referrer = urlSearchParams.get("referrer");

      let entry = await StoreService.findByEmailAddress(
        props.segment,
        values.emailAddress
      );

      if (!entry) {
        entry = await StoreService.create(props.segment, referrer, {
          ...values,
          month: moment().format("MMMM"),
        });

        await props.onSubmit(entry, true);

        return;
      }

      await props.onSubmit(entry, false);
    },
    validationSchema: Yup.object().shape({
      emailAddress: Yup.string().email().required(),
      name: Yup.string().required(),
    }),
  });

  return (
    <>
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

          // "https://randomuser.me/api/portraits/med/men/3.jpg",
          // "https://randomuser.me/api/portraits/med/women/5.jpg",
          // "https://randomuser.me/api/portraits/med/men/8.jpg",
          // "https://randomuser.me/api/portraits/med/men/13.jpg",
          // "https://randomuser.me/api/portraits/med/women/21.jpg",
          // "https://randomuser.me/api/portraits/med/men/44.jpg",
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

      <div className="fst-italic mb-5 text-primary">{props.subheadings[1]}</div>

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
        Continue&nbsp;
        <BsArrowRight strokeWidth={0.375} />
      </Button>

      <div>
        By clicking &quot;Continue&quot; you agree to our{" "}
        <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>
      </div>
    </>
  );
}

export function WaitlistStep2(props: {
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
            className="align-items-center d-flex fw-medium justify-content-center"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/?referrer=${props.id}`
              );
            }}
            size="lg"
            variant="primary"
          >
            <BsFiles size={14} strokeWidth={0.375} />
            &nbsp;Copy
          </Button>
        </InputGroup>
      </Form.Group>
    </>
  );
}

export function Template1(props: {
  heading: string;
  onSubmit: (
    entry: {
      created: number;
      id: string;
      metadata: { [key: string]: string | null };
      position: number;
      referrer: string | null;
      referrals: number;
      segment: string;
      updated: number;
    },
    isNew: boolean
  ) => Promise<void>;
  segment: string;
  subheadings: Array<string>;
}) {
  const urlSearchParams = useSearchParams();

  const fetchResult = useFetch({
    fn: async (id: string | null) => (id ? await StoreService.find(id) : null),
  });

  useEffect(() => {
    mixpanel.init("6570fb6b55412e8145762b070dd25c3b");

    mixpanel.track("Page View");

    const id = urlSearchParams.get("id");

    fetchResult.execute(id);
  }, [urlSearchParams]);

  if (!fetchResult.result) {
    return <></>;
  }

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
          {fetchResult.result.data ? (
            <WaitlistStep2
              emailAddress={
                fetchResult.result.data.metadata["emailAddress"] || ""
              }
              heading={`You're <span class="text-primary">#${
                fetchResult.result.data.position -
                fetchResult.result.data.referrals
              }</span>`}
              id={fetchResult.result.data.id}
              subheading={`Congratulations, you've secured your place! You are currently number <span class="fw-bold text-primary">#${
                fetchResult.result.data.position -
                fetchResult.result.data.referrals
              }</span> in the queue. Boost your spot by referring friends and rise up the ranks!`}
            />
          ) : (
            <WaitlistStep1
              heading={props.heading}
              onSubmit={async (entry, isNew) => {
                await props.onSubmit(entry, isNew);

                // TODO
                const urlSearchParams = new URLSearchParams(
                  window.location.search
                );

                urlSearchParams.set("id", entry.id);

                window.location.search = urlSearchParams.toString();
              }}
              segment={props.segment}
              subheadings={props.subheadings}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
