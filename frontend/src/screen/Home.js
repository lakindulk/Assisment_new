import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Avatar } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { Image } from "cloudinary-react";
import { LogoutOutlined } from '@ant-design/icons';

const Home = () => {

  let hasToken;
  if (localStorage.getItem("authToken")) {
    hasToken = localStorage.getItem("authToken");
  }
  const [image, setimage] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [fullname, setfullname] = useState("");
  const [post, setpost] = useState([]);
  const [likes, setLikes] = useState([]);
  let postLikes = {};
  const [active, setActive] = useState(postLikes.userLiked);
  const [postWithLikes, setPostWithLikes] = useState([]);

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    window.location = "/";
  };
  const handleClick = async (id) => {
    setActive(postLikes.userLiked);
    if (!active) {
      setActive(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      try {
        const response = await axios.patch(
          `http://localhost:6500/api/likes/${id}`,
          {},
          config
        );
        const updatedLikes = likes.map((like) => {
          if (like.postId === id) {
            return {
              ...like,
              likes: like.likes + 1,
            };
          }
          return like;
        });
        setLikes(updatedLikes);
      } catch (error) {
        console.error(error);
      }
    } else {
      setActive(false);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      try {
        await axios.patch(`http://localhost:6500/api/likes/${id}`, {}, config);
        const updatedLikes = likes.map((like) => {
          if (like.postId === id) {
            return {
              ...like,
              likes: like.likes - 1,
            };
          }
          return like;
        });
        setLikes(updatedLikes);
      } catch (error) {
        console.error(error);
      }
    }
  };

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
            setemail(res.data.profile.email);
            setfullname(res.data.profile.fullname);
            setimage(res.data.profile.profilePicture.imageSecURL);
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
        {hasToken && (<div>
          <Row>
            <Col span={4} style={{ backgroundColor: "#1F456E",paddingBottom:'50%' }}>
              <div style={{ position: "fixed", paddingTop: '4vh', paddingLeft: '4vh' }}>
                <img src="https://res.cloudinary.com/iplus/image/upload/v1675608354/Surge/qq_copy_copy_bt1vgg.png" style={{ width: "50%" }} alt="logo" />
              </div>
            </Col>
            <Col span={14}   >
              <div style={{ paddingTop: '5vh', paddingLeft: '5vh' }}>
                <h6>Login email : {email}</h6>
              </div>

              {postWithLikes.map((po) => {
                postLikes = likes.find((like) => like.postId === po._id);

                return (
                  <div key={po._id} align="middle" style={{ backgroundColor: "#F5F6F5", paddingTop: "3%" }}>

                    <Card
                      hoverable
                      style={{
                        width: "650px",

                      }}
                      cover={
                        <Image
                          cloudName="iplus"

                          publicId={po.posttImage.imagePublicId}
                        />
                      }
                    >
                      <h1>{po.title}</h1>
                      <h6>{po.description}</h6>

                      <Row>
                        <Col span={8}  >
                          <div onClick={handleClick}  >
                            <HeartFilled onClick={() => {
                              handleClick(po._id);
                            }} />{' '}

                            {po.likes}

                          </div>

                        </Col>
                        <Col span={8} >{po.username}</Col>
                        <Col span={8}>{po.date}</Col>

                      </Row>

                    </Card>
                    <br />

                  </div>


                );
              })}

            </Col>
            <Col span={6} style={{ backgroundColor: "#1F456E", backgroundImage: `url(${"https://res.cloudinary.com/iplus/image/upload/v1675608486/Surge/ggggggssssssssssssggg_ibx4n2.png"})` }}>
              <div style={{ paddingLeft: "15px", paddingRight: "20px", paddingTop: "20px", position: "fixed" }}>
                <Card style={{ backgroundColor: "#FAF9F6", width: "350px" }}>
                  <div onClick={logOutHandler} style={{ cursor:'pointer'}}>
                    <LogoutOutlined />LogOut
                  </div >
                  <div style={{ paddingLeft: "30%", paddingRight: "60%", paddingTop: "2%" }}>
                    <Avatar size={120} icon={<img src={image} alt="post" />} />
                  </div>
                  <div style={{ paddingLeft: "60px", paddingTop: "10%" }}>
                    <h1 style={{ fontFamily: "Trirong", fontWeight: "bold", fontSize: "30px", color: "#000000" }}>{username}</h1>
                    <h3 style={{ fontFamily: "Trirong", fontWeight: "semibold", fontSize: "24px", color: "#000000" }}>{fullname}</h3>

                  </div>
                  <div style={{ paddingLeft: "25px" }}>
                    <a href="/post">
                      <button type="button" class="btn btn-outline-dark" style={{ width: "120px" }}>
                        Create Post
                      </button>{' '}
                    </a><a href="/viewpost">
                      <button type="button" class="btn btn-outline-dark" style={{ width: "120px" }}>
                        View Post
                      </button>

                    </a>
                  </div>

                </Card>
              </div>
            </Col>
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

export default Home;
