import React from "react";
import { useNavigate } from "react-router";
import "./ErrorPage.css";

const ErrorPage = () => {
    let navigate = useNavigate();

    const handleRedirectToHome = () => {
        navigate("/attractions");
    };
    return (
        <div
            style={{
                backgroundColor: "#fdfaf5",
                width: "100vw",
                height: "100vh",
                color: "#aaa",
            }}
        >
            <h1 className="errorPageH1">PAGE COULD NOT BE FOUND</h1>
            <p className="zoom-area">
                The page you're trying to access does not exist.
            </p>
            <section className="error-container">
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
                <span className="zero">
                    <span className="screen-reader-text">0</span>
                </span>
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
            </section>
            <div className="link-container">
                <button className="more-link" onClick={handleRedirectToHome}>
                    go back to homepage
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
