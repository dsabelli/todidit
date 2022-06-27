import React from "react";
const Login = (props) => {
  return (
    <form className="bg-red-600" onSubmit={(e) => props.onLogin(e)}>
      <div>
        username
        <input
          type="text"
          value={props.username}
          name="Username"
          onChange={({ target }) => props.onUsernameChange(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={props.password}
          name="Password"
          onChange={({ target }) => props.onPasswordChange(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default Login;
