import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", (req, res) => {
  const { eventType, eventName } = req.body;

  let headline = "";
  let tagline = "";
  let meme = "";

  if (eventType === "Hackathon") {
    headline = `🚀 ${eventName}`;
    tagline = "Code. Create. Conquer.";
    meme = "When your code finally works at 3AM 😎";
  } 
  else if (eventType === "Workshop") {
    headline = `📚 ${eventName}`;
    tagline = "Learn. Build. Grow.";
    meme = "Taking notes like a future CEO 💼";
  } 
  else if (eventType === "Farewell") {
    headline = `🎓 ${eventName}`;
    tagline = "Memories Forever.";
    meme = "Trying not to cry but crying anyway 😭";
  } 
  else if (eventType === "Cultural Fest") {
    headline = `🎭 ${eventName}`;
    tagline = "Celebrate the Spirit!";
    meme = "That one friend who joins every event 💃";
  } 
  else {
    headline = eventName;
    tagline = "Join Us!";
    meme = "Don't miss it 😄";
  }

  res.json({
    headline,
    tagline,
    meme,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000 (Local AI Mode)");
});