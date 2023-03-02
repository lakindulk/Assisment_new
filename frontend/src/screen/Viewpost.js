import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Modal, Form, Col } from 'react-bootstrap';
import { Card, Button, Popconfirm, message, Avatar } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { Image } from "cloudinary-react";
import { LogoutOutlined } from '@ant-design/icons';

const Viewpost = () => {


    let hasToken;
    if (localStorage.getItem("authToken")) {
        hasToken = localStorage.getItem("authToken");
    }

    const [uemail, setuemail] = useState(" ");
    const [username, setusername] = useState(" ");
    const [post, setpost] = useState([]);
    const [fullname, setfullname] = useState(" ");


    const [title, settitle] = useState(" ");
    const [description, setdescription] = useState(" ");
    const [show, setShow] = useState(false);
    const [_id, setid] = useState(" ");
    const [u_id, setuID] = useState(" ");

    const [likes, setLikes] = useState([]);
    let postLikes = {};
    const [active, setActive] = useState(postLikes.userLiked);
    const [postWithLikes, setPostWithLikes] = useState([]);

    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        window.location = "/";
    };

    const handleClose = () => setShow(false);
    const handleShow = (_id, title,
        description) => {
        setShow(true);
        setid(_id);
        settitle(title);
        setdescription(description);
    }

    //delete profile funtion
    function onDelete(_id) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
        console.log(_id);
        axios.delete("http://localhost:6500/api/profile/deletepost/" + _id, config).then((res) => {
            alert('Deleted Successfully');
            window.location.reload();
        }).catch((err) => {
            alert(err.message);
        })
    }

    const confirm = (e) => {
        console.log(e);
        onDeleteuser(u_id)
        message.success('Deleted');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Canceled');
    };

    //delete funtion
    function onDeleteuser(u_id) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
        console.log(_id);
        axios.delete("http://localhost:6500/api/profile/deleteprofile/" + u_id, config).then((res) => {
            window.location = `/`;
        }).catch((err) => {
            alert(err.message);
        })
    }
    const updateUser = (e) => {
        e.preventDefault();
        update(e)
    };

    //update funtion
    function update() {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
        const editpost = {
            title, description
        }

        axios.put("http://localhost:6500/api/profile/updatepost/" + _id, editpost, config).then(() => {
            settitle('');
            setdescription('');

            alert("Updated Successfully");
            window.location.reload();
        }).catch((err => {
            alert(err)
        }))
    }

    useEffect(() => {

        const GetPosts = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };
            try {
                await axios
                    .get(
                        "http://localhost:6500/api/profile/getpost/",
                        config
                    )

                    .then((res) => {
                        console.log(res.data.allposts);
                        setpost(res.data.allposts);
                    })
                    .catch((err) => {
                        alert("Error occured!!! : " + err);
                    });
            } catch (error) {
                alert("Error occured!!! : " + error);
            }
        };

        const getLikes = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            };
            try {
                await axios
                    .get('http://localhost:6500/api/likes', config)
                    .then((res) => {
                        setLikes(res.data.likes);
                        console.log(res.data);
                    })
                    .catch((err) => {
                        alert('Error occured!!! : ' + err);
                    });
            } catch (error) {
                console.error(error);
            }
        };

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
                        setusername(res.data.profile.username);
                        setuemail(res.data.profile.email);
                        setfullname(res.data.profile.fullname);
                        setuID(res.data.profile._id);
                    })
                    .catch((err) => {
                        alert("Error occured!!! : " + err);
                    });
            } catch (error) {
                alert("Error occured!!! : " + error);
            }
        };
        GetProfile();
        GetPosts();
        getLikes();

    }, []);
    useEffect(() => {
        const postWithLikes = post.map((po) => {
            const like = likes.find((like) => like.postId === po._id);
            return {
                ...po,
                likes: like.likes,
                userLiked: like.userLiked,
            };
        });
        setPostWithLikes(postWithLikes);
    }, [likes]);


    return (
        <>

            <div >
                <Row>

                    <div class="col-8" style={{ paddingLeft: "6%" }}>
                        <Row>
                            <Col>
                                <h1 style={{ fontFamily: "Trirong", fontWeight: "bold", fontSize: "30px", color: "#1F456E", paddingTop: "2%" }}> Profile Details</h1>
                            </Col>

                            <Col> 
                            <div onClick={logOutHandler} style={{ paddingLeft: "60vh",cursor: 'pointer', color: 'black' }}>
                                <LogoutOutlined /> {' '}LogOut
                            </div ></Col>
                            <Col> <div style={{ paddingLeft: "15px", paddingTop: "2%" }}>
                                <Popconfirm
                                    title="Are you sure You Want to delete this Profile?"
                                    description="Are you sure to delete this Profile?"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger >Delete Profile</Button> {' '}

                                </Popconfirm>

                            </div></Col>
                        </Row>

                        <h3 style={{ fontFamily: "Trirong", fontWeight: "semibold", fontSize: "20px", color: "#000000" }}>Your Username :{username}</h3>
                        <h3 style={{ fontFamily: "Trirong", fontWeight: "semibold", fontSize: "20px", color: "#000000" }}>Your Fullname : {fullname}</h3>
                        <h3 style={{ fontFamily: "Trirong", fontWeight: "semibold", fontSize: "20px", color: "#000000" }}>Your Email :{uemail}</h3>
                        <h1 style={{ fontFamily: "Trirong", fontWeight: "bold", fontSize: "26px", color: "#1F456E", paddingTop: "2%" }}>All uploaded post</h1>
                        {hasToken && (<div>



                            {postWithLikes.filter(po => {
                                if (po.email === uemail) {
                                    return po
                                } else {
                                    <h1>No Posts</h1>
                                }

                            }).map((po) => {
                                postLikes = likes.find((like) => like.postId === po._id);

                                return (
                                    <div  >

                                        <div key={po._id} style={{ paddingTop: "1%", paddingLeft: "15%", paddingBottom: '1%' }}>

                                            <Card
                                                hoverable
                                                style={{
                                                    width: "450px",

                                                }}
                                                cover={
                                                    <div style={{ paddingTop: "2%", paddingLeft: "10%" }}>

                                                        <Image
                                                            cloudName="iplus"
                                                            style={{
                                                                width: "360px",

                                                            }}
                                                            publicId={po.posttImage.imagePublicId}
                                                        />
                                                    </div>

                                                }
                                            >
                                                <h5>{po.title}</h5>
                                                <div   >
                                                    <HeartFilled />{' '}
                                                    {po.likes}
                                                </div><br />

                                                <Button type="primary" onClick={() => handleShow(po._id, po.title, po.description)} >Edit</Button> {' '}
                                                <Button danger onClick={() => onDelete(po._id)}>Delete</Button>

                                            </Card>



                                            <br />


                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Edit Details </Modal.Title>

                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form >
                                                        <div >
                                                            <Form.Label>Title :</Form.Label>
                                                            <Form.Control placeholder="title"
                                                                value={title}
                                                                onChange={(e) => settitle(e.target.value)} />
                                                        </div>

                                                        <div >
                                                            <Form.Label>Description : </Form.Label >
                                                            <Form.Control placeholder="description"
                                                                value={description}
                                                                onChange={(e) => setdescription(e.target.value)} />
                                                        </div>

                                                        <div style={{ paddingBottom: '2vh', paddingTop: '2vh' }}>

                                                            <Button variant="outline-success" type="submit" onClick={(e) => updateUser(e)}>Edit</Button>
                                                            {' '}<Button variant="secondary" onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                        </div >

                                                    </Form>
                                                </Modal.Body>

                                            </Modal>

                                        </div>
                                    </div>

                                );
                            })}

                        </div>)}
                        {!hasToken && (<div>
                            <a href="/">
                                Time Out Login again from here ...
                            </a>
                        </div>)}
                    </div>

                    <div class="col-4" style={{ backgroundColor: "#1F456E", backgroundImage: `url(${"https://res.cloudinary.com/iplus/image/upload/v1675608486/Surge/ggggggssssssssssssggg_ibx4n2.png"})`, backgroundSize: "100%",paddingBottom:'50%' }}>

                        <div style={{ paddingTop: '5vh', paddingLeft: '3vh' }}>
                            <a href="/home">
                                <Button  >Back</Button>
                            </a>
                        </div>
                        <div style={{ position: "fixed", paddingTop: '3%', paddingLeft: '10%' }}>
                            <a href="/home">
                                <Avatar size={150} style={{ backgroundColor: "#1F456E" }} icon={

                                    <img src="https://res.cloudinary.com/iplus/image/upload/v1675608354/Surge/qq_copy_copy_bt1vgg.png" alt="logo" />


                                } />

                            </a>

                        </div>
                    </div>

                </Row>

            </div>
        </>
    );
};

export default Viewpost;
