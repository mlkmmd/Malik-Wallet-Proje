"use client"

import { useEffect } from "react"
import { useAppContext } from "../context/AppContext"
import "../styles/CodeModal.css"

const CodeModal = ({ fragment, onClose }) => {
  const { copyToClipboard } = useAppContext()

  const handleCopy = async () => {
    await copyToClipboard(fragment.code)
    alert("Code copié dans le presse-papier !")
  }

  // Fermer la modale en cliquant à l'extérieur ou en appuyant sur Échap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }

    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [onClose])

  return (
    <div className="modal-overlay">
      <div className="code-modal">
        <div className="modal-header">
          <h2>{fragment.title}</h2>
          <div className="modal-actions">
            <button className="copy-button" onClick={handleCopy}>
              Copy
            </button>
            <button className="close-button" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>
        <div className="code-container">
          <pre>
            <code className="code-block">
              {fragment.code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default CodeModal