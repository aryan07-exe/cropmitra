
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chat from "./components/Chat";
import Landing from "./components/Landing";
import Normal from "./components/Normal";
function App() {
  return (
       <Routes>
          <Route path="/" element={<Landing />} />
           <Route path="/chat" element={<Chat />} />
           <Route path="/advice" element={<Normal />} />
          
        </Routes>
  );
}

export default App;
