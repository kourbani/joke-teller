const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Pass Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: '44acbae0e867415e8660be8c07892fbb',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

//  Get Jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl ='https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if(data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    }else {
      joke = data.joke;
    }
    tellMe(joke);
    // Disable the button
    toggleButton();
  } catch (error) {
    // Catch errors here
    console.log('ooops',error);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended',toggleButton);