import React from "react";
import "./TemplateSelector.css";

function TemplateSelector({ eventType, setEventType }) {
  const templates = [
    { name: "Hackathon", icon: "💻" },
    { name: "Workshop", icon: "📚" },
    { name: "Farewell", icon: "🎓" },
    { name: "Cultural Fest", icon: "🎉" },
  ];

  return (
    <div className="template-container">
      {templates.map((template) => (
        <div
          key={template.name}
          className={`template-card ${
            eventType === template.name ? "active" : ""
          }`}
          onClick={() => setEventType(template.name)}
        >
          <div className="template-icon">{template.icon}</div>
          <h3>{template.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default TemplateSelector;