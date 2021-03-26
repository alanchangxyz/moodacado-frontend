import "./SendFriendRequest.css";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { useState } from 'react';
const axios = require('axios');

const SendFriendRequest = (prop) => {
    const [searchId, setSearchId] = useState('');
    const token = prop.cookies.get("spotifyToken");
    const [sendProgress, setSendProgress] = useState('');    
    
    const handleChange = (e) => {
        setSearchId(e.target.value);
        setSendProgress('');
    }

    const handleOnSubmit = (e) => {
        setSendProgress('Sending friend request...');
        const instance = axios.create({
            baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
            withCredentials: true,
        });
        instance.post("/friends/requests", {'user1': prop.user, 'user2': searchId})
          .then((response) => {
            setSendProgress(response.data);
          })
          .catch((err) => {
            // console.log('Something went wrong fetching from the backend');
            setSendProgress(err.message);
          });
        // setSendProgress('Sent successfully!');
    }

      return (
        <div className="send-friend-request-container">
            <div className="send-friend-request-text-container">
                <span className="send-friend-request-text">Send a Friend Request</span>
            </div>
            <div className="friend-request-form-container">
                <input
                    type="text"
                    className="user-id-search"
                    placeholder="Enter a user's ID to send a friend request..."
                    value={searchId}
                    onChange={handleChange}
                />
                <button
                    className="submit-friend-request-button"
                    onClick={handleOnSubmit}
                >
                    Submit
                </button>
            </div>
            <span className="progress-notif">{sendProgress ? sendProgress : ''}</span>
        </div>
    )

}

SendFriendRequest.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
};


export default withCookies(SendFriendRequest);