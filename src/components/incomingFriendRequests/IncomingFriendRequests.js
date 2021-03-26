import "./IncomingFriendRequests.css";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
const axios = require('axios');

const IncomingFriendRequests = (prop) => {

    return (
        <div className="incoming-friend-requests-container">
            <div className="incoming-friend-requests-text-container">
                <span className="incoming-friend-requests-text">Incoming Friend Requests</span>
            </div>
            <div className="incoming-friend-requests-cells-container">
                
            </div>
        </div>
    )

}

IncomingFriendRequests.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
};


export default withCookies(IncomingFriendRequests);