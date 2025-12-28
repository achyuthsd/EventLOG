import mongoose from "mongoose";

const eventitemsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date, // better than string
      required: true,
    },

    time: {
      type: String, // can also be Date if you want full datetime
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["music", "sports", "tech", "education", "art", "other"],
    },

    image: {
      type: String, // image URL
      required: true,
    },

    attendees: {
      type: Number,
      default: 0,
      min: 0,
    },

    ticketType: {
      type: String,
      enum: ["free", "paid"],
      required: true,
    },

    price: {
      type: Number,
      required: function () {
        return this.ticketType === "paid";
      },
      min: 0,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default mongoose.model("Event", eventitemsSchema);
