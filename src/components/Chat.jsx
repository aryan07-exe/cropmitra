import React, { useState } from "react";

const FormPage = () => {
  const [formData, setFormData] = useState({
    region: "",
    soil_type: "",
    crop: "",
    rainfall: "",
    temperature: "",
    fertilizer_used: false,
    irrigation_used: false,
    weather: "",
    days: "",
    yield_prediction: ""
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit form to FastAPI backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:8000/predict-and-suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rainfall: parseFloat(formData.rainfall),
          temperature: parseFloat(formData.temperature),
          days: parseInt(formData.days),
          yield_prediction: parseFloat(formData.yield_prediction),
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: "Something went wrong. Try again!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        🌱 Crop Yield & Suggestion Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl"
      >
        <input
          type="text"
          name="region"
          placeholder="Region"
          value={formData.region}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="soil_type"
          placeholder="Soil Type"
          value={formData.soil_type}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="crop"
          placeholder="Crop"
          value={formData.crop}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="rainfall"
          placeholder="Rainfall (mm)"
          value={formData.rainfall}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="temperature"
          placeholder="Temperature (°C)"
          value={formData.temperature}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="days"
          placeholder="Days until harvest"
          value={formData.days}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="yield_prediction"
          placeholder="Predicted Yield (kg/acre)"
          value={formData.yield_prediction}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="fertilizer_used"
            checked={formData.fertilizer_used}
            onChange={handleChange}
          />
          <span>Fertilizer Used</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="irrigation_used"
            checked={formData.irrigation_used}
            onChange={handleChange}
          />
          <span>Irrigation Used</span>
        </label>

        <input
          type="text"
          name="weather"
          placeholder="Weather (e.g. Sunny, Rainy)"
          value={formData.weather}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          required
        />

        <button
          type="submit"
          className="col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Get Suggestions"}
        </button>
      </form>

      {response && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            🌾 Results
          </h2>
          {response.error ? (
            <p className="text-red-600">{response.error}</p>
          ) : (
            <>
              <p className="mb-2">
                <strong>Predicted Yield:</strong> {response.predicted_yield} kg/acre
              </p>
              <p className="mb-2">
                <strong>Suggestions:</strong>
              </p>
              <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">
                {response.suggestions}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FormPage;
