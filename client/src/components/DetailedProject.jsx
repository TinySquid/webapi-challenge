import React, { useState, useEffect } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Row, Col, Button
} from 'reactstrap';

import axios from 'axios';

function DetailedProject(props) {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${props.match.params.id}`)
      .then(response => {
        // console.log(response);
        setProjectData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  function markProjectComplete() {
    axios.put(`http://localhost:5000/api/projects/${props.match.params.id}`, {
      ...projectData,
      completed: !projectData.completed
    })
      .then(response => {
        console.log(response);
        setProjectData(response.data);
      })
      .catch(error => console.log(error));
  }

  function deleteProject() {
    axios.delete(`http://localhost:5000/api/projects/${props.match.params.id}`)
      .then(response => {
        props.history.push("/");
      })
      .catch(error => console.log(error));
  }

  if (!projectData) return <div>Loading project data...</div>

  return (
    <Row className="detailed-project">
      <Col xs="12" sm="12" md="12" lg="10">
        <Card>
          <CardBody>
            <CardTitle>{projectData.name} {projectData.completed ? "(Complete)" : "(Incomplete)"}</CardTitle>
            <div className="card--desc">
              <CardText>
                {projectData.description}
              </CardText>
            </div>
            <h4 style={{ textAlign: "left" }}>Project Actions</h4>
            <div className="actions">
              <ol>
                {projectData.actions.map((action, idx) => (
                  <div className="action" key={idx}>
                    <li>
                      <p className="action-title">{action.description} {action.completed}</p>
                      <p className="action-notes">{action.notes}</p>
                      {action.completed ? <Button color="danger">Mark Incomplete</Button> : <Button color="success">Mark Complete</Button>}
                      <Button color="warning">Edit</Button>
                      <Button color="danger">Delete</Button>
                    </li>
                  </div>
                ))}
              </ol>
            </div>
            <div className="card-bottom">

              {projectData.completed ? <Button color="danger" onClick={markProjectComplete}>Mark Incomplete</Button> : <Button color="success" onClick={markProjectComplete}>Mark Complete</Button>}
              <Button color="warning">Edit Project</Button>
              <Button color="danger" onClick={deleteProject}>Delete Project</Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default DetailedProject;
