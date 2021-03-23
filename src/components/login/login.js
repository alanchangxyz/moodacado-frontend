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
    hash.expires_in = Number(hash.expires_in);

    cookies.cookies.set('spotifyToken', hash.access_token, {
        path: '/',
        maxAge: hash.expires_in
    });
    // history.replace("/dashboard");
    return null;
}

LogIn.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(LogIn);