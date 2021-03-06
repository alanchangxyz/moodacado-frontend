import "./Home.css";
import logo from "./images/Moodacado-Logo.png";

require("dotenv").config();

function Home() {
  const scopes = [
    "playlist-read-private",
    "user-read-playback-state",
    "user-read-recently-played",
    "user-read-email",
    "user-follow-read",
    "user-read-currently-playing",
    "playlist-read-collaborative",
    "user-library-read",
    "user-top-read",
  ];
  const url = `https://accounts.spotify.com/authorize?client_id=${
    process.env.REACT_APP_SPOTIFY_CLIENT_ID
  }&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=false`;
  return (
    <div className="home-container">
      <div className="home-container-2">
        <div className="moodacado-logo"></div>
        <div className="home-container-3">
          <h2 className="byline-1">
            Moodacado
          </h2>
          <p className="byline-2">
            Moods via Spotify
          </p>
          <div className="login-button-container">
            <a href={url}>
              <div className="spotify-login-button">
                <div className="spotify-green-logo" />
                <span className="login-with-spotify">Login with Spotify</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="credits-container">
        <span className="credits">
          Background by Christina Deravedisian via Unsplash
        </span>
      </div>
    </div>
  );
}

export default Home;
