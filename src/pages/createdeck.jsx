import React, { useState } from "react"
import Layout from "../components/layout"
import { supabase } from "../lib/supabase"

const CreateDeckPage = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [cards, setCards] = useState([])
  const [cardTitle, setCardTitle] = useState("")
  const [cardPrompt, setCardPrompt] = useState("")

  const handleAddCard = () => {
    if (cardTitle && cardPrompt) {
      const newCard = { title: cardTitle, prompt: cardPrompt }
      setCards(prevCards => [...prevCards, newCard])
      setCardTitle("")
      setCardPrompt("")
    }
  }

  const handleDeleteCard = index => {
    setCards(prevCards => prevCards.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (title && description && cards.length > 0) {
      try {
        // Insert the deck
        const { data, error } = await supabase
          .from("decks")
          .insert([
            {
              title,
              description,
              user_id: "8adeca3b-23f7-48cd-81ad-1f4c11b7623e",
            },
          ])
          .select()
        if (error) throw error

        const deckId = data[0].id

        // Insert the cards for the deck
        const cardData = cards.map(card => ({
          deck_id: deckId,
          title: card.title,
          prompt: card.prompt,
        }))
        const { error: cardsError } = await supabase
          .from("cards")
          .insert(cardData)
        if (cardsError) throw cardsError

        // Reset the form
        setTitle("")
        setDescription("")
        setCards([])
        setCardTitle("")
        setCardPrompt("")

        console.log("Deck and cards successfully created!")
      } catch (error) {
        console.error("Error creating deck and cards:", error)
      }
    } else {
      console.log(
        "Please fill out the deck title, description, and add at least one card."
      )
    }
  }

  return (
    <Layout>
      <div>
        <h2>Create Deck</h2>
        <div>
          <label>
            Deck Title:
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
        </div>
        <h3>Add Cards</h3>
        <div>
          <label>
            Card Title:
            <input
              type="text"
              value={cardTitle}
              onChange={e => setCardTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Card Prompt:
            <textarea
              value={cardPrompt}
              onChange={e => setCardPrompt(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleAddCard}>Add Card</button>
        <div>
          {cards.map((card, index) => (
            <div key={index}>
              <h4>{card.title}</h4>
              <p>{card.prompt}</p>
              <button onClick={() => handleDeleteCard(index)}>Delete</button>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </Layout>
  )
}

export default CreateDeckPage
