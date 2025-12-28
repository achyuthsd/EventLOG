import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Event from "./models/eventitems.js";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors());

// --------------------- API ROUTES ---------------------

// GET: Fetch all events
app.get("/api/events", async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json({ suc: "ok", data: events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ suc: "not ok", msg: "Error fetching events" });
    }
});

// POST: Create a new event
app.post("/api/events", async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ suc: "ok", data: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ suc: "not ok", msg: "Error saving event" });
    }
});

// GET: Fetch a single event by ID
app.get("/api/events/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ suc: "not ok", msg: "Event not found" });
        res.status(200).json({ suc: "ok", data: event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ suc: "not ok", msg: "Invalid ID format or server error" });
    }
});

// DELETE: Remove an event by ID
app.delete("/api/events/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ suc: "not ok", msg: "Event not found" });
        res.status(200).json({ suc: "ok", msg: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ suc: "not ok", msg: "Server error during deletion" });
    }
});

// --------------------- PRODUCTION SPA ---------------------
if (process.env.NODE_ENV === "production") {
    // Serve React static files
    app.use(express.static(path.join(__dirname, "eventful-hub/dist")));

    // Catch-all route for React SPA (works with path-to-regexp v6+)
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "eventful-hub", "dist", "index.html"));
    });
}

// --------------------- START SERVER ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});
