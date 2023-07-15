import React, { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const MyPage = () => {
  const [decks, setDecks] = useState([])
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [cards, setCards] = useState([])
  const [drawnCards, setDrawnCards] = useState([])

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const { data, error } = await supabase.from("decks").select("*")
        if (error) throw error
        setDecks(data)
      } catch (error) {
        console.error("Error fetching decks:", error)
      }
    }

    fetchDecks()
  }, [])

  const fetchCards = async deckId => {
    try {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("deck_id", deckId)
      if (error) throw error
      setCards(data)
    } catch (error) {
      console.error("Error fetching cards:", error)
    }
  }

  const handleDeckClick = deck => {
    setSelectedDeck(deck)
    fetchCards(deck.id)
  }

  const handleDrawCard = () => {
    if (cards.length > 0) {
      const randomIndex = Math.floor(Math.random() * cards.length)
      const drawnCard = cards[randomIndex]
      setDrawnCards(prevCards => [...prevCards, drawnCard])
      setCards(prevCards =>
        prevCards.filter((card, index) => index !== randomIndex)
      )
    }
  }

  const handleReset = () => {
    setDrawnCards([])
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        {decks.map(deck => (
          <div
            key={deck.id}
            onClick={() => handleDeckClick(deck)}
            style={{
              border: "1px solid black",
              padding: "10px",
              cursor: "pointer",
              marginRight: "10px",
              background:
                selectedDeck && deck.id === selectedDeck.id
                  ? "lightgray"
                  : "white",
            }}
          >
            {deck.title}
          </div>
        ))}
      </div>
      <div>
        {selectedDeck ? (
          <div>
            <button onClick={handleDrawCard} disabled={cards.length === 0}>
              Draw Card
            </button>
            <button onClick={handleReset} disabled={drawnCards.length === 0}>
              Reset
            </button>
          </div>
        ) : (
          <div>Please select a deck to view its cards.</div>
        )}
        <div>
          {drawnCards.length > 0 ? (
            drawnCards.map(card => (
              <div key={card.id}>
                <h3>{card.title}</h3>
                <p>{card.prompt}</p>
              </div>
            ))
          ) : (
            <div>No cards drawn yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyPage
