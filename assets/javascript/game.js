var alphabet = 'abcdefghijklmnopqrstuvwxyz ';
var wins = 0;
var guessesLeft = 9;
var yourGuesses = [];
var keyPress;
var winsHTML = document.getElementById('wins');
var loseHTML = document.getElementById('losses');
var guessesLeftHTML = document.getElementById('guessesLeft');
var guessedHTML = document.getElementById('guessed');
var showArrayHTML = document.getElementById('showArray');
let dash = [];

let game = {
  shows: ['sho ws', 'this show', 'other sho w', 'shoiik jei jbsef'],

  //Checks is input is a letter
  isLetter: function(key) {
    if (!(key.toLowerCase() != key.toUpperCase() && key.length === 1)) {
      return alert('Press a letter');
    }
  },

  isGuessed: function(key) {
    if (key.toLowerCase() != key.toUpperCase() && key.length === 1) {
      if (alphabet.indexOf(key) >= 0) {
        alphabet = alphabet.replace(key, '');
      } else {
        alert(`You already pressed ${key}`);
        guessesLeft += 1;
        yourGuesses.pop();
        guessedHTML.innerHTML = yourGuesses;
        guessesLeftHTML.innerHTML = guessesLeft;
      }
    }
  },

  getshow: function() {
    randomShow = this.shows[Math.floor(Math.random() * this.shows.length)];
  },

  dashArray: function(show) {
    if (dash.length === 0) {
      for (let i = 0; i < show.length; i++) {
        dash.push('_');
      }
    }
    showArrayHTML.innerHTML = dash;
  },

  spaces: function() {
    for (let i = 0; i < randomShow.length; i++) {
      if (randomShow[i] == ' ') {
        dash[i] = randomShow[i];
      }
    }
  },

  reveal: function(key, show) {
    if (
      show.indexOf(key) === -1 &&
      key.toLowerCase() != key.toUpperCase() &&
      key.length === 1
    ) {
      guessesLeft -= 1;
      guessesLeftHTML.innerHTML = guessesLeft;
      yourGuesses.push(' ' + keyPress.toUpperCase() + ' ');
      guessedHTML.innerHTML = yourGuesses;
    }
    for (let i = 0; i < show.length; i++) {
      if (key === show[i]) {
        dash[i] = show.charAt(i);
      }
    }
    console.log(dash);
  },

  winLose: function() {
    if (guessesLeft !== 0) {
      if (randomShow === dash.join('')) {
        return (
          (wins += 1),
          (winsHTML.innerHTML = wins),
          (guessesLeft = 9),
          (guessesLeftHTML.innerHTML = guessesLeft),
          (yourGuesses = []),
          (dash = []),
          (guessedHTML.innerHTML = yourGuesses),
          (alphabet = 'abcdefghijklmnopqrstuvwxyz '),
          game.getshow(),
          console.log(randomShow)
        );
      }
    } else {
      return (
        (guessesLeft = 9),
        (guessesLeftHTML.innerHTML = guessesLeft),
        (yourGuesses = []),
        (guessedHTML.innerHTML = yourGuesses),
        (dash = []),
        (alphabet = 'abcdefghijklmnopqrstuvwxyz '),
        game.getshow(),
        console.log(randomShow)
      );
    }
  }
};

game.getshow();

console.log(randomShow);

winsHTML.innerHTML = wins;
guessesLeftHTML.innerHTML = guessesLeft;

// Everything is in this onkeyup function
document.onkeyup = function(event) {
  keyPress = event.key;

  game.isLetter(keyPress);
  game.isGuessed(keyPress);
  game.dashArray(randomShow);
  game.spaces();
  game.reveal(keyPress, randomShow);
  game.winLose();
};
