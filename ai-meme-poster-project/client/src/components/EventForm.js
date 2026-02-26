import React from "react";

function EventForm({ formData, setFormData, eventType }) {
  return (
    <div style={{ margin: "10px" }}>
      <h3>Event Details</h3>

      <input
        placeholder="Event Name"
        onChange={(e) =>
          setFormData({ ...formData, eventName: e.target.value })
        }
      />

      <input
        placeholder="Date"
        onChange={(e) =>
          setFormData({ ...formData, date: e.target.value })
        }
      />

      <input
        placeholder="Venue"
        onChange={(e) =>
          setFormData({ ...formData, venue: e.target.value })
        }
      />

      <input
        placeholder="Conducted By"
        onChange={(e) =>
          setFormData({ ...formData, conductedBy: e.target.value })
        }
      />

      {/* Hackathon & Workshop Only */}
      {(eventType === "Hackathon" || eventType === "Workshop") && (
        <>
          <input
            placeholder="Registration Link"
            onChange={(e) =>
              setFormData({ ...formData, registrationLink: e.target.value })
            }
          />

          <input
            placeholder="Registration Deadline"
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
          />

          <input
            placeholder="Entry Fee"
            onChange={(e) =>
              setFormData({ ...formData, entryFee: e.target.value })
            }
          />

          <input
            placeholder="Coordinator Name"
            onChange={(e) =>
              setFormData({ ...formData, coordinator: e.target.value })
            }
          />

          <input
            placeholder="Contact Number"
            onChange={(e) =>
              setFormData({ ...formData, contactNumber: e.target.value })
            }
          />
        </>
      )}

      {/* Hackathon Only */}
      {eventType === "Hackathon" && (
        <>
          <input
            placeholder="1st Prize"
            onChange={(e) =>
              setFormData({ ...formData, prize1: e.target.value })
            }
          />
          <input
            placeholder="2nd Prize"
            onChange={(e) =>
              setFormData({ ...formData, prize2: e.target.value })
            }
          />
        </>
      )}

      {/* Hackathon & Workshop */}
      {(eventType === "Hackathon" || eventType === "Workshop") && (
        <input
          placeholder="What You Will Learn"
          onChange={(e) =>
            setFormData({ ...formData, learnings: e.target.value })
          }
        />
      )}

      {/* Cultural Fest & Farewell Only */}
      {(eventType === "Cultural Fest" || eventType === "Farewell") && (
        <>
          <input
            placeholder="Start Time"
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
          />
          <input
            placeholder="End Time"
            onChange={(e) =>
              setFormData({ ...formData, endTime: e.target.value })
            }
          />
        </>
      )}
    </div>
  );
}

export default EventForm;