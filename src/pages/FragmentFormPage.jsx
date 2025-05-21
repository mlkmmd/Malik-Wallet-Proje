"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import TagSelector from "../components/TagSelector"
import "../styles/FragmentFormPage.css"

const FragmentFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getFragmentById, addFragment, updateFragment, deleteFragment, tags } = useAppContext()

  const [title, setTitle] = useState("")
  const [code, setCode] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  // Charger les données du fragment si on est en mode édition
  useEffect(() => {
    if (id && id !== "new") {
      const fragment = getFragmentById(id)
      if (fragment) {
        setTitle(fragment.title)
        setCode(fragment.code)
        setSelectedTags(fragment.tags || [])
        setIsEditing(true)
      } else {
        navigate("/fragments")
      }
    }
  }, [id, getFragmentById, navigate])

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !code.trim()) {
      alert("Title and code are required!")
      return
    }

    const fragmentData = {
      title,
      code,
      tags: selectedTags,
    }

    if (isEditing) {
      updateFragment(id, fragmentData)
    } else {
      addFragment(fragmentData)
    }

    navigate("/fragments")
  }

  // Gérer la suppression d'un fragment
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this fragment?")) {
      deleteFragment(id)
      navigate("/fragments")
    }
  }

  return (
    <div className="fragment-form-page">
      <form onSubmit={handleSubmit} className="fragment-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter fragment title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="code">Code</label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here"
            rows={10}
            required
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <TagSelector allTags={tags} selectedTags={selectedTags} onChange={setSelectedTags} />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            Save
          </button>

          {isEditing && (
            <button type="button" className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default FragmentFormPage