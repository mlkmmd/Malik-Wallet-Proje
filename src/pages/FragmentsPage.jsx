"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import FragmentCard from "../components/FragmentCard"
import CodeModal from "../components/CodeModal"
import "../styles/FragmentsPage.css"

const FragmentsPage = () => {
  const { fragments, tags } = useAppContext()
  const [selectedFragment, setSelectedFragment] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Ouvrir la modale de code pour un fragment spécifique
  const openCodeModal = (fragment) => {
    setSelectedFragment(fragment)
    setModalOpen(true)
  }

  // Fermer la modale de code
  const closeCodeModal = () => {
    setModalOpen(false)
    setSelectedFragment(null)
  }

  return (
    <div className="fragments-page">
      <div className="page-header">
        <div className="nav-buttons">
          <Link to="/fragments" className="nav-button active">
            Fragments
          </Link>
          <Link to="/tags" className="nav-button">
            Tags
          </Link>
        </div>
        <Link to="/fragment/new" className="new-button">
          New
        </Link>
      </div>

      <div className="fragments-grid">
        {fragments.length === 0 ? (
          <div className="no-fragments">
            <p>No fragments yet. Create your first one!</p>
            <Link to="/fragment/new" className="new-button">
              Create Fragment
            </Link>
          </div>
        ) : (
          fragments.map((fragment) => (
            <FragmentCard
              key={fragment.id}
              fragment={fragment}
              tags={tags}
              onViewCode={() => openCodeModal(fragment)}
            />
          ))
        )}
      </div>

      {modalOpen && selectedFragment && <CodeModal fragment={selectedFragment} onClose={closeCodeModal} />}
    </div>
  )
}

export default FragmentsPage