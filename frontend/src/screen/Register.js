import React, { useState, useEffect } from "react";
import { Form, Col, Button, Card, Row } from "react-bootstrap";
import axios from "axios";
import FileBase from "react-file-base64";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha
} from "react-simple-captcha";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileEnc, fileEncData] = useState(null);
  const [username, setusername] = useState("");
  const [phone, setphone] = useState("");
  const [fullname, setfullname] = useState("");
  const [error, setError] = useState("");
  const [captchaerror, setcaptchaerror] = useState("");
  const regex = /\S+@\S+\.\S+/;

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const loginHandler = async (e) => {

    let user_captcha = document.getElementById("user_captcha_input").value;
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0 || phone.trim().length === 0 || fullname.trim().length === 0 || username.trim().length === 0 || fileEnc.trim().length === 0) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please fill all the fields");
    } else if (password.trim().length < 6) {
      setTimeout(() => {
        setError("Time Out");
      }, 5000);
      return setError("Please use a valid password with at least 6 characters");
    } else if (!phone.trim().match(/^[0-9\b]+$/) || phone.trim().length < 10) {
      setTimeout(() => {
        setError("Time Out");
      }, 5000);
      return setError("Please provide valid contact number");
    } else if (!fullname.trim().match(/^[A-Za-z\s]*$/) || fullname.trim().length < 10) {
      setTimeout(() => {
        setError("Time Out");
      }, 5000);
      return setError("Please provide valid full name");
    }
    else if (!email.trim().match(regex)) {
      setTimeout(() => {
        setError("Time Out");
      }, 5000);
      return setError("Please provide valid email");
    }
    else if (validateCaptcha(user_captcha) === false) {
      setError("Captcha Does Not Match");
      document.getElementById("user_captcha_input").value = "";
    }
    else {
      setcaptchaerror("Captcha Matched.. ");
      loadCaptchaEnginge(6);
      document.getElementById("user_captcha_input").value = "";


      let postObject = { email, password, fileEnc, fullname, phone, username };

      await axios
        .post("http://localhost:6500/api/auth/reg", postObject)
        .then((res) => {
          localStorage.setItem("authToken", res.data.token);
          setcaptchaerror("Loading Page Please Wait Little Longer.. ");
          window.location = `/home`;
        })
        .catch((err) => {
          setError(err.response.data.desc);
          setTimeout(() => {
            setError("");
          }, 5000);
        });
    }

  };

  return (
    <div>
      <Row>
        <Col sm={8} style={{ backgroundColor: "#1F456E" }}>
          <div style={{ backgroundImage: `url(${"https://res.cloudinary.com/iplus/image/upload/v1675448752/Surge/ggggggggg_lljdju.png"})`, width: '50%' }}>

            <div style={{ paddingTop: "3vh", paddingBottom: "5vh", paddingLeft: "15vh" }}>
              <Card border="light" style={{ width: '48rem' }}>
                <Card.Body>
                  <Form onSubmit={loginHandler}>
                    {!error && captchaerror && <span className="error-message" style={{ color: "blue" }}>{captchaerror}</span>}
                    {error && <span className="error-message" style={{ color: "red" }}>{error}</span>}


                    <Form.Group as={Col} md={12} controlId="email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md={12} controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md={12} controlId="username">
                      <Form.Label>username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="username"
                        minLength={6}
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md={12} controlId="phone">
                      <Form.Label>phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="phone"
                        minLength={6}
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md={12} controlId="fullname">
                      <Form.Label>fullname</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="fullname"
                        minLength={6}
                        value={fullname}
                        onChange={(e) => setfullname(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="fileupload">
                      <Form.Label>Profile Picture</Form.Label>
                      <h6>**Please do not exceed the amount of file size 25MB </h6>
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => {
                          fileEncData(base64);
                        }}
                      />
                    </Form.Group>
                    <div>
                      <div className="container">
                        <div className="form-group">
                          <div className="col mt-3">
                            <LoadCanvasTemplate />
                          </div>

                          <div className="col mt-3">
                            <div>
                              <input
                                placeholder="Enter Captcha"
                                id="user_captcha_input"
                                name="user_captcha_input"
                                type="text"
                                required
                              ></input>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div>
                      <br />

                      <Form.Group as={Col} md={12} className="login-btn">
                        <div className="d-grid gap-2">
                          <Button style={{ backgroundColor: "#1F456E" }} type="submit"  >
                            Register
                          </Button>
                          <Row>
                            <Col></Col>
                            <Col>
                              <div style={{ paddingLeft: "18vh" }}>
                                Have an account  <a href="/" style={{ color: "#1F456E" }}>Login Here</a>
                              </div>
                            </Col>
                          </Row>
                        </div>

                      </Form.Group>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
              <br />

            </div>

          </div>
        </Col>
        <Col sm={4}>
          <div style={{ paddingTop: "30vh", paddingRight: "3vh" }}>
            <h1 style={{ color: "#1F456E" }}>DoG-Paw</h1>
            <h3 style={{ color: "#1F456E" }}>Intern 2023</h3>
            <h3 style={{ color: "#1F456E" }}>Lakindu Kavishka</h3>
          </div>
        </Col>
      </Row>



    </div>



  );
};

export default Register;