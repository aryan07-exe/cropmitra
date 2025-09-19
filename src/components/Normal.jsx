import React, { useState, useRef, useEffect } from "react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const question = input;
    setInput("");

    try {
      const response = await fetch("https://cropmitrabackend.onrender.com/farmer-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      const answer = data.answer || "Sorry, I couldn't get a response.";

      setMessages((prev) => [...prev, { sender: "ai", text: answer }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: Unable to reach server." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-100 to-green-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-400 text-white py-6 shadow-md">
        <h1 className="text-4xl font-bold text-center drop-shadow-lg">
          🌾 Farmer AI Assistant
        </h1>
        <p className="text-center mt-1 text-green-100">
          Ask questions about crops, soil, irrigation, pests, and more.
        </p>
      </header>

      {/* Chat container */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-5 py-3 rounded-xl max-w-[75%] break-words shadow-md
                  ${
                    msg.sender === "user"
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
      </main>

      {/* Input area */}
      <footer className="bg-white p-4 shadow-inner flex max-w-3xl mx-auto w-full rounded-t-xl">
        <input
          type="text"
          placeholder="Type your question..."
          className="flex-1 border border-gray-300 rounded-l-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-r-xl transition-all font-semibold"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatInterface;
