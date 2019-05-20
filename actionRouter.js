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

module.exports = router;
