import React, { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

const DeckSelector = ({ onDeckToggle, decks }) => {
  const handleDeckToggle = (deckId, isVisible) => {
    onDeckToggle(deckId, isVisible)
  }

  return (
    <div>
      <h3>Decks</h3>
      <ul>
        {decks.map(deck => (
          <li key={deck.id}>
            <label>
              <input
                type="checkbox"
                checked={deck.isVisible}
                onChange={() => handleDeckToggle(deck.id, !deck.isVisible)}
              />
              {deck.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DeckSelector
