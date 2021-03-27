import "./IncomingFriendRequests.css";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { useEffect, useState } from "react";
import FriendRequestCard from './friendRequestCard';
const axios = require('axios');

const IncomingFriendRequests = (prop) => {
    const [incomingFriendData, setIncomingFriendData] = useState(null);
    const [friendRequestCards, setFriendRequestCards] = useState([]);
    useEffect(() => {
        const instance = axios.create({
            baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
            withCredentials: true,
          });
      
        instance.get(`/friends/requests/${prop.user}`)
            .then((response) => {
                setIncomingFriendData(response.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [prop.user]);

    useEffect(() => {
        if (!incomingFriendData) {return;}
        else {
            console.log(incomingFriendData);
            setFriendRequestCards(incomingFriendData.map(f => <FriendRequestCard user={f} origin={prop.user} />));
        }
    }, [incomingFriendData]);

    return (
        <div className="ifr-container">
            <div className="incoming-friend-requests-container">
                <div className="incoming-friend-requests-text-container">
                    <span className="incoming-friend-requests-text">Incoming Friend Requests</span>
                </div>
                <div className="incoming-friend-requests-cells-container">
                    {friendRequestCards}
                </div>
            </div>
        </div>
    )

}

IncomingFriendRequests.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
};


export default withCookies(IncomingFriendRequests);