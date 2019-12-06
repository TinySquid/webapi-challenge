const router = require('express').Router();

const projectDB = require('../../data/helpers/projectModel');

//GET /projects - Returns all projects.
router.get('/', (req, res) => {
  projectDB.get()
    .then(projects => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ message: "No projects found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get projects from database", error: error });
    });
});

//GET /projects/:id - Returns all projects.
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
router.post('/', (req, res) => {

});

//PUT /projects/:id - Modifies an existing project by id.
router.put('/:id', (req, res) => {

});

//DELETE /projects/:id - Deletes an existing project by id.
router.delete("/:id", (req, res) => {

});



module.exports = router;