import mongoose from "mongoose";

const MONGODB_URL =
  "mongodb+srv://nadibahsan:nadibahsan@fydp.fp566.mongodb.net/FYDP?retryWrites=true&w=majority&appName=FYDP";
if (!MONGODB_URL) {
  throw new Error(
    "⚠️ Please define the MONGODB_URI environment variable in .env.local"
  );
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB Connected");
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export async function disconnectDB() {
  if (cached.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
  }
}
