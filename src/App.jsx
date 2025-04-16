import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Goto from "./pages/Goto"
import { AudioProvider } from "./context/AudioContext"

const App = () => {
  return (
    <AudioProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/go" element={<Goto />} />
        </Routes>
      </Router>
    </AudioProvider>
  )
}

export default App
