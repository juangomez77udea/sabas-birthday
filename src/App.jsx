import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Goto from "./pages/Goto"
import { AudioProvider } from "./context/AudioContext"

const App = () => {
  return (
    <AudioProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/go" element={<Goto />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AudioProvider>
  )
}

export default App
