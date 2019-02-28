import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    id: 'WillBeRandom',
    newItem: '',
    itemList: [],
    randItem: ''
  }

  apiUrl = () => {
    return `https://one-list-api.herokuapp.com/items?access_token=${
      this.state.id
    }`
  }

  addItem = event => {
    event.preventDefault()
    axios
      .post(this.apiUrl(), {
        item: {
          text: this.state.newItem
        }
      })
      .then(resp => {
        this.getListFromAPI()
        this.setState({
          newItem: ''
        })
      })
  }

  updateStateWithNewItem = event => {
    this.setState({
      newItem: event.target.value
    })
  }

  getListFromAPI = () => {
    axios.get(this.apiUrl()).then(resp => {
      this.setState({
        itemList: resp.data
      })
    })
  }

  render() {
    return (
      <>
        <header> Grab Bag</header>
        <section>
          <section>
            <form onSubmit={this.addItem}>
              <input
                onChange={() => this.addItem}
                placeholder="Add Item"
                type="text"
              />
              <button
                onClick={() => this.updateStateWithNewItem}
                value={this.state.newItem}
              >
                {' '}
                +{' '}
              </button>
            </form>
          </section>
          <ul>
            <li>{this.state.newItem}</li>
          </ul>
        </section>
        <section>
          <button onClick={() => this.randomItem}>Select Random</button>
          <h2>{this.state.randItem}</h2>
        </section>
      </>
    )
  }
}

export default App
