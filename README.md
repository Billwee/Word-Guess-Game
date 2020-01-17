# Word-Guess-Game

Welcome to my Word Guess Game with a 90's theme and cartoons from that era as the answers. Radical dude!

At first you will see a bouncing notification to "Press any letter to start the game". Pressing anything on your keyboard other than a letter will not start the game. I've filtered out all the other keys as inputs in this word guess game as they are not needed and could cause confusion and take away guesses you didn't want to make. Some of the show names have more than one word, apostrophies, and/or ampersands. I've included code in my game to automatically display those parts of the word once it's generated to help the player and stay true to the shows actual name.

Once you press a letter on your keyboard it will count as your first guess. The hidden word is displayed as underscores with spaces between each letter and a "?" placeholder image is used to hide the image of the shows logo and characters. If your guessed letter is not part of the words that make up the name of the show, one of your thirteen guesses will be taken away. Also your incorrectly guessed letters will be displayed to help you remember what you have guessed already.

I've included a function that removes a letter as a possible guess once the player guesses it. If a letter is pressed again it will not take away any guesses nor will it be displayed again in the guessed letters area.

If your thirteen guesses are used up it will automatically load another show for you to guess and reset the amount of guesses left. If you guess correctly.. the win couter will go up by one, every part of the shows name that contains that letter will be displayed, an image of the shows logo/characters will take the place of the placeholder image, and an eight second audio clip of the shows theme song will play in the backround. During these eight seconds the image and name of the show are still displayed while the audio clip plays though. Also, during these eight seconds all keyboard inputs are turned off as to not run the onKeyUp events during the winning display. Once the eight seconds are up a new show is displayed and the "?" placeholder image is placed back onto the game. The user can now guess the next show.

I've included code which will never display the same show twice if you have guessed it correctly. But if you've used up your thirteen guesses and lost it won't be removed and will display again. So once you've guessed all thirteen shows in the game an alert will pop up telling the user they've won and the game will automatically be reloaded.

Good luck and have fun!

p.s. - If you're having trouble guessing the show I've included a console.log() that displays the answer at the start of every round.


