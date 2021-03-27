import "./friendRequestCard.css";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { useState } from 'react';
const axios = require('axios');

const IncomingFriendRequests = (prop) => {
    const user = prop.user;
    const origin = prop.origin;
    const [handled, setHandled] = useState(false);

    const handleFriendRequest = (e) => {
        const instance = axios.create({
            baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
            withCredentials: true,
          });
        instance.post(`/friends/requests/handle`, {'user1': user.user_id, 'user2': origin, 'action': e.target.value})
            .then((response) => {                
                setHandled(true);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return !handled ? (
    <div className="incoming-request-container">
        <table>
            <tbody>
                <tr>
                    <td className="incoming-request-pfp-container">
                        <img className="incoming-request-pfp" src={user.pfp} />
                    </td>
                    <td>
                        <span className="incoming-request-name">
                            {user.disp_name}{user.user_id.length > 15 ? " (" + user.user_id.substring(0, 15) + "...)" : " (" + user.user_id + ")"}
                        </span>
                    </td>
                    <td className="handle-buttons-container">
                        <button className='reject-friend-request' value='reject' onClick={handleFriendRequest}>
                            x
                        </button>
                        <button className='accept-friend-request' value='accept' onClick={handleFriendRequest}>
                            ✓
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>) : null;
}

IncomingFriendRequests.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(IncomingFriendRequests);