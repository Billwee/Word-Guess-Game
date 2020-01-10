var alphabet = 'abcdefghijklmnopqrstuvwxyz ';
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var yourGuesses = [];
var keyPress;
var winsHTML = document.getElementById('wins');
var loseHTML = document.getElementById('losses');
var guessesLeftHTML = document.getElementById('guessesLeft');
var guessedHTML = document.getElementById('guessed');
let dash = [];

let game = {
  shows: ['but ts', 'wei ners', 'boo gers', 'ding dongs'],

  //Checks is input is a letter
  isLetter: function(key) {
    if (!(key.toLowerCase() != key.toUpperCase() && key.length === 1)) {
      return alert('Press a letter');
    }
  },

  isGuessed: function(key) {
    if (alphabet.indexOf(key) >= 0) {
      alphabet = alphabet.replace(key, '');
      // console.log(alphabet);
    } else {
      alert(`You already pressed ${key}`);
      guessesLeft += 1;
      yourGuesses.pop();
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
  },

  spaces: function() {
    for (let i = 0; i < randomShow.length; i++) {
      if (randomShow[i] == ' ') {
        dash[i] = randomShow[i];
      }
    }
    console.log(dash);
  },

  reveal: function(key, show) {
    for (let i = 0; i < show.length; i++) {
      if (key === randomShow[i]) {
        dash[i] = randomShow.charAt(i);
      }
    }
    console.log(dash);
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

  // if (guessesLeft >= 2) {
  //   if (keyPress.toLowerCase() !== randomShow) {
  //     guessesLeft -= 1;
  //     yourGuesses.push(' ' + keyPress.toLowerCase() + ' ');
  //     guessedHTML.innerHTML = yourGuesses;
  //     guessesLeftHTML.innerHTML = guessesLeft;
  //   } else {
  //     return (
  //       (wins += 1),
  //       (guessesLeft = 9),
  //       (guessesLeftHTML.innerHTML = guessesLeft),
  //       (winsHTML.innerHTML = wins),
  //       (yourGuesses = []),
  //       (guessedHTML.innerHTML = yourGuesses),
  //       letter(),
  //       console.log(randomShow),
  //       (alphabet = 'abcdefghijklmnopqrstuvwxyz')
  //     );
  //   }
  // } else {
  //   return (
  //     (losses += 1),
  //     (guessesLeft = 9),
  //     (guessesLeftHTML.innerHTML = guessesLeft),
  //     (loseHTML.innerHTML = losses),
  //     (yourGuesses = []),
  //     (guessedHTML.innerHTML = yourGuesses),
  //     letter(),
  //     console.log(randomShow),
  //     (alphabet = 'abcdefghijklmnopqrstuvwxyz')
  //   );
  // }
};
