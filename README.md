# Pokedex app

A simple application that allows the user to search for and retrieve information about various Pokemon. The app utilizes the PokeApi to retrieve a list of all Pokemon, and allows the user to click on a specific node to reveal more information about that Pokemon.

##How to Install
Simply clone the repo and load the index.html file in the browser

## Main Features

- Pokemon search
- Pokemon Info (Including Name, Image, ID, Height, Weight, and Types).

## Tools Used

- HTML
- CSS
- Bootstrap
- JavaScript
- PokeApi (API)

## Add more Pokemon

You can change how many Pokemon are retrieved by changing the last value in the link to the number of Pokemon you want displayed. For instance, the below example will set the app to only show the first 500 Pokemon.

```
let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=500";
```

### Pokemon Guide

- Kanto Region (Gen I) : 151
- Jhoto Region (Gen II): 251
- Hoenn Region (Gen III): 386
- Sinnoh Region (Gen IV): 493
- Unova Region (Gen V): 649
- Kalos Region (Gen VI): 721
- Alola Region (Gen VII): 809
- Galar Region (Gen VIII): 898
