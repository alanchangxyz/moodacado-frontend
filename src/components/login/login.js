import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
const axios = require('axios');

const LogIn = (cookies) => {
    const history = useHistory();
    const [res, setRes] = useState(null);
    const hash = window.location.hash.substring(1)
        .split('&')
        .reduce((initial, item) => {
            if (item) {
              var parts = item.split("=");
              initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
          }, {});
    const query = window.location.search.substring(1)
        .split('&')
        .reduce((initial, item) => {
            if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
    
    useEffect(() => {
        const instance = axios.create({
            baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
            withCredentials: true,
        });
        instance.post("/auth/checkin")
          .then((response) => {
            setRes(response.data);
          })
          .catch((err) => {
            // console.log('Something went wrong fetching from the backend');
            console.log(err.message);
          });
    }, []);
    
    useEffect(() => {
        if (res === null) {return;}
        if ('error' in query) {
            history.replace("/");
        }
        else if (Object.keys(hash).length > 0) {
            // to do: check for valid token, pass state in and check in return
            if ('expires_in' in hash) {
                console.log(res);
                if (res) {
                    cookies.cookies.set('spotifyToken', hash.access_token, {
                        path: '/',
                        maxAge: Number(hash.expires_in)
                    });
                    history.replace("/dashboard");
                } else {
                    history.replace("/");
                }
                
            } else {
                history.replace("/");
            } 
        }
    }, [res])

    return null;
}

LogIn.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(LogIn);