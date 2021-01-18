// I LOVE POKEMON!!!!


// Stored variable for list of pokemon

let pokemonRepo = (function() {

// Declares our list of pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=250';


// Displays Status Messages
  let status = document.querySelector('.status');
  function showLoadingMessage() {
    status.innerHTML = "Loading..."
  }

  function showReadyMessage() {
    status.innerHTML = "Ready";
  }


// Creates a button for each pokemon in the pokemon list
  function addListItem(pokemon) {
    let selectList = document.querySelector('.pokemon-list');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('list-group-item');
    button.classList.add('text-capitalize');
    button.setAttribute('type', 'button');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.setAttribute('data-target', '#pokemon-info');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-bs-name', pokemon.name);
    selectList.appendChild(button);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    })
  }


  function showModal(pokemon) {
    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');
    let modalId = $('#pokemon-id');
    modalTitle.empty();
    modalBody.empty();
    modalId.empty();
    let pokemonId = document.createElement('p');
    pokemonId.innerText = `ID: ${pokemon.id}`;
    let pokemonImage = document.createElement('img');
    pokemonImage.setAttribute('src', pokemon.imageUrl);
    pokemonImage.classList.add('pokepic');
    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = `Height: ${pokemon.height/.10000 } cm`
    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = `Weight: ${pokemon.weight/10} kg`;

    modalTitle.append(pokemon.name);
    modalBody.append(pokemonId);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);

    pokemon.types.forEach(function(pokemon) {
      let pokemonType = document.createElement('img');
      pokemonType.classList.add('type');

  // Switch case for Pokemon types, assigns class based on element of Pokemon
      switch(pokemon.type.name) {
        case "normal": pokemonType.setAttribute('src', 'img/normal.png'); break;
        case "water": pokemonType.setAttribute('src', 'img/water.png'); break;
        case "electric": pokemonType.setAttribute('src', 'img/electric.png'); break;
        case "fighting": pokemonType.setAttribute('src', 'img/fight.png'); break;
        case "ground": pokemonType.setAttribute('src', 'img/ground.png'); break;
        case "psychic": pokemonType.setAttribute('src', 'img/psychic.png'); break;
        case "rock": pokemonType.setAttribute('src', 'img/rock.png'); break;
        case "dark": pokemonType.setAttribute('src', 'img/dark.png'); break;
        case "steel": pokemonType.setAttribute('src', 'img/steel.png'); break;
        case "fire": pokemonType.setAttribute('src', 'img/fire.png'); break;
        case "grass": pokemonType.setAttribute('src', 'img/grass.png'); break;
        case "ice": pokemonType.setAttribute('src', 'img/ice.png'); break;
        case "poison": pokemonType.setAttribute('src', 'img/poison.png'); break;
        case "flying": pokemonType.setAttribute('src', 'img/flying.png'); break;
        case "bug": pokemonType.setAttribute('src', 'img/bug.png'); break;
        case "ghost": pokemonType.setAttribute('src', 'img/ghost.png'); break;
        case "dragon": pokemonType.setAttribute('src', 'img/dragon.png'); break;
        case "fairy": pokemonType.setAttribute('src', 'img/fairy.png'); break;
      }
      modalBody.append(pokemonType);
    })

  }

// Shows the pokemon's name in the console
  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showReadyMessage();
        showModal(pokemon);
      })
    }

// Retrieves the full pokemon list
  function getAll() {
    return pokemonList;
  }

// Adds a pokemon to the list only if the passed argument is an object
  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    }
    else {
      return "Sorry, Pokemon must have an Id, Name, Type, and Height.";
    }
  }

// Loads the list of Pokemon from the API
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      showReadyMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) {
      showReadyMessage();
      console.log(error);
    })
  }

// Loads the details for each pokemon
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.id = details.id;
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function (error) {
      console.log(error);
    });
  }


// Returns to functions from IIFE
  return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem
  }
})();

// Loops through Pokemon List and displays each pokemon's name
pokemonRepo.loadList().then(function() {
  pokemonRepo.getAll().forEach(function(pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
})
