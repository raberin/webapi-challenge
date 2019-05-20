const express = require("express");

const projectDb = require("./data/helpers/projectModel");

const router = express.Router();

//CRUD Requests
router.get("/", async (req, res) => {
  try {
    const projects = await projectDb.get();

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving projects"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectDb.get(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving project"
    });
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const { id } = req.params;
    const actions = await projectDb.getProjectActions(id);
    if (actions && actions.length > 0) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: "Wrong or missing ID" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving project's actions"
    });
  }
});

router.post("/", async (req, res) => {
  const project = req.body;
  if (!project.name) {
    res.status(404).json({ message: "Missing project name" });
  } else if (!project.description) {
    res.status(404).json({ message: "Missing project description" });
  } else {
    try {
      const addingProject = await projectDb.insert(project);
      res.status(200).json(addingProject);
    } catch (err) {
      res.status(500).json({
        message: "Error adding project"
      });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "missing ID or wrong ID" });
  } else {
    try {
      const deletedProject = await projectDb.remove(id);
      res.status(204).json(deletedProject);
    } catch (err) {
      res.status(500).json({
        message: "Error deleting project"
      });
    }
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "missing ID or wrong ID" });
  } else if (!req.body.name || !req.body.description) {
    res.status(404).json({ message: "Missing name or description" });
  } else {
    try {
      const updatingProject = await projectDb.update(id, req.body);
      res.status(200).json(updatingProject);
    } catch (err) {
      res.status(500).json({
        message: "Error updating project"
      });
    }
  }
});

module.exports = router;
