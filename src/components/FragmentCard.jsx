"use client"

import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import "../styles/FragmentCard.css"

const FragmentCard = ({ fragment, tags, onViewCode }) => {
  const { getTagById } = useAppContext()

  // Obtenir les objets de tag à partir des IDs de tag
  const fragmentTags = fragment.tags ? fragment.tags.map((tagId) => getTagById(tagId)).filter(Boolean) : []

  return (
    <div className="fragment-card">
      <Link to={`/fragment/${fragment.id}`} className="fragment-card-content">
        <h3 className="fragment-title">{fragment.title}</h3>

        {fragmentTags.length > 0 && (
          <div className="fragment-tags">
            {fragmentTags.map((tag) => (
              <span key={tag.id} className="tag">
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </Link>

      <button
        className="view-code-button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onViewCode()
        }}
      >
        <span role="img" aria-label="View Code">
          👁️
        </span>
      </button>
    </div>
  )
}

export default FragmentCard
