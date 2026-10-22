import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { loginUser, registerUser } from "../services/userService";

const signUpSchema = Yup.object({
  name: Yup.string().min(2, "Use at least 2 characters").required("Enter your name"),
  email: Yup.string().email("Enter a valid email").required("Enter your email"),
  password: Yup.string().min(8, "Use at least 8 characters").required("Create a password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});

const signInSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Enter your email"),
  password: Yup.string().required("Enter your password"),
});

function Auth() {
  const [mode, setMode] = useState("signup");
  const [activeUser, setActiveUser] = useState(null);
  const [initialEmail, setInitialEmail] = useState("");
  const [notice, setNotice] = useState(undefined);

  const isSignUp = mode === "signup";

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setInitialEmail("");
    setNotice(undefined);
  };

  const handleSubmit = async (values, { setStatus, setSubmitting, resetForm }) => {
    setStatus(undefined);
    try {
      if (isSignUp) {
        const user = await registerUser({
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
        });
        resetForm();
        setInitialEmail(user.email);
        setNotice({
          type: "success",
          message: "Your account is ready. Sign in to continue.",
        });
        setMode("signin");
      } else {
        const user = await loginUser({
          email: values.email.trim(),
          password: values.password,
        });
        setActiveUser(user);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 font-sans text-[#252b33]">
      <div className="w-full max-w-[440px]">
        <header className="mb-[22px] ml-0.5 flex items-center gap-3">
          <div className="grid size-[38px] place-items-center rounded-md border border-[#d5d9df] bg-white text-xs font-bold tracking-[0.3px] text-[#38495e]" aria-hidden="true">EP</div>
          <div>
            <p className="m-0 text-[15px] font-bold text-[#202a36]">Employee Portal</p>
            <p className="mt-[3px] mb-0 text-xs text-[#717b87]">Company account access</p>
          </div>
        </header>
        <section className="rounded-lg border border-[#dfe3e8] bg-white p-6 shadow-sm sm:p-8" aria-labelledby="form-title">
          {activeUser ? (
            <div role="status">
              <p className="mb-2 text-[10px] font-bold tracking-[0.8px] text-[#52677f]">ACCOUNT ACCESS</p>
              <h1 className="mb-2 text-2xl font-semibold leading-[1.3] tracking-[-0.3px] text-[#202a36]" id="form-title">Signed in</h1>
              <p className="m-0 text-[13px] leading-relaxed text-[#687382]">Welcome, {activeUser.name}. Your demo employee account is active.</p>
              <Button onClick={() => setActiveUser(null)}>Sign out</Button>
            </div>
          ) : (
            <div className="w-full">
              <div className="mb-6">
                <p className="mb-2 text-[10px] font-bold tracking-[0.8px] text-[#52677f]">EMPLOYEE ACCESS</p>
                <h1 className="mb-2 text-2xl font-semibold leading-[1.3] tracking-[-0.3px] text-[#202a36]" id="form-title">{isSignUp ? "Register your account" : "Sign in"}</h1>
                <p className="m-0 text-[13px] leading-relaxed text-[#687382]">
                  {isSignUp
                    ? "Create an account to access the employee portal."
                    : "Enter your account details to continue."}
                </p>
              </div>

              <div className="mb-[22px] grid grid-cols-2 border-b border-[#dfe3e8]" role="tablist" aria-label="Registration or sign in">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isSignUp}
                  className={`-mb-px min-h-10 border-0 border-b-2 bg-transparent text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426b91] ${isSignUp ? "border-[#365a7c] text-[#294968]" : "border-transparent text-[#677383]"}`}
                  onClick={() => switchMode("signup")}
                >
                  Create account
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={!isSignUp}
                  className={`-mb-px min-h-10 border-0 border-b-2 bg-transparent text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426b91] ${!isSignUp ? "border-[#365a7c] text-[#294968]" : "border-transparent text-[#677383]"}`}
                  onClick={() => switchMode("signin")}
                >
                  Sign in
                </button>
              </div>

              <Formik
                key={mode}
                initialValues={{
                  name: "",
                  email: initialEmail,
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={isSignUp ? signUpSchema : signInSchema}
                initialStatus={notice}
                onSubmit={handleSubmit}
                validateOnMount
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
                }) => {
                  const updateField = (event) => {
                    setStatus(undefined);
                    handleChange(event);
                  };

                  return (
                    <Form className="flex flex-col gap-4">
                      {status && (
                        <p className={`m-0 rounded border px-3 py-2.5 text-xs leading-relaxed ${
                          status.type === "error"
                            ? "border-[#edcaca] bg-[#fff5f5] text-[#902e2e]"
                            : "border-[#c9dfcf] bg-[#f3faf4] text-[#2e643c]"
                        }`} role={status.type === "error" ? "alert" : "status"}>
                          {status.message}
                        </p>
                      )}

                      {isSignUp && (
                        <InputField
                          label="Full name"
                          name="name"
                          placeholder="Enter your full name"
                          autoComplete="name"
                          value={values.name}
                          onChange={updateField}
                          onBlur={handleBlur}
                          error={touched.name && errors.name}
                        />
                      )}

                      <InputField
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="name@company.com"
                        autoComplete="email"
                        value={values.email}
                        onChange={updateField}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                      />

                      <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder={isSignUp ? "At least 8 characters" : "Enter your password"}
                        autoComplete={isSignUp ? "new-password" : "current-password"}
                        value={values.password}
                        onChange={updateField}
                        onBlur={handleBlur}
                        error={touched.password && errors.password}
                      />

                      {isSignUp && (
                        <InputField
                          label="Confirm password"
                          name="confirmPassword"
                          type="password"
                          placeholder="Enter your password again"
                          autoComplete="new-password"
                          value={values.confirmPassword}
                          onChange={updateField}
                          onBlur={handleBlur}
                          error={touched.confirmPassword && errors.confirmPassword}
                        />
                      )}

                      {!isSignUp && (
                        <div className="-mt-1 text-[11px] text-[#687382]">
                          <span>Use the email address you registered with.</span>
                        </div>
                      )}

                      <Button type="submit" disabled={isSubmitting || !isValid}>
                        {isSubmitting ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
                      </Button>
                    </Form>
                  );
                }}
              </Formik>

            </div>
          )}
        </section>
        <footer className="mt-4 flex flex-col gap-1.5 text-center text-[11px] text-[#7c8692]">
          <span>For employee use only</span>
          <span>Demo portal · Account details stay in this browser</span>
        </footer>
      </div>
    </main>
  );
}

export default Auth;
