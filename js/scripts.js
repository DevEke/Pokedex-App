// I LOVE POKEMON


// Stored variable for list of pokemon

let pokemonRepo = (function() {

// Declares our list of pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=250';


//Displays Status Messages
  let status = document.querySelector('.status');
  function showLoadingMessage() {
    status.innerHTML = "Loading..."
  }

  function showReadyMessage() {
    status.innerHTML = "Ready";
  }


// Creates a button for each pokemon in the pokemon list
  function addListItem(pokemon) {
    let selectList = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-node');
    listItem.appendChild(button);
    addListener(button, pokemon);
    selectList.appendChild(listItem);
  }

// Opens Modal
  function openModal(pokemon) {
    let modalContainer = document.querySelector('.modal-container');
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    let divTop = document.createElement('div');
    divTop.classList.add('div-top');
    let pokemonInfo = document.createElement('div');
    pokemonInfo.classList.add('pokemon-info');
    let pokemonName = document.createElement('h1');
    pokemonName.classList.add('title');
    pokemonName.innerText = pokemon.name;

    let pokemonId = document.createElement('p');
    pokemonId.classList.add('id-num');
    pokemonId.innerText = pokemon.id;

    let closeButton = document.createElement('button');
    closeButton.classList.add('close');
    let closeIcon = document.createElement('img');
    closeIcon.src = 'img/close-icon.svg';

    let pokemonImg = document.createElement('img');
    pokemonImg.src = pokemon.imageUrl;
    pokemonImg.classList.add('pokepic');

    modalContainer.appendChild(modal);
    modal.appendChild(divTop);
    divTop.appendChild(pokemonInfo);
    pokemonInfo.appendChild(pokemonName);
    pokemonInfo.appendChild(pokemonId);
    divTop.appendChild(closeButton);
    closeButton.appendChild(closeIcon);
    modal.appendChild(pokemonImg);
    modalContainer.classList.add('is-visible');
  }

// Shows the pokemon's name in the console
  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showReadyMessage();
        openModal(pokemon);
      })
    }

// Adds an event listener to the button that shows pokemon's name
  function addListener(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
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

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.id = details.id;
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (error) {
      console.log(error);
    });
  }



  return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    openModal: openModal
  }
})();

// Loops through Pokemon List and displays each pokemon's name
pokemonRepo.loadList().then(function() {
  pokemonRepo.getAll().forEach(function(pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
})

function openModal(pokemon) {
  let modalContainer = document.querySelector('.modal-container');
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');
  let divTop = document.createElement('div');
  divTop.classList.add('div-top');
  let pokemonInfo = document.createElement('div');
  pokemonInfo.classList.add('pokemon-info');
  let pokemonName = document.createElement('h1');
  pokemonName.classList.add('title');
  pokemonName.innerText = pokemon.name;

  let pokemonId = document.createElement('p');
  pokemonId.classList.add('id-num');
  pokemonId.innerText = `ID: ${pokemon.id}`;

  let closeButton = document.createElement('button');
  closeButton.classList.add('close');
  let closeIcon = document.createElement('img');
  closeIcon.src = 'img/close-icon.svg';

  let pokemonImg = document.createElement('img');
  pokemonImg.src = pokemon.imageUrl;
  pokemonImg.classList.add('pokepic');

  let pokemonHeight = document.createElement('p');
  pokemonHeight.classList.add('pokeheight');
  pokemonHeight.innerText = `Height: ${pokemon.height}`;

  modalContainer.appendChild(modal);
  modal.appendChild(divTop);
  divTop.appendChild(pokemonInfo);
  pokemonInfo.appendChild(pokemonName);
  pokemonInfo.appendChild(pokemonId);
  divTop.appendChild(closeButton);
  closeButton.appendChild(closeIcon);
  modal.appendChild(pokemonImg);
  modal.appendChild(pokemonHeight);
  pokemon.types.forEach(function(pokemon) {
    let pokemonType = document.createElement('div');
    pokemonType.classList.add('types');
    modal.appendChild(pokemonType);
  })
  modalContainer.classList.add('is-visible');
}
