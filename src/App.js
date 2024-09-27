import React, { useState } from "react";
import "./App.css";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);

  const [currentSchema, setCurrentSchema] = useState("");

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSchemaAdd = () => {
    if (currentSchema) {
      const selectedOption = availableSchemas.find(
        (schema) => schema.value === currentSchema
      );
      setSelectedSchemas([...selectedSchemas, selectedOption]);

      // Remove selected schema from the available schemas
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== currentSchema)
      );

      // Reset currentSchema selection
      setCurrentSchema("");
    }
  };

  const handleSaveSegment = () => {
    const schemaData = selectedSchemas.map((schema) => ({
      [schema.value]: schema.label,
    }));

    const payload = {
      segment_name: segmentName,
      schema: schemaData,
    };

    console.log(
      "Sending data to the server:",
      JSON.stringify(payload, null, 2)
    );
    // Use fetch or axios to send payload to the server
  };

  return (
    <div className="App">
      <button onClick={togglePopup}>Save segment</button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Save Segment</h3>
            <label>Segment Name:</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Enter segment name"
              className="segment-input"
            />
            <br />

            <label>Add schema to segment:</label>
            <select
              value={currentSchema}
              onChange={(e) => setCurrentSchema(e.target.value)}
            >
              <option value="">Select Schema</option>
              {availableSchemas.map((schema) => (
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
            </select>
            <button onClick={handleSchemaAdd}>+ Add new schema</button>

            {/* Selected Schemas */}
            {selectedSchemas.length > 0 && (
              <div className="blue-box">
                <h4>Selected Schemas:</h4>
                {selectedSchemas.map((schema, index) => (
                  <div key={index}>
                    <select
                      value={schema.value}
                      onChange={(e) => {
                        const newSelectedSchema = availableSchemas.find(
                          (s) => s.value === e.target.value
                        );
                        const newSchemas = [...selectedSchemas];
                        newSchemas[index] = newSelectedSchema;
                        setSelectedSchemas(newSchemas);

                        // Update availableSchemas based on the new selection
                        setAvailableSchemas(
                          availableSchemas.filter(
                            (s) => s.value !== e.target.value
                          )
                        );
                      }}
                    >
                      <option value={schema.value}>{schema.label}</option>
                      {availableSchemas.map((availableSchema) => (
                        <option
                          key={availableSchema.value}
                          value={availableSchema.value}
                        >
                          {availableSchema.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            <button onClick={handleSaveSegment}>Save the segment</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
