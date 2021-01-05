import React, { Component } from 'react'
import Card from './Card'
import axios from 'axios'
import './Deck.css'

const API_BASE_URL = "https://deckofcardsapi.com/api/deck"


class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = { deck: null, drawn: [], remaining: 52 }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.getCard = this.getCard.bind(this)
    }
    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`)
        this.setState({ deck: deck.data })
    }

    async getCard() {
        let id = this.state.deck.deck_id
        let cardUrl = `${API_BASE_URL}/${id}/draw/`
        let cardRes = await axios.get(cardUrl)
        let card = cardRes.data.cards[0]
        if (this.state.remaining > 0) {
            this.setState(st => ({
                drawn: [
                    ...st.drawn,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit} `
                    }
                ],
                remaining: st.remaining -= 1
            }))
            console.log(card)
        } else {
            alert("No Cards Remaining")
        }
    }

    render() {
        const cards = this.state.drawn.map(c => (
            < Card key={c.id} name={c.name} image={c.image} />
        ))
        return (
            <div>
                <h1>Card Dealer</h1>
                <button onClick={this.getCard}>Get Card!</button>
                <div className="Deck-card-area">{cards}</div>
            </div>
        )
    }
}

export default Deck