import { Formik, Form } from "formik";
import * as Yup from "yup";

import InputField from "../components/InputField";
import Button from "../components/Button";
import { registerUser } from "../services/userService";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Create Account
        </h2>

        <p className="mb-6 text-center text-gray-500">
          Register for an account
        </p>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async ({ name, email }, { setStatus }) => {
            try {
              await registerUser({ name, email });
              setStatus({
                type: "success",
                message: "Registration submitted successfully.",
              });
            } catch (error) {
              setStatus({
                type: "error",
                message:
                  error instanceof Error
                    ? error.message
                    : "Registration failed. Please try again.",
              });
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            isValid,
            setStatus,
            status,
            submitCount,
          }) => (
            <Form>
              {submitCount > 0 && !isValid && (
                <p className="mb-4 text-sm text-red-500" role="alert">
                  Please correct the invalid fields before continuing.
                </p>
              )}

              {status && (
                status.type === "success" ? (
                  <div
                    className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 shadow-sm"
                    role="status"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5 12 4 4L19 6"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold">You’re all set!</p>
                      <p className="mt-1 text-sm text-emerald-800">
                        {status.message} Welcome, {values.name}!
                      </p>
                    </div>
                  </div>
                ) : (
                  <p
                    className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    {status.message}
                  </p>
                )
              )}

              <InputField
                label="Full Name"
                name="name"
                placeholder="Enter your name"
                value={values.name}
                onChange={(event) => {
                  setStatus(undefined);
                  handleChange(event);
                }}
                onBlur={handleBlur}
              />

              {touched.name && errors.name && (
                <p className="mb-3 text-sm text-red-500">{errors.name}</p>
              )}

              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={(event) => {
                  setStatus(undefined);
                  handleChange(event);
                }}
                onBlur={handleBlur}
              />

              {touched.email && errors.email && (
                <p className="mb-3 text-sm text-red-500">{errors.email}</p>
              )}

              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={values.password}
                onChange={(event) => {
                  setStatus(undefined);
                  handleChange(event);
                }}
                onBlur={handleBlur}
              />

              {touched.password && errors.password && (
                <p className="mb-3 text-sm text-red-500">
                  {errors.password}
                </p>
              )}

              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={(event) => {
                  setStatus(undefined);
                  handleChange(event);
                }}
                onBlur={handleBlur}
              />

              {touched.confirmPassword && errors.confirmPassword && (
                <p className="mb-3 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}

              <Button type="submit">
                {isSubmitting ? "Registering..." : "Register"}
              </Button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;