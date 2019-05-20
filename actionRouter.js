const express = require("express");

const actionDb = require("./data/helpers/actionModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await actionDb.get();

    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving actions"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const action = await actionDb.get(id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving action"
    });
  }
});

router.post("/", async (req, res) => {
  const action = req.body;
  if (!action.notes) {
    res.status(404).json({ message: "Missing action notes" });
  } else if (!action.description) {
    res.status(404).json({ message: "Missing action description" });
  } else if (!action.project_id) {
    res.status(404).json({ message: "Missing action project id" });
  } else {
    try {
      const addingAction = await actionDb.insert(action);
      res.status(200).json(addingAction);
    } catch (err) {
      res.status(500).json({
        message: "Error adding action"
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
      const deletedAction = await actionDb.remove(id);
      res.status(204).json(deletedAction);
    } catch (err) {
      res.status(500).json({
        message: "Error deleting action"
      });
    }
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "missing ID or wrong ID" });
  } else if (!req.body.notes || !req.body.description || !req.body.project_id) {
    res
      .status(404)
      .json({ message: "Missing name or description or project id" });
  } else {
    try {
      const updatingAction = await actionDb.update(id, req.body);
      res.status(200).json(updatingAction);
    } catch (err) {
      res.status(500).json({
        message: "Error updating action"
      });
    }
  }
});

module.exports = router;
