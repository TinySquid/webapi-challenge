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
router.post('/:id', validateProjectId, validateAction, (req, res) => {
  const project_id = req.params.id;
  const { description, notes, completed } = req.body;

  actionDB.insert({
    project_id: project_id,
    description: description,
    notes: notes,
    completed: completed || false
  })
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not add action to database", error: error });
    });
});

//PUT /actions/:id - Modifies an existing action by id.
router.put('/:id', validateActionId, (req, res) => {
  const id = req.params.id;
  const project_id = req.project_id;
  const { description, notes, completed } = req.body;

  actionDB.update(id, {
    project_id: project_id,
    description: description,
    notes: notes,
    completed: completed || false
  })
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not modify action", error: error });
    });
});

//DELETE /actions/:id - Deletes an existing action by id.
router.delete("/:id", validateActionId, (req, res) => {
  const id = req.params.id;

  actionDB.remove(id)
    .then(() => {
      res.status(200).json({ message: "Action deleted" });
    })
    .catch(error => {
      res.status(500).json({ message: "Could not delete action", error: error });
    });
});

//MIDDLEWARE
function validateAction(req, res, next) {
  const { description, notes } = req.body;

  if (description && notes) {
    next();
  } else {
    res.status(400).json({ message: "Please provide a description and notes" });
  }
}

function validateActionId(req, res, next) {
  const id = req.params.id;

  actionDB.get(id)
    .then(action => {
      if (action) {
        req.project_id = action.project_id;
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