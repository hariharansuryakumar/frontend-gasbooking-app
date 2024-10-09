import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(3, "firstName must be at least 3 characters")
      .max(15, "firstName cannot exceed 15 characters")
      .required("Required"),
    last_name: Yup.string()
      .min(3, "last_name must be at least 3 characters")
      .max(15, "last_name cannot exceed 15 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  // Initial values for the form fields
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      delete values.confirmPassword;
      await registerUser(values);
      alert("Register successfully");
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.error || "Failed to register");
      console.log(error);
    }
  };

  return (
    <Container className="bs mt-4 p-3">
      <h1 className="text-center">Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="first_name">First Name</label> <br />
            <Field
              type="text"
              id="first_name"
              name="first_name"
              className="w-100"
            />
            <ErrorMessage name="first_name" component="div" className="error" />
          </div>
          <br />
          <div>
            <label htmlFor="last_name">Last Name</label> <br />
            <Field
              type="text"
              id="last_name"
              name="last_name"
              className="w-100"
            />
            <ErrorMessage name="last_name" component="div" className="error" />
          </div>
          <br />
          <div>
            <label htmlFor="email">Email</label> <br />
            <Field type="email" id="email" name="email" className="w-100" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label> <br />
            <Field
              type="password"
              id="password"
              name="password"
              className="w-100"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <br />
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label> <br />
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-100"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />
          </div>
          <br />
          <button type="submit" className="mr-auto btn btn-dark">
            Register
          </button>
        </Form>
      </Formik>
    </Container>
  );
};

export default RegisterForm;
