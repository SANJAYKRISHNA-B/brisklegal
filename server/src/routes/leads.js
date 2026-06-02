import { Router } from "express";
import Lead from "../models/Lead.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { type, name, email, phone, appointmentDate, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    const lead = await Lead.create({
      type,
      name,
      email,
      phone,
      appointmentDate: appointmentDate || undefined,
      subject,
      message
    });

    return res.status(201).json({
      message: "Lead created successfully.",
      lead: {
        id: lead._id,
        type: lead.type,
        name: lead.name,
        email: lead.email,
        createdAt: lead.createdAt
      }
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (_req, res, next) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(50);
    return res.json({ leads });
  } catch (error) {
    return next(error);
  }
});

export default router;
