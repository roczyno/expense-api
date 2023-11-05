import express from "express";
import {
  addExpense,
  deleteExpense,
  getExpenses,
} from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/add", addExpense);
router.get("/find", getExpenses);
router.delete("/:id", deleteExpense);

export default router;
