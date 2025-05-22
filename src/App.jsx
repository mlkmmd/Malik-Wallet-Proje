import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import FragmentsPage from "./pages/FragmentsPage"
import FragmentFormPage from "./pages/FragmentFormPage"
import TagsPage from "./pages/TagsPage"
import InfoPage from "./pages/InfoPage"
import { useAppContext } from "./context/AppContext"
import "./styles/App.css"

function App() {
  const { darkMode } = useAppContext()

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <Router>
        <Header />
        <main className="content">
          <Routes>
            <Route path="/fragments" element={<FragmentsPage />} />
            <Route path="/fragment/new" element={<FragmentFormPage />} />
            <Route path="/fragment/:id" element={<FragmentFormPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="*" element={<Navigate to="/fragments" replace />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App