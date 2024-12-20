const data = {
    quotes: [
        "Shreya you are my world.",
        "I live to be with you, Your the reason I have meaning to my life.",
        "Your my medicine, Your my everything. Your all I would ever need to be happy.",
        "To the girl, who showed me what true love is ❤️"
    ],
    images: ["./assets/pics/image4.jpeg", "./assets/pics/image3.jpeg"],
    musicTracks: ["./assets/music/NEFFEX - Numb.mp3", "./assets/music/Lady-Gaga-Bruno-Mars-Die-With-A-Smile.mp3"]
};

const sequence = [
    { type: "quote", index: 0 },
    { type: "image", index: 0, pairedQuoteIndex: 1 },
    { type: "image", index: 1, pairedQuoteIndex: 2 },
    { type: "quote", index: 3 },
    { type: "giftCard" }
];

let currentSequenceIndex = 0;
let currentMusicIndex = 0; // Tracks the current music index

// References to DOM elements
const quoteEl = document.getElementById('quote');
const imageEl = document.getElementById('imageContent');
const musicPlayer = document.getElementById('musicPlayer');
const giftCardEl = document.getElementById('giftCard');
const bookPageEl = document.getElementById('bookPage');

// Set and play the initial music track
musicPlayer.src = data.musicTracks[currentMusicIndex];
musicPlayer.play();

function renderNext() {
    if (currentSequenceIndex >= sequence.length) return;

    const item = sequence[currentSequenceIndex];

    if (item.type === "quote") {
        quoteEl.style.opacity = 0;
        setTimeout(() => {
            quoteEl.innerText = data.quotes[item.index];
            quoteEl.style.opacity = 1;
        }, 5000);
        imageEl.style.opacity = 0; // Ensure the image fades out
    } else if (item.type === "image") {
        imageEl.style.opacity = 0;
        quoteEl.style.opacity = 0;
        setTimeout(() => {
            imageEl.src = data.images[item.index];
            imageEl.style.opacity = 1;
            if (item.pairedQuoteIndex !== undefined) {
                quoteEl.innerText = data.quotes[item.pairedQuoteIndex];
                quoteEl.style.opacity = 1;
            }
        }, 5000);
    } else if (item.type === "giftCard") {
        setTimeout(() => {
            quoteEl.style.opacity = 0; // Ensure quote fades out before gift card
            showGiftCard();
        }, 5000);
    }

    currentSequenceIndex++;
    if (currentSequenceIndex < sequence.length) {
        setTimeout(renderNext, 10000);
    }
}

// Function to display the gift card
function showGiftCard() {
    giftCardEl.style.display = 'block';
}

// Function to open the gift card and reveal the book page
function openCard() {
    giftCardEl.style.display = 'none'; // Hide the gift card
    bookPageEl.style.display = 'block'; // Display the book page
}

// Function to change the music track
function changeTrack() {
    currentMusicIndex = (currentMusicIndex + 1) % data.musicTracks.length; // Move to the next track
    musicPlayer.src = data.musicTracks[currentMusicIndex]; // Update the music source
    musicPlayer.play(); // Play the new track
}

// Start the content rendering process
renderNext();
