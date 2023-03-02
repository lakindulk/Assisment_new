import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Row, Col, Form, Card, Alert } from 'react-bootstrap';
import FileBase from "react-file-base64";



const CreatePost = () => {

    let hasToken;
    if (localStorage.getItem("authToken")) {
        hasToken = localStorage.getItem("authToken");
    }

    const [uemail, setuemail] = useState(" ");
    const [uusername, setuusername] = useState(" ");


    const [title, settitle] = useState(" ");
    const [description, setdescription] = useState(" ");
    const [fileEnc, fileEncData] = useState(null);
    const [error, setError] = useState("");
    const [postadd, setpostadd] = useState("");
    const [currentdate,currentsetDate] = useState(new Date());

    function sendData(e) {
        e.preventDefault();
        if (title.trim().length === 0 || description.trim().length === 0 || fileEnc.trim().length === 0) {
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Please fill all the fields");
        }
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };

        const email = uemail
        const username = uusername
        const like = 0
        const date=currentdate.toLocaleDateString()
        const newProducr = {
            email,
            title,
            like,
            description,
            username,
            fileEnc,date
        }

        axios.post("http://localhost:6500/api/profile/createpost", newProducr, config).then(() => {
            ("Product added")

            settitle('');
            setdescription('');
            fileEncData('')
            setpostadd("post added ..");
            window.location = `/home`;

        }).catch((err) => {
            setpostadd("error");
        })
    }


    useEffect(() => {

        const GetProfile = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };
            try {
                await axios
                    .get(
                        "http://localhost:6500/api/profile/profile/",
                        config
                    )

                    .then((res) => {
                        console.log(res.data.profile);
                        setuusername(res.data.profile.username);
                        setuemail(res.data.profile.email);

                    })
                    .catch((err) => {
                        alert("Error occured!!! : " + err);
                    });
            } catch (error) {
                alert("Error occured!!! : " + error);
            }
        };
  
        GetProfile();
    }, []);
    function refreshPage() {
        window.location.reload(false);
    }
    useEffect(() => {
        var timer = setInterval(()=>currentsetDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return (
        <>

            <div  >
                {hasToken && (<div>
                  
                    {postadd && <Alert variant="info"  >
                        {postadd}</Alert>}


                    <Row>
                        <Col span={4} style={{ backgroundColor: "#1F456E", }}>
                            <div style={{ position: "fixed", paddingTop: '35%', paddingLeft: '2%' }}>
                                <a href="/home">
                                    <img src="https://res.cloudinary.com/iplus/image/upload/v1675608354/Surge/qq_copy_copy_bt1vgg.png" style={{ width: "50%" }} alt="logo" />
                                </a>

                            </div>

                            <div style={{}}>
                                <p style={{ fontFamily: "Trirong", fontWeight: "bold", fontSize: "30px", color: "white", paddingTop: "3%", paddingLeft: "20px" }}>Logged As : {uusername}</p>

                            </div>
                        </Col>
                        <Col span={14}>
                            <div style={{ paddingTop: '1vh', paddingBottom: '1vh' }}>
                                <img src=" https://assets.materialup.com/uploads/6f08fd5d-dcc4-47b7-9bca-1ac2638910d8/preview.gif" alt='gif' style={{ height: "350px", paddingLeft: "15%" }} />
                            </div>
                            <div style={{ paddingBottom: '4vh' }}>
                                <Card border="dark" style={{ width: '48rem' }}>
                                    <Card.Body>
                                        <Form onSubmit={sendData}>
                                            {error && <span className="error-message" style={{ color: "blue" }}>{error}</span>}

                                            <br />
                                            <div >

                                                <Row >


                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label >Tittle: </Form.Label>
                                                        <Form.Control type="text"
                                                            onChange={(e) => settitle(e.target.value)}

                                                            placeholder=" Enter Title .." />
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label >Description : </Form.Label>
                                                        <Form.Control type="text"
                                                            onChange={(e) => setdescription(e.target.value)}
                                                            placeholder=" Enter your description .." />
                                                    </Form.Group>


                                                </Row>
                                                <Row>

                                                    <Form.Group controlId="fileupload">
                                                        <Form.Label>Post image</Form.Label>
                                                        <h6>**Please do not exceed the amount of file size 25MB </h6>
                                                        <FileBase
                                                            type="file"
                                                            multiple={false}
                                                            onDone={({ base64 }) => {
                                                                fileEncData(base64);
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Row>


                                            </div>

                                            <div style={{ paddingLeft: "40%" }}>
                                                <Button type="submit" variant="outline-dark" style={{ width: "120px" }}> Save </Button>{' '} {' '}<Button variant="outline-dark" style={{ width: "120px" }} onClick={refreshPage}> Clear </Button>

                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>



                        </Col>


                        <Col span={4} style={{ backgroundColor: "#1F456E", backgroundImage: `url(${"https://res.cloudinary.com/iplus/image/upload/v1675608486/Surge/ggggggssssssssssssggg_ibx4n2.png"})` }}></Col>


                    </Row>

                </div>)}
                {!hasToken && (<div>
                    <a href="/">
                        Time Out Login again from here ...
                    </a>
                </div>)}


            </div>
        </>
    );
};

export default CreatePost;
