import React from "react";

import * as yup from "yup";

const Register = (props) => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .max(20)
      .matches(/^[A-Za-z0-9]+$/i, {
        message: "Must not use special characters",
        excludeEmptyString: true,
      })
      .required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
  });

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>

        <form onSubmit={(e) => props.onRegister(e)}>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label htmlFor="username" className="label">
                  <span className="label-text">Username</span>
                </label>

                <input
                  required
                  type="text"
                  value={props.username}
                  name="username"
                  onChange={({ target }) =>
                    props.onUsernameChange(target.value.trim())
                  }
                  placeholder="username"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  value={props.email}
                  name="email"
                  onChange={({ target }) =>
                    props.onEmailChange(target.value.trim())
                  }
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  value={props.password}
                  name="password"
                  onChange={({ target }) =>
                    props.onPasswordChange(target.value.trim())
                  }
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  value={props.confirmPassword}
                  name="confirmPassword"
                  onChange={({ target }) =>
                    props.onConfirmPasswordChange(target.value.trim())
                  }
                  placeholder="confirm password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
