import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import ProjectList from './components/ProjectList';
import DetailedProject from './components/DetailedProject';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <NavLink to="/" activeClassName="navbar--active">Home</NavLink>
      </nav>
      <Container>
        <Switch>
          <Route exact path="/" component={ProjectList} />
          <Route path="/projects/:id" component={DetailedProject} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
