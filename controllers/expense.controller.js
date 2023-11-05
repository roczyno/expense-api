import Expense from "../models/expense.model.js";

export const addExpense = async (req, res) => {
  const { title, description, category, date, type, amount } = req.body;
  const newExpense = new Expense({
    title,
    amount,
    type,
    date,
    category,
    description,
  });
  try {
    if (!title || !date || !category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "The amount must be positive" });
    }
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: "Intenal server error" });
    console.log(error);
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Intenal server error" });
    console.log(error);
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete({ id: req.params.id });
    res.status(200).json({ message: "Expense deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Intenal server error" });
    console.log(error);
  }
};
