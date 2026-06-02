import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["appointment", "contact"],
      default: "appointment"
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 180
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 40
    },
    appointmentDate: {
      type: Date
    },
    subject: {
      type: String,
      trim: true,
      maxlength: 180
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000
    }
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
