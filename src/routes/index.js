import express from "express";

const router = express.Router();

// temporary health route
router.get("/", (req, res) => {
  res.status(200).json({
    service: "Bed Manager",
    status: "OK"
  });
});

export default router;
