const router = require('express').Router();

const projectDB = require('../../data/helpers/projectModel');

//GET /projects - Returns all projects.
router.get('/', (req, res) => {
  projectDB.get()
    .then(projects => {
      if (projects.length > 0) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ message: "No projects found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get projects from database", error: error });
    });
});

//GET /projects/:id - Returns project by id.
router.get('/:id', (req, res) => {
  const id = req.params.id;

  projectDB.get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "No project found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get project from database", error: error });
    });
});

//POST /projects - Creates a new project.
router.post('/', validateProject, (req, res) => {
  const { name, description, completed } = req.body;

  projectDB.insert({
    name: name,
    description: description,
    completed: completed || false
  })
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not add project to database", error: error });
    });
});

//PUT /projects/:id - Modifies an existing project by id.
router.put('/:id', validateProjectId, validateProject, (req, res) => {
  const id = req.params.id;
  const { name, description, completed } = req.body;

  projectDB.update(id, {
    name: name,
    description: description,
    completed: completed || false
  })
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not modify project", error: error });
    });
});

//DELETE /projects/:id - Deletes an existing project by id.
router.delete("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;

  projectDB.remove(id)
    .then(state => {
      if (state) {
        res.status(200).json({ message: "Project deleted" });
      } else {
        res.status(500).json({ message: "yeet" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not delete project", error: error });
    });
});

//MIDDLEWARE
function validateProject(req, res, next) {
  const { name, description } = req.body;

  if (name && description) {
    next();
  } else {
    res.status(400).json({ message: "Please provide a name and description" });
  }
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