const flashcard = document.getElementById('flashcard');
const cardFront = document.getElementById('card-front');
const cardBack = document.getElementById('card-back');
const flipButton = document.getElementById('flip-button');
const nextButton = document.getElementById('next-button');

let cards = [
    { word: 'Test Card 1', description: 'Test Description 1', topic: '1' },
    { word: 'Test Card 2', description: 'Test Description 2', topic: '2' },
    { word: 'Test Card 3', description: 'Test Description 3', topic: '2' },
    { word: 'What colour is an orange', description: 'Orange', topic: '1' }
];

let currentCards = cards;

function showCard(index) {
    if (currentCards.length > 0) {
        cardFront.textContent = currentCards[index].word;
        cardBack.textContent = currentCards[index].description;
        flashcard.classList.remove('flipped');
    }
}

function showRandomCard() {
    if (currentCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * currentCards.length);
        showCard(randomIndex);
    } else {
        cardFront.textContent = 'No cards have been added for this topic.';
        cardBack.textContent = '';
    }
}

// Flip functionality
flipButton.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
});

// Next button functionality
nextButton.addEventListener('click', () => {
    showRandomCard();
});

// Topic buttons
const topicButtons = document.querySelectorAll('.topic-button');



// Filter cards by selected topics
topicButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedTopic = button.getAttribute('data-topic');

        if (selectedTopic === 'all') {
            // Clear all other selections
            topicButtons.forEach(btn => {
                if (btn !== button) {
                    btn.classList.remove('selected-topic');
                }
            });
            currentCards = cards; // Show all cards
        } else {
            // Toggle the selected class for non-"All" buttons
            button.classList.toggle('selected-topic');

            // Get the currently selected topics
            const selectedTopics = Array.from(topicButtons)
                .filter(btn => btn.classList.contains('selected-topic'))
                .map(btn => btn.getAttribute('data-topic'));

            if (selectedTopics.length === 0) {
                currentCards = cards; // Show all cards if no topics are selected
            } else {
                // Filter cards by selected topics
                currentCards = cards.filter(card => selectedTopics.includes(card.topic));
            }
        }

        showRandomCard();
    });
});

// Initialize with the first card
showRandomCard();

let timerInterval;
let seconds = 0;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

function updateTimer() {
    seconds++;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    timerDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

startButton.addEventListener('click', () => {
    if (!timerInterval) { // Only start a new interval if one isn't already running
        timerInterval = setInterval(updateTimer, 1000);
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null; // Reset the interval variable
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null; // Reset the interval variable
    seconds = 0; // Reset seconds
    timerDisplay.textContent = '00:00:00'; // Reset display
});
