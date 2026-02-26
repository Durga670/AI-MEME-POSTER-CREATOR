import React, { useState } from "react";
import axios from "axios";
import TemplateSelector from "./components/TemplateSelector";
import EventForm from "./components/EventForm";
import PosterPreview from "./components/PosterPreview";

function App() {
  const [eventType, setEventType] = useState("Hackathon");
  const [customBg, setCustomBg] = useState(null);

  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    venue: "",
    conductedBy: "",
    learnings: "",
    startTime: "",
    endTime: "",
    registrationLink: "",
    deadline: "",
    entryFee: "",
    coordinator: "",
    contactNumber: "",
    prize1: "",
    prize2: "",
  });

  const [posterData, setPosterData] = useState(null);

  const generatePoster = async () => {
    try {
      const res = await axios.post("http://localhost:5000/generate", {
        eventType,
        ...formData,
      });
      setPosterData(res.data);
    } catch (error) {
      alert("Error generating poster");
    }
  };
  const [textColor, setTextColor] = useState("#ffffff");
const [selectedFont, setSelectedFont] = useState("Arial");
const [overlayOpacity, setOverlayOpacity] = useState(0.7);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>AI Meme & Poster Creator</h1>

      <TemplateSelector 
  eventType={eventType} 
  setEventType={setEventType} 
/>

      <EventForm
        formData={formData}
        setFormData={setFormData}
        eventType={eventType}
      />
      <div style={{ marginTop: "20px" }}>
  <h3>Design Controls</h3>

  <label>Text Color: </label>
  <input
    type="color"
    value={textColor}
    onChange={(e) => setTextColor(e.target.value)}
  />

  <br /><br />

  <label>Font Style: </label>
  <select
    value={selectedFont}
    onChange={(e) => setSelectedFont(e.target.value)}
  >
    <option value="Arial">Modern</option>
    <option value="Georgia">Elegant</option>
    <option value="Courier New">Tech</option>
    <option value="Impact">Bold</option>
  </select>

  <br /><br />

  <label>Background Overlay: </label>
  <input
    type="range"
    min="0"
    max="1"
    step="0.1"
    value={overlayOpacity}
    onChange={(e) => setOverlayOpacity(e.target.value)}
  />
</div>

      {/* 🔥 Background Upload Section */}
      <div style={{ marginTop: "15px" }}>
        <label><strong>Upload Custom Background:</strong></label>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setCustomBg(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>

      <br />
      <button onClick={generatePoster}>Generate Poster</button>

      {posterData && (
        <PosterPreview
          eventType={eventType}
          formData={formData}
          posterData={posterData}
          customBg={customBg} 
          textColor={textColor}
  selectedFont={selectedFont}
  overlayOpacity={overlayOpacity}  // 🔥 IMPORTANT
        />
      )}
    </div>
  );
}

export default App;