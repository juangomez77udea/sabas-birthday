import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Home, About, Goto } from "./pages"

function App() {
  
  return (
    <main className=" bg-slate-300/20">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/go" element={<Goto />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
