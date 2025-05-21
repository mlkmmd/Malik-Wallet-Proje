"use client"

import { Link, useLocation } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import "../styles/Header.css"

const Header = () => {
  const location = useLocation()
  const { darkMode, toggleDarkMode } = useAppContext()

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/fragments" className="logo">
          Code Wallet
        </Link>
      </div>

      <div className="header-right">
        {location.pathname !== "/info" && (
          <Link to="/info" className="info-button">
            Info
          </Link>
        )}

        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  )
}

export default Header