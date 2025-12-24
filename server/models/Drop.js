import mongoose from "mongoose";

const DropSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },

    radius: {
      type: Number,
      default: 1000, // meters
    },

    likes: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

/* GEO INDEX */
DropSchema.index({ location: "2dsphere" });

/* AUTO DELETE AFTER EXPIRY */
DropSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Drop", DropSchema);