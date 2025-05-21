"use client"

import { createContext, useContext, useState, useEffect } from "react"
const { ipcRenderer } = window.require("electron")

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [fragments, setFragments] = useState([])
  const [tags, setTags] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)

  // Charger les données depuis le processus principal d'Electron
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await ipcRenderer.invoke("get-data")
        setFragments(data.fragments || [])
        setTags(data.tags || [])
        setLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Sauvegarder les données dans le fichier à chaque modification des fragments ou des tags
  useEffect(() => {
    if (!loading) {
      ipcRenderer.invoke("save-data", { fragments, tags })
    }
  }, [fragments, tags, loading])

  // Opérations sur les fragments
  const addFragment = (fragment) => {
    const newFragment = {
      ...fragment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setFragments([...fragments, newFragment])
    return newFragment
  }

  const updateFragment = (id, updatedFragment) => {
    setFragments(
      fragments.map((fragment) =>
        fragment.id === id ? { ...fragment, ...updatedFragment, updatedAt: new Date().toISOString() } : fragment,
      ),
    )
  }

  const deleteFragment = (id) => {
    setFragments(fragments.filter((fragment) => fragment.id !== id))
  }

  const getFragmentById = (id) => {
    return fragments.find((fragment) => fragment.id === id)
  }

  // Opérations sur les tags
  const addTag = (tagName) => {
    const newTag = {
      id: Date.now().toString(),
      name: tagName,
    }
    setTags([...tags, newTag])
    return newTag
  }

  const updateTag = (id, newName) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, name: newName } : tag)))
  }

  const deleteTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id))

    // Supprimer également ce tag de tous les fragments
    setFragments(
      fragments.map((fragment) => ({
        ...fragment,
        tags: fragment.tags ? fragment.tags.filter((tagId) => tagId !== id) : [],
      })),
    )
  }

  const getTagById = (id) => {
    return tags.find((tag) => tag.id === id)
  }

  // Basculer le mode sombre
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Copier dans le presse-papier
  const copyToClipboard = async (text) => {
    return await ipcRenderer.invoke("copy-to-clipboard", text)
  }

  const value = {
    fragments,
    tags,
    darkMode,
    loading,
    addFragment,
    updateFragment,
    deleteFragment,
    getFragmentById,
    addTag,
    updateTag,
    deleteTag,
    getTagById,
    toggleDarkMode,
    copyToClipboard,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}