import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>
          Copyright © {new Date().getFullYear()} todidit.com |{" "}
          {
            <Link className="hover:link" to={"/privacy"}>
              Privacy
            </Link>
          }{" "}
          |{" "}
          {
            <Link className="hover:link" to={"/terms-of-service"}>
              Terms
            </Link>
          }{" "}
          |{" "}
          {
            <Link className="hover:link" to={"/contact"}>
              Contact
            </Link>
          }
        </p>
      </div>
    </footer>
  );
};

export default Footer;
