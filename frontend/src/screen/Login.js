import React, { useState } from "react";
import { Form, Col, Row, Button, Card, Image } from "react-bootstrap";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please fill all the fields");
    } else if (password.trim().length < 6) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return alert("Please use a valid password");
    } else {
      let postObject = { email, password };

      await axios
        .post("http://localhost:6500/api/auth/login", postObject)
        .then((res) => {
          localStorage.setItem("authToken", res.data.token);
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
        <Col sm={8} style={{ backgroundColor: "#1F456E"}}>
         
         <div style={{ backgroundImage: `url(${"https://res.cloudinary.com/iplus/image/upload/v1675448752/Surge/ggggggggg_lljdju.png"})`,width:'50%'}}>
         <div style={{ paddingTop: "20vh", paddingBottom: "19vh", paddingLeft: "5vh"  }}>
            <Card border="light" style={{ width: '48rem' }}>
              <Card.Body>
                <Form onSubmit={loginHandler}>
                  {error && <span className="error-message" style={{ color: "red" }}>{error}</span>}
                  <div style={{ paddingLeft: "40%" }}>
                    <Image style={{ width: "21vh", height: "20vh" }}
                      src=
                      "https://res.cloudinary.com/iplus/image/upload/v1675420038/Surge/d01ec360d5063a66bb15e59fbf18eec2_sjyiiq.gif"
                      roundedCircle
                    />
                  </div>
                  <br/>
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
                  <div style={{ paddingTop: "3vh" }}>
                    <Form.Group as={Col} md={12} className="login-btn">
                      <div className="d-grid gap-2">
                      <Button style={{backgroundColor:"#1F456E"}}  type="submit">
                        Login
                        </Button>
                        <Row>
                          <Col></Col>
                          <Col>
                          <div style={{paddingLeft:"10vh"}}>
                            Do not have an account  <a href="/register" style={{color:"#1F456E"}}>Register Here</a>
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
            <h1 style={{color:"#1F456E"}}>DoG-Paw</h1>
            <h3 style={{color:"#1F456E"}}>Intern 2023</h3>
            <h3 style={{color:"#1F456E"}}>Lakindu Kavishka</h3>
          </div>
        </Col>
      </Row>

    </div>




  );
};

export default Login;