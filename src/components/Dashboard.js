import "./Dashboard.css";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// function Dashboard() {
//   return (
//     <Container>
//       <Row>
//         <Col>1 of 3</Col>
//         <Col xs={6}>2 of 3 (wider)</Col>
//         <Col>3 of 3</Col>
//       </Row>

//       <Row>
//         <Col>1 of 3</Col>
//         <Col xs={5}>2 of 3 (wider)</Col>
//         <Col>3 of 3</Col>
//       </Row>
//     </Container>
//     // <div>
//     //   <div class="container-sm p-3 my-3 border">
//     //     <h1>Hello!</h1>
//     //     <p>How are you feeling today?</p>
//     //   </div>
//     // </div>
//   );
// }

// export default Dashboard;

class Example extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="show-grid">
          <Col xs={6} md={4}>
            this is a column!
          </Col>
          <Col xs={12} md={8}>
            this is the right column, or at least it should be
            <Row> this is the second row in the right column</Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const Dashboard = () => (
  <div>
    <Example />
  </div>
);

export default Dashboard;
