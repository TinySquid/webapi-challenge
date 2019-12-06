const router = require('express').Router();

const actionDB = require('../../data/helpers/actionModel');
const projectDB = require('../../data/helpers/projectModel');

//GET /actions/all/:id - Returns all actions for a specified project.
router.get('/all/:id', (req, res) => {
  const id = req.params.id;

  actionDB.getProjectActions(id)
    .then(actions => {
      if (actions.length > 0) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "No actions found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get actions from database", error: error });
    });
});

//GET /actions/:id - Returns action by id.
router.get('/:id', (req, res) => {
  const id = req.params.id;

  actionDB.get(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "No action found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get action from database", error: error });
    });
});

//POST /actions/:id - Creates a new action for a project.
router.post('/:id', (req, res) => {

});

//PUT /actions/:id - Modifies an existing action by id.
router.put('/:id', (req, res) => {

});

//DELETE /actions/:id - Deletes an existing action by id.
router.delete("/:id", (req, res) => {

});

//MIDDLEWARE
function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;

  if (project_id && description && notes) {
    next();
  } else {
    res.status(400).json({ message: "Please provide a project id, description, and notes" });
  }
}

function validateActionId(req, res, next) {
  const id = req.params.id;

  actionDB.get(id)
    .then(action => {
      if (action) {
        next();
      } else {
        res.status(404).json({ message: "No action found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get action from database", error: error });
    });
}

function validateProjectId(req, res, next) {
  const id = req.params.id;

  projectDB.get(id)
    .then(project => {
      if (project) {
        next()
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get project from database", error: error });
    });
}

module.exports = router;