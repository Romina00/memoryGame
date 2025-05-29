(function init() {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startGame");
    const selectionScreen = document.querySelector(".selection-screen");
    const memoryContainer = document.querySelector(".memory-container");
    const memoryGame = document.querySelector(".memory-game");
    const winnerMessage = document.querySelector(".winner-message");
    //startknopf für das spiel
    //3D effekt wird verleinert und gekippt
    document.getElementById("startGame").addEventListener("click", function () {
      this.style.animation = "none";
      this.style.transform = "perspective(100px) rotateX(2deg) scale(0.95)";

      setTimeout(() => {
        this.style.transform = "perspective(100px) rotateX(10deg) scale(1)";
        this.style.animation =
          "shimmer 2s infinite linear, buttonPulse 1.5s infinite alternate";
        startButton.classList.add("hidden");
      }, 300); //300ms
    });

    let cards = []; //speichert alle erzeugten Karten.
    let flippedCards = []; //Speichert die zwei aufgedeckten Karten
    let matches = 0;

    // Start-Button zeigt die Auswahl an
    startButton.addEventListener("click", () => {
      startButton.classList.add("hidden");
      selectionScreen.classList.remove("hidden"); // Zeige die Auswahl
    });

    // Auswahl eines Themas
    selectionScreen.querySelectorAll(".selection-option").forEach((option) => {
      option.addEventListener("click", () => {
        const theme = option.dataset.theme;
        selectionScreen.classList.add("hidden"); // Verstecke die Auswahl
        memoryContainer.classList.remove("hidden"); // Zeige das Memory-Spiel
        startGame(theme); // Starte das Memory-Spiel
      });
    });

    function startGame(theme) {
      // Karten initialisieren
      memoryGame.innerHTML = "";
      cards = [];
      flippedCards = [];
      matches = 0;

      // Kartenbilder generieren
      const images = Array.from(
        { length: 10 },
        (_, i) => `pic/${theme}/${i + 1}.png`
      );
      const gameImages = [...images, ...images].sort(() => Math.random() - 0.5);

      //Karten erstellen
      gameImages.forEach((image, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;

        // Vorder- und Rückseite der Karte
        const front = document.createElement("div");
        front.classList.add("front");
        const back = document.createElement("div");
        back.classList.add("back");

        const img = document.createElement("img");
        img.src = image;
        back.appendChild(img);

        card.appendChild(front);
        card.appendChild(back);
        memoryGame.appendChild(card);

        // Karte speichern und klickbar machen
        cards.push(card);

        card.addEventListener("click", () => {
          if (!card.classList.contains("flip") && flippedCards.length < 2) {
            card.classList.add("flip");
            flippedCards.push(card);

            if (flippedCards.length === 2) {
              setTimeout(checkForMatch, 800);
            }
          }
        });
      });
    }
    //Diese Funktion wird immer dann aufgerufen, wenn zwei Karten umgedreht wurden für die überpfrüfung des Karten paars
    function checkForMatch() {
      const [first, second] = flippedCards;
      const firstImg = first.querySelector(".back img").src;
      const secondImg = second.querySelector(".back img").src;

      if (firstImg === secondImg) {
        matches++;
        if (matches === cards.length / 2) {
          displayWinner();
        }
      } else {
        first.classList.remove("flip");
        second.classList.remove("flip");
      }

      flippedCards = [];
    }
    //5s gewinnnachricht
    function displayWinner() {
      winnerMessage.classList.remove("hidden");
      setTimeout(() => {
        winnerMessage.classList.add("hidden");
      }, 5000);
    }
  });

  // Nachricht senden
  const contactForm = document.getElementById("contact-form");
  const userMessage = document.getElementById("user-message");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = userMessage.value.trim();
    if (message) {
      alert("Danke für deine Nachricht!");
      userMessage.value = "";
    } else {
      alert("Keine Nachricht zum Senden.");
    }
  });
})();
