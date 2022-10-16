import React, { Component } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "./redux/store";

import { Form, Formik } from "formik";

import authValidator, {
  EMAIL,
  EMAIL_LABEL,
  PASSWORD,
  PASSWORD_LABEL,
} from "./validators/authValidator";

const initialValues = {
  [EMAIL]: "",
  [PASSWORD]: "",
};

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 0 | 1
      vieww: 0,
    };

    this.dispatch = useDispatch();
  }

  componentDidMount() {}
  componentWillUnmount() {}

  async handleLogin(values, actions) {
    actions.setSubmitting(true);

    const { data, err } = await this.dispatch(login(values));
    actions.setSubmitting(false);
  }

  async handleRegister(values, actions) {
    actions.setSubmitting(true);

    const { data, err } = await this.dispatch(register(values));

    actions.setSubmitting(false);
  }

  render() {
    return (
      <div>
        {this.state.view === 0 && (
          <Formik
            initialValues={initialValues}
            validationSchema={authValidator}
            onSubmit={this.handleLogin}
          >
            {(props) => (
              <Form className="bg-white mt-6 h-full">
                <h1>Login in to your account</h1>
                <div class="inset">
                  <p>
                    <label for="email">{EMAIL_LABEL}</label>
                    <input
                      name={EMAIL}
                      id={EMAIL}
                      type="email"
                      placeholder={EMAIL_LABEL}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                    />
                  </p>
                  <p>
                    <label for="password">{PASSWORD_LABEL}</label>
                    <input
                      name={PASSWORD}
                      id={PASSWORD}
                      type="password"
                      placeholder={PASSWORD_LABEL}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                    />
                  </p>
                </div>
                <p class="p-container">
                  <span>
                    New User ?{" "}
                    <em
                      role={"button"}
                      onClick={() => this.setState({ ...this.state, view: 1 })}
                    >
                      Register
                    </em>
                  </span>
                  <input type="submit" name="go" id="go" value="Log in" />
                </p>
              </Form>
            )}
          </Formik>
        )}

        {this.state.view === 1 && (
          <Formik
            initialValues={initialValues}
            validationSchema={authValidator}
            onSubmit={this.handleRegister}
          >
            {(props) => (
              <Form className="bg-white mt-6 h-full">
                <h1>Register your account</h1>
                <div class="inset">
                  <p>
                    <label for="email">{EMAIL_LABEL}</label>
                    <input
                      name={EMAIL}
                      id={EMAIL}
                      type="email"
                      placeholder={EMAIL_LABEL}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                    />
                  </p>
                  <p>
                    <label for="password">{PASSWORD_LABEL}</label>
                    <input
                      name={PASSWORD}
                      id={PASSWORD}
                      type="password"
                      placeholder={PASSWORD_LABEL}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                    />
                  </p>
                </div>
                <p class="p-container">
                  <span>
                    <em
                      role={"button"}
                      onClick={() => this.setState({ ...this.state, view: 0 })}
                    >
                      Login
                    </em>
                  </span>
                  <input type="submit" name="go" id="go" value="Register" />
                </p>
              </Form>
            )}
          </Formik>
        )}
      </div>
    );
  }
}
