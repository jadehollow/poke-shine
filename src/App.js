import './App.css';
import React from 'react';

class Pokemon extends React.Component {
  // Gotta catch em all gotta catch em all
  constructor() {
    super()
    this.state = {
      loadedPokemon: false,
      regular: null,
      shiny: null,
      name: null,
      id: null,
      type: [],
    }
  }

  Capitalize(str) {
    const arrOfWords = str.split(" ");
    const arrOfWordsCased = [];

    for (let i = 0; i < arrOfWords.length; i++) {
      const word = arrOfWords[i];
      arrOfWordsCased.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
    }

    return arrOfWordsCased.join(" ");
  }

  getNewPokemon() {
    // I want real pokemon, dang it
    const randomNumber = Math.round(Math.random() * 898)
    const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          regular: data.sprites.front_default,
          shiny: data.sprites.front_shiny,
          name: data.name,
          id: data.id,
          types: data.types,
          loadedPokemon: true,
        })
      })
  }

  searchPokemon() {
    // Where dem beasties at
    let pokemonName = document.getElementById("pokeInput").value;
    const url2 = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    fetch(url2)
      .then(response => response.json())
      .then(data => {
        this.setState({
          regular: data.sprites.front_default,
          shiny: data.sprites.front_shiny,
          name: data.name,
          id: data.id,
          types: data.types,
          loadedPokemon: true,
        })
      })
  }

  render() {
    const bothTypes = this.state.types && this.state.types.map((typesObject) => typesObject.type.name).join(', ')

    return (
      <div className="main">
        {
          this.state.loadedPokemon &&
          <div className="grid-container">
            <div className="item item1">
              <img src={this.state.regular} alt="regular"></img>
            </div>
            <div className="item item5">
              <img src={this.state.shiny} alt="shiny"></img>
            </div>
            <div className="item item2">
              <h1>{this.Capitalize(this.state.name)}</h1>
            </div>
            <div className="item item3">
              <h3>Pokédex:</h3>
              <p>{this.state.id}</p>
            </div>
            <div className="item item4">
              <h3>Type:</h3>
              <p>{this.Capitalize(bothTypes)}</p>
            </div>
          </div>
        }

        <div>
          <button
            type="button"
            onClick={() => this.getNewPokemon()}
            className="btn btn-outline-warning btn-lg"
          >
            Random Pokémon
          </button>
        </div>

        <div className="search-box">
            <input
              id="pokeInput"
              className="form-control"
              type="text"
            />
            <button
              id="searchBtn"
              type="button"
              className="btn btn-outline-warning btn-lg"
              onClick={() => this.searchPokemon()}
            >
              Search Pokémon
            </button>
        </div>

      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Pokemon />
      </header>
    </div>
  );
}


export default App;


