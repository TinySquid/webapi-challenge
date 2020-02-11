const router = require('express').Router();

const actionsRouter = require('./actions/actionsRouter');
const projectsRouter = require('./projects/projectsRouter');

router.use('/actions', actionsRouter);
router.use('/projects', projectsRouter);

module.exports = router;