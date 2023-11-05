import express from "express";
import {
  addIncome,
  deleteIncome,
  getIncomes,
} from "../controllers/income.controller.js";

const router = express.Router();

router.post("/add", addIncome);
router.get("/find", getIncomes);
router.delete("/:id", deleteIncome);

export default router;
