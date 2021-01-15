// I LOVE POKEMON


// Stored variable for list of pokemon

let pokemonRepo = (function() {
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

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === "object" /*&& Object.keys(pokemon) === ['id', 'name', 'type', 'height']*/) {
      pokemonList.push(pokemon);
    }
    else {
      return "Sorry, We don't recognize that pokemon.";
    }
  }

  return {
    getAll: getAll,
    add: add
  }
})();

// Loops through Pokemon List and displays each pokemon's name and corresponding height

pokemonRepo.getAll().forEach(function(pokemon) {
  // If the height of the pokemon is greater than to 6 feet then we'll append a statement to the pokemon's height and name
if ( pokemon.height > 6 ) {
    document.write("<p>" + pokemon.name + ` (Height: ${pokemon.height}) - <b>Wow, That's big!</b>` + "</p>")
  }
  // If the height of the pokemon is less than 6 feet, we'll just return their name and height
  else {
    document.write("<p>" + pokemon.name + ` (Height: ${pokemon.height})` + "</p>")
  }
});
