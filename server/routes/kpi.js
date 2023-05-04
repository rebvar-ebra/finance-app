import express from "express";
import KPI from "../models/KPI";

const router = express.Router();
router.get("/kips", async (req, res) => {
  try {
    const kips = await KPI.find();
    res.status(200).json(kips);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
