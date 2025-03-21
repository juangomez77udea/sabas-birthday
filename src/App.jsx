import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home, About, Goto } from "./pages";

function App() {
  return (
    <main className="bg-slate-300/20 min-h-screen w-full">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/go" element={<Goto />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;