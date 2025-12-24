import Drop from "../models/Drop.js";

// CREATE DROP
export const createDrop = async (req, res) => {
  try {
    const { text, location, radius } = req.body;

    if (!text || !location || !radius) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const drop = await Drop.create({
      text,
      radius,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat], // ⚠️ order
      },
    });

    res.status(201).json(drop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET NEARBY DROPS
export const getNearbyDrops = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    const drops = await Drop.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)],
          },
          $maxDistance: Number(radius) * 1000, // km → meters
        },
      },
    });

    res.json(drops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};