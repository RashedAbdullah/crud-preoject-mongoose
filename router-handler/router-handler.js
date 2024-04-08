const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todo-schema");

const TodoModel = new mongoose.model("Todo", todoSchema);

// GET all todo:
router.get("/", async (req, res) => {
  try {
    const data = await TodoModel.find()
      .select({
        __v: 0,
      })
      .limit(3);
    res.status(200).json({
      todos: data,
      message: "Todos imported successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error in getting all data",
    });
  }
});

// GET a todo:
router.get("/:id", async (req, res) => {
  try {
    const data = await TodoModel.find({ _id: req.params.id }).select({
      __v: 0,
    });
    res.send(data);
  } catch (err) {
    res.status(500).json({
      error: "There was an error in getting a single todo",
    });
  }
});

// POST todo:
router.post("/", async (req, res) => {
  try {
    const newTodo = new TodoModel(req.body);
    await newTodo.save();
    res.status(200).json({
      message: "Todo inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error for posting todo",
    });
  }
});

// POST multiple todo:
router.post("/mulit", async (req, res) => {
  try {
    await TodoModel.insertMany(req.body);
    res.status(200).json({
      message: "Todos were inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error about posting mutli data",
    });
  }
});

// PUT a  todo:
// router.put("/:id", async (req, res) => {
//   try {
//     await TodoModel.updateOne(
//       { _id: req.params.id },
//       {
//         $set: {
//           status: "inactive",
//           title: "Ismat maymuna",
//         },
//       }
//     );
//     res.status(200).json({
//       message: "Todo was updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "There was a server side error about updating data",
//     });
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const data = await TodoModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "inactive",
          title: "Ismat maymuna",
        },
      }
      //   {
      //     new: false, // for old data, (not updated)
      //   }
    );
    res.status(200).json({
      todo: data,
      message: "Todo was updated successfully",
    });
    console.log(data);
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error about updating data",
    });
  }
});

// DELETE a todo:
router.delete("/:id", async (req, res) => {
  try {
    await TodoModel.deleteOne({ _id: req.params.id }).select({
      __v: 0,
    });
    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error in deleting a single todo",
    });
  }
});

module.exports = router;
