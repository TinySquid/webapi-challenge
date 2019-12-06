import React from 'react'
import {
  Card, CardText, CardBody,
  CardTitle, Col
} from 'reactstrap';

function Project({ id, name, description, completed }) {
  return (
    <Card>
      <CardBody>
        <CardTitle>{name} {completed}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
}

export default Project;
