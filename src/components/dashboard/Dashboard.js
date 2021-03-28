import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import FriendCard from "../friendCards/FriendCard";
import SendFriendRequest from "../sendFriendRequest/SendFriendRequest";
import IncomingFriendRequests from "../incomingFriendRequests/IncomingFriendRequests";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import axios from "axios";

function Dashboard(cookies) {
  const history = useHistory();
  // const [inputText, setInputText] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [userFriends, setUserFriends] = useState(<h1>No current friends logged</h1>);
  const userToken = cookies.cookies.get("spotifyToken");

  // const setValue = () => {
  //   let userInput = document.getElementById("status").value;
  //   setInputText(userInput);
  // };

  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    withCredentials: true,
  });

  // const model = axios.create({
  //   baseURL: `${process.env.REACT_APP_MODEL_HOST}:${process.env.REACT_APP_MODEL_PORT}`,
  // });

  useEffect(() => {
    instance.post("/profile/", {'token': userToken})
    .then((response) => {
        setUserProfile(response.data[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
    }, []);

  const logOut = () => {
    cookies.cookies.remove("spotifyToken");
    history.push("/");
  };

  // const modelTest = () => {
  //   model.get('/model')
  //   .then((response) => {
  //       var result = response.data;
  //       return result;
  //     },
  //     (error) => {
  //         console.log(error);
  //   });
  // }

  useEffect(() => {
    if (userProfile) {
      instance.post("/profile/friends", {'user_id': userProfile.user_id})
      .then((response) => {
          const friends = response.data;
          if (friends.length !== 0) {
            setUserFriends(response.data.map((friend, i) => {
              instance.post("/songs/features", {'token': userToken, 'songs': [friend.song_id]})
                .then((response2) => {
                    return <FriendCard key={i} name={friend.disp_name} profilePicture={friend.pfp} song={friend.song_name} artist={friend.song_artist} albumcover={friend.img_url} emotion={response2.data[0]} />;   
                })
                .catch((err) => {
                    console.log('what could have gone wrong here');
                });
            }));            
          } else {
            console.log("user has no friends");
          }
      })
      .catch((err) => {
          console.log(err.message);
      });
    }
  }, [userProfile]);

  // useEffect(() => {
  //   console.log(userFriends);
  //   if (userFriends) {
  //     userFriends = userFriends.map((friend, i) => {
  //       instance.post("/audio/features", {'token': userToken, 'songs': [friend.song_id]})
  //         .then((response) => {
  //             return <FriendCard key={i} name={friend.disp_name} profilePicture={friend.pfp} song={friend.song_name} artist={friend.song_artist} albumcover={friend.img_url} emotion={response.data[0]} />;   
  //         })
  //         .catch((err) => {
  //             console.log(err.message);
  //         });
  //     });
  //   }
  //   // friends.map( (friend, i) => {
  //   //   return <FriendCard key={i} name={friend.disp_name} profilePicture={friend.pfp} song={friend.song_name} artist={friend.song_artist} albumcover={friend.img_url} ></FriendCard>;   
  //   // })
  // }, [userFriends]);


  return (
    <Container fluid>
      <Row>
        <Col className="col-3">
          <Container className="profile-pic">
            <Image
              fluid
              src={userProfile ? userProfile.pfp : ""}
              roundedCircle
            />
          </Container>

          <Container className="recent-activity">
            <Container className="recent-text">Recent Activity</Container>
            <Card className="recent-song-card">
              <Card.Img
                variant="top"
                src={userProfile ? userProfile.img_url : "" }
                rounded="true"
              />
              <Container className="recent-info">
                <span className="user-recent-title">{userProfile ? userProfile.song_name : "" }</span>
                <span className="user-recent-artist">{userProfile ? userProfile.song_artist : ""}</span>
              </Container>
            </Card>
          </Container>
          <Container className="log-out-container">
            <button className="log-out-button" onClick={logOut}>
              Log out
            </button>
          </Container>
        </Col>
        <Col className="col-9">
          <div className="welcome">
            <h1 id="hello-name">{userProfile ? `Hello ${userProfile.disp_name}!`: "Hello!"}</h1>
          </div>
          <div className="user-id-container">
            <span className="user-id-span">{userProfile ? `Your user ID is ${userProfile.user_id}` : ''}</span>
          </div>
          {/* <div className="welcome-container">
            <input
              name="status"
              placeholder="How are you feeling right now?"
              type="text"
              maxLength="512"
              id="status"
              className="statusInput"
            />
            <Button onClick = {setValue} className="check-in-btn">Check In!</Button>{' '}
          </div> */}
          <SendFriendRequest user={userProfile ? userProfile.user_id : null} />
          <IncomingFriendRequests user={userProfile ? userProfile.user_id : null} />          
          <Container className="friends">
            <Container className="friends-recent">
              <h3>Your Friends' Recent Activity </h3>
            </Container>
            <Container className="inner-friend-container">
              {userFriends}
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

Dashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Dashboard);
