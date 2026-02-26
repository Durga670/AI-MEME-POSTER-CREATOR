import React, { useRef } from "react";
import html2canvas from "html2canvas";
import hackathonBg from "../assets/hackathon.jpg";
import workshopBg from "../assets/workshop.jpg";
import farewellBg from "../assets/farewell.jpg";
import culturalBg from "../assets/cultural.jpg";
import { QRCodeCanvas } from "qrcode.react";
import Draggable from "react-draggable";

function PosterPreview({
  eventType,
  formData,
  posterData,
  customBg,
  textColor,
  selectedFont,
  overlayOpacity,
}) {

  const backgrounds = {
    Hackathon: hackathonBg,
    Workshop: workshopBg,
    Farewell: farewellBg,
    "Cultural Fest": culturalBg,
  };

  const finalBackground = customBg
    ? customBg
    : backgrounds[eventType];

  const downloadPoster = () => {
    const poster = document.getElementById("poster");
    html2canvas(poster, { useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "poster.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const calculateCountdown = () => {
    if (!formData.date) return "";
    const eventDate = new Date(formData.date);
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) return "Event Started!";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} Days Left`;
  };

  // 🔥 IMPORTANT: nodeRefs for React 18
  const headlineRef = useRef(null);
  const taglineRef = useRef(null);
  const eventNameRef = useRef(null);

  if (!posterData) return null;

  return (
    <div>
      <div
        id="poster"
        style={{
          margin: "30px auto",
          padding: "40px",
          width: "550px",
          minHeight: "750px",
          backgroundImage: `url(${finalBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: textColor,
          textAlign: "center",
          borderRadius: "15px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            background: `rgba(0,0,0,${overlayOpacity})`,
            padding: "25px",
            borderRadius: "10px",
            height: "100%",
          }}
        >

          {/* Headline */}
          <Draggable nodeRef={headlineRef}>
            <h1
              ref={headlineRef}
              style={{ fontFamily: selectedFont, cursor: "move" }}
            >
              {posterData.headline}
            </h1>
          </Draggable>

          {/* Tagline */}
          <Draggable nodeRef={taglineRef}>
            <p
              ref={taglineRef}
              style={{ fontFamily: selectedFont, cursor: "move" }}
            >
              {posterData.tagline}
            </p>
          </Draggable>

          {/* Event Name */}
          <Draggable nodeRef={eventNameRef}>
            <h2
              ref={eventNameRef}
              style={{ fontFamily: selectedFont, cursor: "move" }}
            >
              {formData.eventName}
            </h2>
          </Draggable>

          <p><strong>Date:</strong> {formData.date}</p>
          <p><strong>Venue:</strong> {formData.venue}</p>
          <p><strong>Conducted By:</strong> {formData.conductedBy}</p>

          {(eventType === "Hackathon" || eventType === "Workshop") && (
            <>
              <p><strong>What You Will Learn:</strong> {formData.learnings}</p>
              <p><strong>Registration:</strong> {formData.registrationLink}</p>
              <p><strong>Deadline:</strong> {formData.deadline}</p>
              <p><strong>Entry Fee:</strong> {formData.entryFee}</p>
              <p><strong>Coordinator:</strong> {formData.coordinator}</p>
              <p><strong>Contact:</strong> {formData.contactNumber}</p>
            </>
          )}

          {eventType === "Hackathon" && (
            <>
              <p>🥇 {formData.prize1}</p>
              <p>🥈 {formData.prize2}</p>
            </>
          )}

          {(eventType === "Cultural Fest" || eventType === "Farewell") && (
            <>
              <p><strong>Starts At:</strong> {formData.startTime}</p>
              <p><strong>Ends At:</strong> {formData.endTime}</p>
            </>
          )}

          <p style={{ color: "yellow", marginTop: "10px" }}>
            ⏳ {calculateCountdown()}
          </p>

          {(eventType === "Hackathon" || eventType === "Workshop") &&
            formData.registrationLink && (
              <div style={{ marginTop: "20px" }}>
                <QRCodeCanvas value={formData.registrationLink} size={90} />
              </div>
            )}

          <p style={{ marginTop: "30px", fontStyle: "italic" }}>
            {posterData.meme}
          </p>

        </div>
      </div>

      <button
        onClick={downloadPoster}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Download Poster
      </button>
    </div>
  );
}

export default PosterPreview;