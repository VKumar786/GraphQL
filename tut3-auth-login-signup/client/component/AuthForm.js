import React from "react";

const AuthForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} method="post">
      <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Enter Email..."
      />
      <input
        type="password"
        name="password"
        id="password"
        required
        placeholder="Enter Password..."
      />
      <p
        id="err"
        style={{ color: "red", fontSize: "18px", margin: "1rem auto" }}
      />
      <button
        style={{
          margin: "0 auto",
          display: "block",
          background: "teal",
          border: "0",
          borderRadius: "7px",
          padding: "10px 20px",
          color: "#fff",
        }}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
