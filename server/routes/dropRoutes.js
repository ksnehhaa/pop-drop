import express from "express";
import Drop from "../models/Drop.js";

const router = express.Router();

/* ================= CREATE DROP ================= */
router.post("/", async (req, res) => {
  try {
    const { message, lat, lng, radius = 1000, ttlMinutes = 60 } = req.body;

    if (!message || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: "Message & location required" });
    }

    const expiresAt = new Date(Date.now() + Number(ttlMinutes) * 60 * 1000);

    const drop = await Drop.create({
      message: message.trim(),
      radius: Number(radius),
      expiresAt,
      location: {
        type: "Point",
        coordinates: [Number(lng), Number(lat)],
      },
    });

    res.status(201).json(drop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= NEARBY DROPS ================= */
router.get("/nearby", async (req, res) => {
  try {
    const { lat, lng, radius = 1000 } = req.query;

    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ error: "Location required" });
    }

    const drops = await Drop.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)],
          },
          $maxDistance: Number(radius),
        },
      },
    })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(drops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= LIKE DROP ================= */
router.post("/:id/like", async (req, res) => {
  try {
    const drop = await Drop.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!drop) {
      return res.status(404).json({ error: "Drop not found" });
    }

    res.json(drop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;