document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('language') == 'Español') {
        let linkElement = document.getElementById('go-back-button');
        console.log(linkElement);
        linkElement.textContent = 'Regresar';
        linkElement = document.querySelector('h1');
        linkElement.textContent = 'Lectura de Cartas del Tarot';
    }
    const globalState = JSON.parse(localStorage.getItem('FutureNowState'));
    const selectedCards = globalState.TarotState.selectedCards;
    let labels = ['Past', 'Present', 'Future'];
    if (localStorage.getItem('language') == 'Español') {
        labels = ['Pasado', 'Presente', 'Futuro'];
    }
    selectedCards.forEach(function (card, index) {
        let cardName = card.name;
        cardName = cardName.replace(/-/g, ' ');
        const words = cardName.split(' ');
        for (let i = 0; i < words.length; i++) {
            if (i == 0) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                continue;
            }
            if (words[i] != 'of' || words[i] != 'the') {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
        }
        const cardMeaning = card.meaning;
        const cardImg = card.imgSrc;
        cardName = words.join(' ');
        const label = labels[index];
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const nameElement = document.createElement('h3');
        nameElement.textContent = cardName;
        const meaningElement = document.createElement('p');
        meaningElement.textContent = cardMeaning;
        const labelElement = document.createElement('p');
        labelElement.classList.add('label');
        labelElement.style.font = 'bold 2rem \'Macondo\', Courier, monospace';
        labelElement.textContent = label;
        const imageElement = document.createElement('img');
        imageElement.classList.add('card-image');
        imageElement.src = cardImg;

        cardElement.appendChild(labelElement);
        cardElement.appendChild(nameElement);
        cardElement.appendChild(meaningElement);
        cardElement.appendChild(imageElement);

        document.getElementById('card-container').appendChild(cardElement);
    });

    /**
     * Function to go back to the main page
     *  */
    function goBack() {
        window.location.href = '../../index.html';
    }

    // Attach event listener to the "Go Back" button
    document.getElementById('go-back-button').addEventListener('click', goBack);
});
