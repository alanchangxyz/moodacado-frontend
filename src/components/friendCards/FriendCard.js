import "./FriendCard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

function FriendCard(props) {
  return (
    <Card className="friend-card">
      <Card.Body>
        <div className = "friend-pfp-container">
          <img className="friend-pfp" src={props.profilePicture} />         
        </div>
        <div className = "friend-name-container">
          <span className="friend-name">{props.name}</span>
        </div>
        <div className="friend-recent-image-container">
          <img className = "friend-recent-image" src={props.albumcover} />
        </div>
        <div className='emotion-text-container'>
            <span className='emotion-text'>{props.emotion ? props.emotion : ''}</span>
        </div>
        <div className = "friend-songname-container">
          <span className="friend-songname">{props.song.length > 20 ? props.song.substring(0,20) + "..." : props.song}</span>
        </div>
        <div className = "friend-songartist-container">
          <span className="friend-songartist">{props.artist.length > 20 ? props.artist.substring(0,20) + "..." :props.artist}</span>
        </div>
      </Card.Body>
    </Card>
  );
}
export default FriendCard;
