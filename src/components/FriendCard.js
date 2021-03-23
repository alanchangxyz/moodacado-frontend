import "./FriendCard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card } from "react-bootstrap";

function FriendCard(props) {
    return (
         <Card className = "friend-card">
            <Card.Title>{props.name}</Card.Title>
        </Card>
        
    );
}

export default FriendCard;