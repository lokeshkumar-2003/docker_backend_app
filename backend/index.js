import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import connectDb from "./config.js";
import Todo from "./models/Todo.js";

const app = express();

app.use(express.json());
app.use(cors());
connectDb();


// ADD TODO
app.post("/todo", async (req, res) => {
  try {
    const { task, isCompleted } = req.body;

    const todo = await Todo.create({
      task,
      isCompleted,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ADD tasks
app.post("/tasks", async (req, res) => {
  try {
    const { task, isCompleted } = req.body;

    const todo = await Todo.create({
      task,
      isCompleted,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET TODOS
app.get("/todo", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// EDIT TODO
app.put("/todo/toggle/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    todo.isCompleted = !todo.isCompleted;

    await todo.save();

    res.json(todo);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE TODO
app.delete("/todo/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.json({
      message: "Todo deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running...");
});