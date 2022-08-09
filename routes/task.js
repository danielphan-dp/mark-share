import express from "express";
import { requiredSignin, canUpdateDelete } from "../middlewares";

const router = express.Router();

const {
  create,
  tasks,
  update,
  remove,
  taskCount,
} = require("../controllers/task");

router.post("/task", requiredSignin, create);
router.get("/tasks/:page", tasks);
router.put("/task/:taskId", requiredSignin, canUpdateDelete, update);
router.delete("/task/:taskId", requiredSignin, canUpdateDelete, remove);
router.get("/task-count", taskCount);

export default router;
