"use client"

import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import "../styles/TagSelector.css"

const TagSelector = ({ allTags, selectedTags, onChange }) => {
  const { addTag } = useAppContext()
  const [newTagName, setNewTagName] = useState("")

  // Basculer la sélection d'un tag
  const handleTagToggle = (tagId) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter((id) => id !== tagId))
    } else {
      onChange([...selectedTags, tagId])
    }
  }

  // Ajouter un nouveau tag
  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag = addTag(newTagName.trim())
      onChange([...selectedTags, newTag.id])
      setNewTagName("")
    }
  }

  // Gérer l'appui sur Entrée pour ajouter un tag
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className="tag-selector">
      <div className="tag-list">
        {allTags.map((tag) => (
          <div
            key={tag.id}
            className={`tag-item ${selectedTags.includes(tag.id) ? "selected" : ""}`}
            onClick={() => handleTagToggle(tag.id)}
          >
            {tag.name}
          </div>
        ))}
      </div>

      <div className="add-tag">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new tag"
        />
        <button type="button" onClick={handleAddTag}>
          Ajouter
        </button>
      </div>
    </div>
  )
}

export default TagSelector
