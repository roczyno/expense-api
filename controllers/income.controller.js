import Income from "../models/income.model.js";

export const addIncome = async (req, res) => {
  const { title, description, category, date, type, amount } = req.body;
  const newIncome = new Income({
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
    const savedIncome = await newIncome.save();
    res.status(200).json(savedIncome);
  } catch (error) {
    res.status(500).json({ message: "Intenal server error" });
    console.log(error);
  }
};

export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Intenal server error" });
    console.log(error);
  }
};

export const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete({ id: req.params.id });
    res.status(200).json({ message: "Income deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Intenal server error" });
    console.log(error);
  }
};
