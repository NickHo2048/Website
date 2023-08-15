import '../components/TarotCard.js';
//import handleManualRefresh from '../utils/handleRefresh.js';
import { CARD_DATA } from '../constants/card-meanings.js';
export { shuffleArray };
/**
 * This file contains our init function for initializing tarot cards.
 */

//handleManualRefresh();

window.addEventListener('DOMContentLoaded', init);
/**
 * This function initializes and populate a card deck or card display
 * using the CARD_DATA components from card-meanings.js. It checks the presence
 * of a state in the local storage, shuffles the cards, and dynamically
 * creates tarot-card elements with specific attributes to display the
 * shuffled cards in the cardsContainer element.
 */
async function init() {
    if (localStorage.getItem('language') == 'Español') {
        let linkElement = document.getElementById('volume-button');
        linkElement.textContent = 'Volumen APAGADO';
        linkElement = document.getElementsByClassName('select-cards-title');
        linkElement[0].textContent = 'Por favor elige 3 cartas para tu lectura';
    }
    else if (localStorage.getItem('language') == '中文') {
        let linkElement = document.getElementById('volume-button');
        linkElement.textContent = '关掉声音';
        linkElement = document.getElementsByClassName('select-cards-title');
        linkElement[0].textContent = '请选择三张牌';
    }
    try {
        localStorage.removeItem('FutureNowState');

        // Set clean new states
        localStorage.setItem(
            'FutureNowState',
            JSON.stringify({
                TarotState: {
                    selectedCards: [],
                    isSelectingCard: false,
                },
                EightBallState: {},
            })
        );

        const cardsContainer = document.querySelector('.cards-container');
        const shuffledCardData = shuffleArray(
            CARD_DATA[localStorage.getItem('language')]
        );
        for (let i = 0; i < 24; i++) {
            const card = shuffledCardData[i];
            const tarotCardElement = document.createElement('tarot-card');

            // set attributes for each card
            tarotCardElement.setAttribute(
                'card-back-src',
                '../assets/img/cardBack.png'
            );
            tarotCardElement.setAttribute('card-name', card.name);
            tarotCardElement.setAttribute(
                'card-img-src',
                `../assets/img/cards/${card['img-src']}`
            );
            tarotCardElement.setAttribute('card-past', card.past);
            tarotCardElement.setAttribute('card-present', card.present);
            tarotCardElement.setAttribute('card-future', card.future);

            cardsContainer.appendChild(tarotCardElement);
        }
    } catch (error) {
        console.error('An error occurred while getting card details:', error);
    }

    const volumeButton = document.querySelector('#volume-button');
    volumeButton.addEventListener('click', handleVolumeToggle);

}

/**
 * Randomly shuffles the cards
 * @param {array} array This is the array of unshuffled cards
 * @return {array} the array of shuffled cards
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const bgm = new Audio('magic.mp3');
bgm.loop = true; // This will enable the bgm to loop once it ends

window.addEventListener('DOMContentLoaded', () => {
    // other initialization code...

    const volumeButton = document.querySelector('#volume-button');
    volumeButton.addEventListener('click', handleVolumeToggle);

    // start the background music as soon as the page loads
});

/**
 * This function handles the volume on/off toggle
 * based on the current state of the button.
 */
function handleVolumeToggle() {
    const volumeButton = document.querySelector('#volume-button');
    const currentVolumeState = volumeButton.textContent;

    if (currentVolumeState === 'Volume ON') {
        // Code to turn off the volume goes here...
        bgm.pause();
        volumeButton.textContent = 'Volume OFF';
    } else if (currentVolumeState === 'Volume OFF') {
        // Code to turn on the volume goes here...
        bgm.play();
        volumeButton.textContent = 'Volume ON';
    } else if (currentVolumeState === 'Volumen ENCENDIDO') {
        // Code to turn off the volume goes here...
        bgm.pause();
        volumeButton.textContent = 'Volumen APAGADO';
    } else if (currentVolumeState === 'Volumen APAGADO') {
        // Code to turn off the volume goes here...
        bgm.play();
        volumeButton.textContent = 'Volumen ENCENDIDO';
    }
}
