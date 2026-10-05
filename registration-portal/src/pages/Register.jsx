import { Formik, Form } from "formik";
import * as Yup from "yup";

import InputField from "../components/InputField";
import Button from "../components/Button";
import { registerUser } from "../services/api";

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
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await registerUser(values);
              alert("Registration successful!");
              resetForm();
            } catch (error) {
              alert(error.message);
            } finally {
              setSubmitting(false);
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
          }) => (
            <Form>

              <InputField
                label="Full Name"
                name="name"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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