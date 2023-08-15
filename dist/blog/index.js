/**
 * This class is used to make a custom TarotCard element for use
 * in the overall project. The TarotCard element houses the states
 * for the back of an individual Tarot Card, the front of the
 * card, as well as the name of the card.
 */
class TarotCard extends HTMLElement {
    /**
     * Create Shadow DOM
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    /**
     * Call Render
     */
    connectedCallback() {
        this.render();
    }

    /**
     * Call on card-back, card-name, and card-image attributes
     */
    static get observedAttributes() {
        return [
            'card-back-src',
            'card-name',
            'card-img-src',
            'card-past',
            'card-present',
            'card-future',
        ];
    }

    /**
     *
     * @param {*} attrName
     * @param {*} oldValue
     * @param {*} newValue
     *
     * If the attribute has changed, then we render
     */
    attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this.render();
    }

    /**
     * It constructs the HTML structure for the custom element's shadow DOM and sets the
     * innerHTML property of the shadowRoot to update its content. It includes a CSS rule
     * and creates an image element based on the attribute values. Additionally, it attaches a
     * click event listener to the card element to handle the card selection behavior, invoking the
     * chooseCard() method.
     */
    render() {
        const cardBackSrc = this.getAttribute('card-back-src');
        const cardName = this.getAttribute('card-name');
        const cardImgSrc = this.getAttribute('card-img-src');

        this.shadowRoot.innerHTML = `
      <style>
        .card {
          position: relative;

          cursor: pointer;
          width: 100%;
          background-color: transparent;
          perspective: 1000px;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .card-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden; /* Safari */
          backface-visibility: hidden;
        }

        .flipped {
          transform: rotateY(180deg);
        }

        .card-image {
          width: 100%;
        }

        .card-front {
          transform: rotateY(180deg);
        }

        .card-popup {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 100;
          backdrop-filter: blur(8px);
          background-color: rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition-delay: 250ms;
          transition: opacity 0.5s ease-in-out; /* Add transition property */
        }

        @keyframes zoom {
          0% {
            transform: scale(0.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .card-popup img {
          animation: zoom 2s  ;
          width: 50%;
          max-width: 300px;
          z-index: 100;
          position: absolute;
        }
        .card-popup.show {
          opacity: 1; /* Set opacity to 1 when the popup is shown */
        }

        .card-text {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px;
          background-color: rgba(0, 0, 0, 0.8);
          color: #eab308;
          border: 5px solid black;
          border-radius: 5px;
          font-size: 16px;
          text-align: center;
          z-index: 1000;
        }
      </style>
      <article class="card">
        <div class="card-inner">
          <div class="card-front">
            <img class="card-image" src="${cardImgSrc}" alt="${cardName}">
          </div>
          <div class="card-back">
            <img class="card-image" src="${cardBackSrc}" alt="${cardName}">
          </div>
        </div>
      </article> 
      <div class="card-popup" style="transform: scale(1);">
        <img class="card-image" src="${cardImgSrc}" alt="${cardName}">
        <p class="card-text">Sample text for the card</p>
      </div>
    `;

        const cardElement = this.shadowRoot.querySelector('.card');
        cardElement.addEventListener('click', this.chooseCard.bind(this));

        const cardPopupElement = this.shadowRoot.querySelector('.card-popup');
        cardPopupElement.addEventListener('click', this.closePopup.bind(this));

        // In chooseCard() method, add the 'show' class to the cardPopupElement
        cardPopupElement.classList.add('show');
    }
}