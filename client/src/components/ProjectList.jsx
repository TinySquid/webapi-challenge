import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

import Project from './Project';

function ProjectList(props) {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then(response => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  if (!projects) return <div>Loading projects...</div>

  return (
    <>
      <h1 className="projects-header">Projects</h1>
      <Row className="projects">
        {projects.map((project, idx) => (
          <Col xs="12" sm="8" md="6" lg="6" key={idx} >
            <Link to={`/projects/${project.id}`} className="project">
              <Project {...project} />
            </Link>
          </Col>
        )
        )}
      </Row>
    </>
  )
}

export default ProjectList;
