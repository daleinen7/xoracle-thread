import React, { useState, useEffect } from "react"
import { useAuth } from "../auth/AuthProvider"
import { supabase } from "../lib/supabase"
import Layout from "../components/Layout"

const DecksPage = () => {
  const [decks, setDecks] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchDecks = async () => {
      // Fetch all available decks from the database
      const { data, error } = await supabase.from("decks").select("*")
      if (error) {
        console.error("Error fetching decks:", error)
        return
      }
      setDecks(data)
    }

    fetchDecks()
  }, [])

  console.log("DECKS: ", decks)

  const handleSaveDeck = async deckId => {
    try {
      // Check if the deck is already saved by the user
      const { data: savedDecks, error } = await supabase
        .from("user_decks")
        .select("*")
        .eq("user_id", user.id)
        .eq("deck_id", deckId)

      if (error) {
        console.error("Error checking saved decks:", error)
        return
      }

      if (savedDecks.length > 0) {
        // The deck is already saved, so unsave it
        const { error: deleteError } = await supabase
          .from("user_decks")
          .delete()
          .eq("user_id", user.id)
          .eq("deck_id", deckId)

        if (deleteError) {
          console.error("Error deleting deck from saved decks:", deleteError)
          return
        }
      } else {
        // The deck is not saved, so save it
        const { error: insertError } = await supabase
          .from("user_decks")
          .insert([
            {
              user_id: user.id,
              deck_id: deckId,
            },
          ])

        if (insertError) {
          console.error("Error saving deck to user decks:", insertError)
          return
        }
      }

      // Refresh the decks list to reflect the changes
      // fetchDecks()
    } catch (error) {
      console.error("Error saving/unsaving deck:", error)
    }
  }

  return (
    <Layout>
      <h2>All Decks</h2>
      <ul>
        {decks.map(deck => (
          <li key={deck.id}>
            <h3>{deck.title}</h3>
            <p>{deck.description}</p>
            <button onClick={() => handleSaveDeck(deck.id)}>
              {user && deckIsSaved(deck.id) ? "Unsave" : "Save"}
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default DecksPage
