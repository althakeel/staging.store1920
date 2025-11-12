import React, { useState } from "react";
import "../assets/FeedbackWidget.css";

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState({
    usability: "",
    design: "",
    performance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for your feedback!\n" + JSON.stringify(answers, null, 2));
    setIsOpen(false);
    setAnswers({
      usability: "",
      design: "",
      performance: "",
    });
  };

  return (
    <>
      {/* Fixed Feedback Button */}
      <button className="feedback-btn" onClick={() => setIsOpen(true)}>
        Feedback
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="feedback-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="feedback-popup"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside popup
          >
            <h2>Website Feedback</h2>
            <form onSubmit={handleSubmit}>
              <div className="question">
                <p>How do you rate the usability?</p>
                <label>
                  <input
                    type="radio"
                    name="usability"
                    value="Excellent"
                    checked={answers.usability === "Excellent"}
                    onChange={handleChange}
                    required
                  />
                  Excellent
                </label>
                <label>
                  <input
                    type="radio"
                    name="usability"
                    value="Good"
                    checked={answers.usability === "Good"}
                    onChange={handleChange}
                  />
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    name="usability"
                    value="Average"
                    checked={answers.usability === "Average"}
                    onChange={handleChange}
                  />
                  Average
                </label>
                <label>
                  <input
                    type="radio"
                    name="usability"
                    value="Poor"
                    checked={answers.usability === "Poor"}
                    onChange={handleChange}
                  />
                  Poor
                </label>
              </div>

              <div className="question">
                <p>How do you rate the design?</p>
                <label>
                  <input
                    type="radio"
                    name="design"
                    value="Excellent"
                    checked={answers.design === "Excellent"}
                    onChange={handleChange}
                    required
                  />
                  Excellent
                </label>
                <label>
                  <input
                    type="radio"
                    name="design"
                    value="Good"
                    checked={answers.design === "Good"}
                    onChange={handleChange}
                  />
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    name="design"
                    value="Average"
                    checked={answers.design === "Average"}
                    onChange={handleChange}
                  />
                  Average
                </label>
                <label>
                  <input
                    type="radio"
                    name="design"
                    value="Poor"
                    checked={answers.design === "Poor"}
                    onChange={handleChange}
                  />
                  Poor
                </label>
              </div>

              <div className="question">
                <p>How do you rate the performance?</p>
                <label>
                  <input
                    type="radio"
                    name="performance"
                    value="Excellent"
                    checked={answers.performance === "Excellent"}
                    onChange={handleChange}
                    required
                  />
                  Excellent
                </label>
                <label>
                  <input
                    type="radio"
                    name="performance"
                    value="Good"
                    checked={answers.performance === "Good"}
                    onChange={handleChange}
                  />
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    name="performance"
                    value="Average"
                    checked={answers.performance === "Average"}
                    onChange={handleChange}
                  />
                  Average
                </label>
                <label>
                  <input
                    type="radio"
                    name="performance"
                    value="Poor"
                    checked={answers.performance === "Poor"}
                    onChange={handleChange}
                  />
                  Poor
                </label>
              </div>

              <div className="actions">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
