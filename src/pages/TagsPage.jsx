"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import TagModal from "../components/TagModal"
import "../styles/TagsPage.css"

const TagsPage = () => {
  const { tags } = useAppContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState(null)

  // Ouvrir la modale de tag pour un tag spécifique ou pour en créer un nouveau
  const openTagModal = (tag = null) => {
    setSelectedTag(tag)
    setModalOpen(true)
  }

  // Fermer la modale de tag
  const closeTagModal = () => {
    setModalOpen(false)
    setSelectedTag(null)
  }

  return (
    <div className="tags-page">
      <div className="page-header">
        <div className="nav-buttons">
          <Link to="/fragments" className="nav-button">
            Fragments
          </Link>
          <Link to="/tags" className="nav-button active">
            Tags
          </Link>
        </div>
        <button className="new-button" onClick={() => openTagModal()}>
          New
        </button>
      </div>

      <div className="tags-grid">
        {tags.length === 0 ? (
          <div className="no-tags">
            <p>No tags yet. Create your first one!</p>
            <button className="new-button" onClick={() => openTagModal()}>
              Create Tag
            </button>
          </div>
        ) : (
          tags.map((tag) => (
            <div key={tag.id} className="tag-card" onClick={() => openTagModal(tag)}>
              {tag.name}
            </div>
          ))
        )}
      </div>

      {modalOpen && <TagModal tag={selectedTag} onClose={closeTagModal} />}
    </div>
  )
}

export default TagsPage