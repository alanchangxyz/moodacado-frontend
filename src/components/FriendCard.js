import "./FriendCard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Image } from "react-bootstrap";

function FriendCard(props) {
  return (
    <Card className="friend-card">
      <Card.Body>
        <Container className = "friend-prof">
          <Image
              fluid
              src = {props.albumcover}
              roundedCircle
            />        
            </Container>
          <Card.Title className="friend-name">{props.name}</Card.Title>
        <Card.Img src={props.albumcover} />
        <Card.Subtitle>{props.song}</Card.Subtitle>
        <Card.Text>{props.artist}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default FriendCard;
