// I LOVE POKEMON


// Stored variable for list of pokemon

let pokemonList = [
  {
    id: 001,
    name: 'Bulbasaur',
    type: ['grass', 'poison'],
    height: 2.33
  },
  {
    id: 002,
    name: 'Ivysaur',
    type: ['grass', 'poison'],
    height: 3.25
  },
  {
    id: 003,
    name: 'Venusaur',
    type: ['grass', 'poison'],
    height: 6.58
  },
  {
    id: 004,
    name: 'Charmander',
    type: ['fire'],
    height: 2
  },
  {
    id: 005,
    name: 'Charmeleon',
    type: ['fire'],
    height: 3.58
  },
  {
    id: 006,
    name: 'Charizard',
    type: ['fire', 'flying'],
    height: 5.58
  },
  {
    id: 007,
    name: 'Squirtle',
    type: ['water'],
    height: 1.67
  },
  {
    id: 008,
    name: 'Wartortle',
    type: ['water'],
    height: 3.25
  },
  {
    id: 009,
    name: 'Blastoise',
    type: ['water'],
    height: 5.25
  }
];

// Loops through Pokemon List and displays each pokemon's name and corresponding height

for (let i = 0; i < pokemonList.length; i++) {
  // If the height of the pokemon is greater than to 6 feet then we'll append a statement to the pokemon's height and name
  if ( pokemonList[i].height > 6 ) {
    document.write("<p>" + pokemonList[i].name + ` (Height: ${pokemonList[i].height}) - Wow, That's big!</p>`)
  }
  // If the height of the pokemon is less than 6 feet, we'll just return their name and height
  else {
    document.write("<p>" + pokemonList[i].name + ` (Height: ${pokemonList[i].height})</p>`)
  }
}
