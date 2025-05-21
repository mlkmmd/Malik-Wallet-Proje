"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "../context/AppContext"
import "../styles/TagModal.css"

const TagModal = ({ tag, onClose }) => {
  const { addTag, updateTag, deleteTag } = useAppContext()
  const [tagName, setTagName] = useState("")
  const isEditing = !!tag

  // Initialiser le nom du tag si on est en mode édition
  useEffect(() => {
    if (tag) {
      setTagName(tag.name)
    }
  }, [tag])

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!tagName.trim()) {
      alert("Le nom du tag est obligatoire !")
      return
    }

    if (isEditing) {
      updateTag(tag.id, tagName)
    } else {
      addTag(tagName)
    }

    onClose()
  }

  // Gérer la suppression d'un tag
  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce tag ?")) {
      deleteTag(tag.id)
      onClose()
    }
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
      <div className="tag-modal">
        <div className="modal-header">
          <h2>{isEditing ? "Modifier le Tag" : "Nouveau Tag"}</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tagName">Nom du Tag</label>
            <input
              type="text"
              id="tagName"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Entrez le nom du tag"
              autoFocus
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              {isEditing ? "Mettre à jour" : "Créer"}
            </button>

            {isEditing && (
              <button type="button" className="delete-button" onClick={handleDelete}>
                Supprimer
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default TagModal