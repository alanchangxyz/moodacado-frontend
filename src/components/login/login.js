import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { useHistory } from 'react-router-dom';

const LogIn = (cookies) => {
    const history = useHistory();
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
    
    if ('error' in query) {
        // send back to home page if errored out or abnormal
        history.replace("/");
    } else if (Object.keys(hash).length > 0) {
        // to do: check for valid token, pass state in and check in return
        if ('expires_in' in hash) {
            try {
                cookies.cookies.set('spotifyToken', hash.access_token, {
                    path: '/',
                    maxAge: Number(hash.expires_in)
                });
                history.replace("/dashboard");
            } catch (err) {
                history.replace("/");
            }
            // to do: add rows to tables in db for checkin + corresponding spotify status
        } else {
            history.replace("/");
        } 
    } 
    return null;
}

LogIn.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(LogIn);