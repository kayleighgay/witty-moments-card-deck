// Sample deck data by category
const deckByCategory = {
  "bring-best": [
  './images/bring-best/bring-best-1.jpeg',
  './images/bring-best/bring-best-2.jpeg',
  './images/bring-best/bring-best-3.jpeg',
  './images/bring-best/bring-best-4.jpeg',
  './images/bring-best/bring-best-5.jpeg'
  ],
  "experiment": [
  './images/experiment/experiment-1.jpeg',
  './images/experiment/experiment-2.jpeg',
  './images/experiment/experiment-3.jpeg',
  './images/experiment/experiment-4.jpeg',
  './images/experiment/experiment-5.jpeg'
  ],
  "make-contact": [
  './images/make-contact/make-contact-1.jpeg',
  './images/make-contact/make-contact-2.jpeg',
  './images/make-contact/make-contact-3.jpeg',
  './images/make-contact/make-contact-4.jpeg',
  './images/make-contact/make-contact-5.jpeg',
  './images/make-contact/make-contact-6.jpeg'
  ],
  "mission-impact": [
  './images/mission-impact/mission-impact-1.jpeg',
  './images/mission-impact/mission-impact-2.jpeg',
  './images/mission-impact/mission-impact-3.jpeg',
  './images/mission-impact/mission-impact-4.jpeg',
  './images/mission-impact/mission-impact-5.jpeg',
  './images/mission-impact/mission-impact-6.jpeg',
  './images/mission-impact/mission-impact-7.jpeg'
  ],
  "think-big": [
  './images/think-big/think-big-1.jpeg',
  './images/think-big/think-big-2.jpeg',
  './images/think-big/think-big-3.jpeg',
  './images/think-big/think-big-4.jpeg',
  './images/think-big/think-big-5.jpeg',
  './images/think-big/think-big-6.jpeg',
  './images/think-big/think-big-7.jpeg',
  './images/think-big/think-big-8.jpeg',
  './images/think-big/think-big-9.jpeg'
  ],
  "value-progress": [
  './images/value-progress/value-progress-1.jpeg',
  './images/value-progress/value-progress-2.jpeg',
  './images/value-progress/value-progress-3.jpeg',
  './images/value-progress/value-progress-4.jpeg',
  './images/value-progress/value-progress-5.jpeg'
  ]
  };

// Template backgrounds for custom cards by category
const templates = {
  "bring-best": './images/templates/bring-best-template.jpeg',
  "experiment": './images/templates/experiment-template.jpeg',
  "make-contact": './images/templates/make-contact-template.jpeg',
  "mission-impact": './images/templates/mission-impact-template.jpeg',
  "think-big": './images/templates/think-big-template.jpeg',
  "value-progress": './images/templates/value-progress-template.jpeg'
};

// Load custom cards from local storage (if any)
let customCards = JSON.parse(localStorage.getItem('customCards')) || {};

// Function to update the deck based on selected categories
function updateDeck() {
  const selectedCategories = Array.from(document.querySelectorAll('.category:checked')).map(checkbox => checkbox.value);
  let deck = [];

  selectedCategories.forEach(category => {
    if (deckByCategory[category]) {
      deck = deck.concat(deckByCategory[category]);
    }
    if (customCards[category]) {
      deck = deck.concat(customCards[category]);
    }
  });

  renderDeck(deck);
  // Clear the selected card container
  const selectedCardContainer = document.getElementById('selected-card-container');
  selectedCardContainer.innerHTML = '';
}

// Function to render the deck of cards based on selected categories
function renderDeck(deck) {
  const container = document.getElementById('deck-container');
  container.innerHTML = ''; // Clear the container

  if (deck.length === 0) {
    return;
  }

  deck.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.style.backgroundImage = `url(${card.template || card})`; // Display the correct background (template for custom cards)

    const textElement = document.createElement('div');
    textElement.className = 'card-text';
    if (card.text) {
      textElement.textContent = card.text; // Display text if provided
    }

    // Ensure white text for "Make Contact with Reality" cards
    if (card.category === "make-contact") {
      textElement.style.color = "white";
    } else {
      textElement.style.color = "black";
    }

    cardElement.appendChild(textElement);
    cardElement.onclick = () => selectCard(card);

    // Add delete button for custom cards only
    if (customCards[card.category]?.some(c => c.text === card.text)) {
      const deleteButton = document.createElement('div');
      deleteButton.className = 'delete-button';
      deleteButton.textContent = '×';
      deleteButton.onclick = (event) => {
        event.stopPropagation();
        deleteCard(card);
      };
      cardElement.appendChild(deleteButton);
    }

    container.appendChild(cardElement);
  });
}

// Function to select a card (display it in a larger view)
function selectCard(card) {
  const selectedCardContainer = document.getElementById('selected-card-container');
  selectedCardContainer.innerHTML = ''; // Clear any previously selected card

  const selectedCardElement = document.createElement('div');
  selectedCardElement.className = 'selected-card';
  selectedCardElement.style.backgroundImage = `url(${card.template || card})`; // Display the correct background

  const textElement = document.createElement('div');
  textElement.className = 'card-text';
  if (card.text) {
    textElement.textContent = card.text; // Display text if provided
  }

  // Ensure white text for "Make Contact with Reality" when selected
  if (card.category === "make-contact") {
    textElement.style.color = "white";
  } else {
    textElement.style.color = "black";
  }

  selectedCardElement.appendChild(textElement);
  selectedCardContainer.appendChild(selectedCardElement); // Display enlarged card
}

// Function to shuffle the deck and show a random card
function shuffleAndSelect() {
  const selectedCategories = Array.from(document.querySelectorAll('.category:checked')).map(checkbox => checkbox.value);
  let deck = [];
  selectedCategories.forEach(category => {
    deck = deck.concat(deckByCategory[category] || []);
    deck = deck.concat(customCards[category] || []);
  });

  if (deck.length === 0) {
    alert("No cards available. Please select a category.");
    return;
  }

  const selectedCardContainer = document.getElementById('selected-card-container');
  const container = document.getElementById('deck-container');

  // **Clear the selected card immediately when shuffle starts:**
  selectedCardContainer.innerHTML = ''; // Removes the selected card instantly

  container.innerHTML = ''; // Clear any previous deck display

  // Shuffle the deck using Fisher-Yates
  const shuffledDeck = deck.sort(() => Math.random() - 0.5);

  shuffledDeck.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card shuffling'; // Add shuffling class for animation
    cardElement.style.backgroundImage = `url(${card.template || card})`;

    // **Set the shuffled cards to the same size and position as selected card:**
    cardElement.style.width = '240px';
    cardElement.style.height = '360px';
    cardElement.style.position = 'absolute'; // Center in the same place as selected card
    cardElement.style.top = `${selectedCardContainer.offsetTop}px`;
    cardElement.style.left = `${selectedCardContainer.offsetLeft}px`;
    cardElement.style.transform = 'translate(-50%, -50%)'; // Ensure it's centered

    const textElement = document.createElement('div');
    textElement.className = 'card-text';
    textElement.textContent = card.text || ''; // Remove "Default Text"

    cardElement.appendChild(textElement);
    container.appendChild(cardElement);
  });

  // After the shuffle animation, display the final selected card:
  setTimeout(() => {
    container.innerHTML = ''; // Clear the shuffled cards
    const selectedCard = shuffledDeck[0];
    const selectedCardElement = document.createElement('div');
    selectedCardElement.className = 'selected-card';
    selectedCardElement.style.backgroundImage = `url(${selectedCard})`;

    const textElement = document.createElement('div');
    textElement.className = 'card-text';
    textElement.textContent = selectedCard.text || ''; // Remove "Default Text"

    selectedCardElement.appendChild(textElement);
    selectedCardContainer.appendChild(selectedCardElement);
  }, 1000); // Animation duration is 1 second
}

// Function to toggle the "Select All" checkbox
function toggleSelectAll() {
  const checkboxes = document.querySelectorAll('.category');
  const isChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);

  checkboxes.forEach(checkbox => {
    checkbox.checked = !isChecked;
  });

  updateDeck();
}

// Function to add a new custom card
function addNewCard() {
  const category = document.getElementById('new-category').value;
  const text = document.getElementById('new-card-text').value.trim();

  if (!text) {
    alert('Please enter text for the card.');
    return;
  }

  const newCard = { text, template: templates[category], category }; // Assign template background to the new card
  customCards[category] = customCards[category] || [];
  customCards[category].push(newCard);

  localStorage.setItem('customCards', JSON.stringify(customCards));

  updateDeck();
  document.getElementById('submission-feedback').textContent = 'Card added!';
  setTimeout(() => {
    document.getElementById('submission-feedback').textContent = '';
  }, 2000);
}

// Function to delete a custom card
function deleteCard(card) {
  const category = Object.keys(customCards).find(cat =>
    customCards[cat]?.some(c => c.text === card.text)
  );

  if (category) {
    customCards[category] = customCards[category].filter(c => c.text !== card.text);
    localStorage.setItem('customCards', JSON.stringify(customCards));
    updateDeck();
  }
}

// When clicking on "The Deck", hide the add-card-section and show the category-selection
document.querySelector('a[href="#deck"]').addEventListener('click', function(event) {
  event.preventDefault();

  const addCardSection = document.querySelector('.add-card-section');
  const categorySelection = document.querySelector('.category-selection');
  const deckContainer = document.getElementById('deck-container');
  const shuffleButtonImage = document.getElementById('shuffle-button-image');

  addCardSection.style.display = 'none';
  categorySelection.style.display = 'block';
  deckContainer.style.display = 'flex';  // Show the deck of cards
  shuffleButtonImage.style.display = 'block';  // Show the shuffle button
});

// When clicking on "My Cards", hide the category-selection and show the add-card-section
document.querySelector('a[href="#my-cards"]').addEventListener('click', function(event) {
  event.preventDefault();

  const categorySelection = document.querySelector('.category-selection');
  const addCardSection = document.querySelector('.add-card-section');
  const deckContainer = document.getElementById('deck-container');
  const shuffleButtonImage = document.getElementById('shuffle-button-image');

  categorySelection.style.display = 'none';
  addCardSection.style.display = 'block';
  deckContainer.style.display = 'none';  // Hide the deck of cards
  shuffleButtonImage.style.display = 'none';  // Hide the shuffle button
});
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('.category-selection').style.display = 'none'; 
  document.getElementById('select-all-button').style.display = 'none';
  document.getElementById('shuffle-button-image').style.display = 'none'; 
  document.getElementById('deck-container').style.display = 'none'; 
  document.getElementById('selected-card-container').style.display = 'none'; 
  document.querySelector('.add-card-section').style.display = 'none';

  const leftColumn = document.querySelector('.left-column');
  const rightColumn = document.querySelector('.right-column');

  // Add image to right column
  const wittyImage = document.createElement('img');
  wittyImage.src = './images/witty-hands.jpeg';
  wittyImage.alt = 'WIT(ty) Hands';
  wittyImage.style.display = 'none'; 
  wittyImage.style.width = '100%'; 
  wittyImage.style.borderRadius = '8px'; 
  rightColumn.appendChild(wittyImage);

  const homeSection = document.createElement('div');
  homeSection.id = 'home-section'; 
  homeSection.style.textAlign = 'center'; 
  homeSection.innerHTML = `
  <p style="color: white; font-size: 0.9rem; line-height: 1.4; margin-top: 20px;">
 WIT(ty) Cards are a deck of prompts that bring "Whatever It Takes" into your work.<br><br>
 Each card sparks bold ideas, encourages reflection, and guides evidence-based decisions—helping you stay focused, adapt to challenges, and drive meaningful progress.<br><br>
 Draw a card, take action, and do whatever it takes to achieve our missions!
</p>
   <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
     <!-- How-to-guide button (yellow background) -->
     <button id="learn-button" style="background-color: #FBB531; color: black; padding: 8px 16px; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; width: 160px;">
       How-to-guide 
       <span style="margin-left: 10px;">&#9654;</span> <!-- Right-facing triangle -->
     </button>

     <!-- Launch button (red background, white text, and flashing animation) -->
     <button id="launch-button" style="background-color: #E91C3D; color: white; padding: 12px 24px; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.2rem; font-weight: bold; text-transform: uppercase; width: 220px; animation: flash 1s infinite;">
       LAUNCH
       <span style="margin-left: 10px;">&#9654;</span> <!-- Right-facing triangle -->
     </button>
   </div>

   <style>
     /* Flashing animation for the launch button */
     @keyframes flash {
       0%, 100% {
         background-color: #E91C3D; /* Red */
       }
       50% {
         background-color: #FF5C5C; /* Lighter red during flash */
       }
     }
   </style>
 `;


  leftColumn.appendChild(homeSection);

  document.getElementById('learn-button').addEventListener('click', function() {
    alert('Learn more about the deck and how to use it!');
  });

  // Launch button: Show deck view and hide image (if coming from the homepage)
  document.getElementById('launch-button').addEventListener('click', function() {
    // If already on homepage, simulate "The Deck" click and hide image
    document.querySelector('a[href="#deck"]').click(); // Simulate "The Deck" button click
    wittyImage.style.display = 'none'; // Ensure image is hidden when viewing the deck
  });

  // Home button: Show homepage content and witty image
  document.querySelector('a[href="#home"]').addEventListener('click', function(event) {
    event.preventDefault(); 
    document.querySelector('.category-selection').style.display = 'none'; 
    document.getElementById('select-all-button').style.display = 'none'; 
    document.getElementById('shuffle-button-image').style.display = 'none'; 
    document.getElementById('deck-container').style.display = 'none'; 
    document.getElementById('selected-card-container').style.display = 'none'; 
    document.querySelector('.add-card-section').style.display = 'none'; 
    homeSection.style.display = 'block'; 
    wittyImage.style.display = 'block'; // Show image on home
  });

  // "The Deck" button: Show the deck and hide the image
  document.querySelector('a[href="#deck"]').addEventListener('click', function(event) {
    event.preventDefault(); 
    document.querySelector('.category-selection').style.display = 'block'; 
    document.getElementById('select-all-button').style.display = 'block'; 
    document.getElementById('shuffle-button-image').style.display = 'block'; 
    document.getElementById('deck-container').style.display = 'flex'; 
    document.getElementById('selected-card-container').style.display = 'block'; 
    document.querySelector('.add-card-section').style.display = 'none'; 
    homeSection.style.display = 'none'; 
    wittyImage.style.display = 'none'; // Hide image on "The Deck"
  });

  // "My Cards" button: Show add card form and hide the image
  document.querySelector('a[href="#my-cards"]').addEventListener('click', function(event) {
    event.preventDefault(); 
    document.querySelector('.category-selection').style.display = 'none'; 
    document.getElementById('select-all-button').style.display = 'none'; 
    document.getElementById('shuffle-button-image').style.display = 'none'; 
    document.getElementById('deck-container').style.display = 'none'; 
    document.getElementById('selected-card-container').style.display = 'none'; 
    document.querySelector('.add-card-section').style.display = 'block'; 
    homeSection.style.display = 'none'; 
    wittyImage.style.display = 'none'; // Hide image on "My Cards"
  });

  // Ensure the image is displayed upon page load (homepage by default)
  wittyImage.style.display = 'block'; // Show image on homepage when page loads
  homeSection.style.display = 'block'; // Ensure homepage content is visible on load
});
document.addEventListener("DOMContentLoaded", function() {
  // Existing code with other event listeners (e.g., home, deck, my-cards)...

  // Add Feedback button event listener
  document.querySelector('a[href="#feedback"]').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor link behavior
    window.open('https://docs.google.com/spreadsheets/d/1NUWrpipdw50H7pwGy-7G4YQMdgFk8pC26h2d0pZtoN8/edit?usp=sharing', '_blank'); // Open feedback form in a new tab
  });
});
// Function to render the gallery view
function renderGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  galleryGrid.innerHTML = ''; // Clear existing cards

  // Render permanent cards with specific backgrounds
  permanentDecks.forEach(deck => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    if (galleryCardBackgrounds[deck.title]) {
      card.style.backgroundImage = `url(${galleryCardBackgrounds[deck.title]})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';
    }

    card.innerHTML = `<div class="gallery-card-title">${deck.title}</div>`;
    card.onclick = () => viewDeck(deck.title);
    galleryGrid.appendChild(card);
  });

  // Retrieve dynamic cards from localStorage
  const decks = JSON.parse(localStorage.getItem('decks')) || [];

  decks.forEach(deck => {
    if (!deck.title) {
      console.log('Skipping invalid deck with no title:', deck);
      return;
    }

    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `<div class="gallery-card-title">${deck.title}</div>`;
    card.onclick = () => viewDeck(deck.title);
    galleryGrid.appendChild(card);
  });

  const addPageCard = document.createElement('div');
  addPageCard.className = 'gallery-card add-page';
  addPageCard.textContent = '+ New page';
  addPageCard.onclick = addNewPage;
  galleryGrid.appendChild(addPageCard);
}

// Function to add a new page
function addNewPage() {
  const newTitle = prompt('Enter a title for the new deck:', 'New Deck');
  if (!newTitle) return;

  const decks = JSON.parse(localStorage.getItem('decks')) || [];
  decks.push({ title: newTitle });
  localStorage.setItem('decks', JSON.stringify(decks));

  renderGallery(); // Re-render the gallery
}

// Show "My Decks" and hide other sections
document.querySelector('a[href="#my-decks"]').addEventListener('click', function(event) {
  event.preventDefault();

  // Hide other sections
  document.querySelector('.left-column').style.display = 'none';
  document.querySelector('.right-column').style.display = 'none';
  document.querySelector('.category-selection').style.display = 'none';
  document.querySelector('.add-card-section').style.display = 'none';
  document.getElementById('deck-container').style.display = 'none';
  document.getElementById('selected-card-container').style.display = 'none';

  // Show the gallery
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.style.display = 'block';

  renderGallery(); // Render the gallery cards
});
// Permanent gallery cards
const permanentDecks = [
  { title: 'Master Deck' },
  { title: 'Ideation' },
  { title: 'Delivery' },
  { title: 'Review' }
];

// Function to render the gallery view
// Backgrounds for gallery cards
const galleryCardBackgrounds = {
  "Master Deck": "images/master-deck.jpeg",
  "Ideation": "images/ideation-delivery.jpeg",
  "Delivery": "images/delivery.jpeg",
  "Review": "images/review-reflect.jpeg"
};


function renderGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  galleryGrid.innerHTML = ''; // Clear existing cards

  // Render permanent cards with specific backgrounds
  permanentDecks.forEach(deck => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    // Set the background image for permanent cards
    if (galleryCardBackgrounds[deck.title]) {
      card.style.backgroundImage = `url(${galleryCardBackgrounds[deck.title]})`;
      card.style.backgroundSize = 'cover'; // Ensure image covers the card
      card.style.backgroundPosition = 'center'; // Centre the background image
    }

    // Add the title overlay for readability
    card.innerHTML = `<div class="gallery-card-title">${deck.title}</div>`;

    // Add click behaviour for the card
    if (deck.title === 'Master Deck') {
      card.onclick = viewMasterDeck;
    } else {
      card.onclick = () => alert(`Feature for ${deck.title} is not implemented yet.`);
    }

    galleryGrid.appendChild(card);
  });

  // Retrieve dynamic cards from localStorage
  const decks = JSON.parse(localStorage.getItem('decks')) || [];

  // Render dynamic cards
  decks.forEach(deck => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `<div class="gallery-card-title">${deck.title}</div>`;
    galleryGrid.appendChild(card);
  });

  // Add the "Add Page" card
  const addPageCard = document.createElement('div');
  addPageCard.className = 'gallery-card add-page';
  addPageCard.textContent = '+ New page';
  addPageCard.onclick = addNewPage;
  galleryGrid.appendChild(addPageCard);
}


// Function to add a new page
function addNewPage() {
  const newTitle = prompt('Enter a title for the new deck:', 'New Deck');
  if (!newTitle) return;

  const decks = JSON.parse(localStorage.getItem('decks')) || [];
  decks.push({ title: newTitle });
  localStorage.setItem('decks', JSON.stringify(decks));

  renderGallery(); // Re-render the gallery
}

// Show "My Decks" and hide other sections
document.querySelector('a[href="#my-decks"]').addEventListener('click', function(event) {
  event.preventDefault();

  // Hide other sections
  document.querySelector('.left-column').style.display = 'none';
  document.querySelector('.right-column').style.display = 'none';
  document.querySelector('.category-selection').style.display = 'none';
  document.querySelector('.add-card-section').style.display = 'none';
  document.getElementById('deck-container').style.display = 'none';
  document.getElementById('selected-card-container').style.display = 'none';

  // Show the gallery
  const galleryContainer = document.getElementById('gallery-container');
  galleryContainer.style.display = 'block';

  renderGallery(); // Render the gallery cards
});
// Function to render all cards in the Master Deck
function viewMasterDeck() {
  const allCards = []; // Collect all predefined and custom cards

  // Add predefined cards to the Master Deck
  Object.keys(deckByCategory).forEach(category => {
    allCards.push(...deckByCategory[category]);
  });

  // Add custom cards from localStorage to the Master Deck
  Object.keys(customCards).forEach(category => {
    if (customCards[category]) {
      customCards[category].forEach(card => {
        allCards.push({
          text: card.text,
          category: category,
          template: `./images/templates/${category}-template.jpeg`, // Use optional template
        });
      });
    }
  });

  // Hide the gallery view and display the Master Deck container
  document.getElementById('gallery-container').style.display = 'none';
  document.getElementById('full-page-container').style.display = 'block'; // Show the full-page container

  // Clear and render Master Deck content inside the container
  const container = document.querySelector('#full-page-container .container');
  container.innerHTML = ''; // Clear previous content

  allCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.style.backgroundImage = `url(${card.template || card})`; // Use template or default background
    cardElement.style.width = '200px'; // Adjust width for visual consistency
    cardElement.style.height = '300px'; // Adjust height for visual consistency
    cardElement.style.margin = '10px'; // Add spacing around cards

    const textElement = document.createElement('div');
    textElement.className = 'card-text';

    cardElement.appendChild(textElement);
    container.appendChild(cardElement);
  });
}

  document.addEventListener('DOMContentLoaded', function () {
    // Find the "Master Deck" gallery card
    const galleryGrid = document.getElementById('gallery-grid');
    const masterDeckCard = Array.from(galleryGrid.children).find(
      card => card.textContent.trim() === 'Master Deck'
    );
  
    // Attach click event to the Master Deck card
    if (masterDeckCard) {
      masterDeckCard.addEventListener('click', viewMasterDeck);
    }
  });
  

  function viewDeck(deckTitle) {
    const allCards = [];
  
    // Add cards based on deck title
    if (deckTitle === 'Master Deck') {
      // Collect all predefined and custom cards
      Object.keys(deckByCategory).forEach(category => {
        allCards.push(...deckByCategory[category]);
      });
  
      // Add custom cards stored in localStorage
      Object.keys(customCards).forEach(category => {
        customCards[category].forEach(card => {
          allCards.push({
            text: card.text,
            category: category,
            template: `./images/templates/${category}-template.jpeg`
          });
        });
      });
    } else if (deckTitle === 'Ideation') {
      // Specific cards for Ideation
      allCards.push(
        './images/think-big/think-big-1.jpeg',
        './images/think-big/think-big-2.jpeg',
        './images/think-big/think-big-3.jpeg',
        './images/think-big/think-big-4.jpeg',
        './images/think-big/think-big-8.jpeg',
        './images/make-contact/make-contact-1.jpeg',
        './images/make-contact/make-contact-4.jpeg',
        './images/experiment/experiment-1.jpeg'
      );
    } else if (deckTitle === 'Delivery') {
      // Specific cards for Delivery
      allCards.push(
        './images/mission-impact/mission-impact-1.jpeg',
        './images/mission-impact/mission-impact-2.jpeg',
        './images/mission-impact/mission-impact-3.jpeg',
        './images/mission-impact/mission-impact-4.jpeg',
        './images/mission-impact/mission-impact-5.jpeg',
        './images/mission-impact/mission-impact-6.jpeg',
        './images/mission-impact/mission-impact-7.jpeg',
        './images/think-big/think-big-5.jpeg',
        './images/think-big/think-big-6.jpeg',
        './images/think-big/think-big-8.jpeg',
        './images/think-big/think-big-9.jpeg',
        './images/make-contact/make-contact-3.jpeg',
        './images/make-contact/make-contact-5.jpeg',
        './images/make-contact/make-contact-6.jpeg',
        './images/bring-best/bring-best-1.jpeg',
        './images/bring-best/bring-best-2.jpeg',
        './images/bring-best/bring-best-3.jpeg',
        './images/bring-best/bring-best-4.jpeg',
        './images/experiment/experiment-1.jpeg',
        './images/experiment/experiment-2.jpeg',
        './images/experiment/experiment-4.jpeg',
        './images/experiment/experiment-5.jpeg',
        './images/value-progress/value-progress-1.jpeg',
        './images/value-progress/value-progress-2.jpeg',
        './images/value-progress/value-progress-3.jpeg',
        './images/value-progress/value-progress-4.jpeg'
      );
    } else if (deckTitle === 'Review') {
      // Specific cards for Review
      allCards.push(
        './images/mission-impact/mission-impact-1.jpeg',
        './images/mission-impact/mission-impact-2.jpeg',
        './images/mission-impact/mission-impact-3.jpeg',
        './images/mission-impact/mission-impact-5.jpeg',
        './images/mission-impact/mission-impact-7.jpeg',
        './images/think-big/think-big-6.jpeg',
        './images/think-big/think-big-7.jpeg',
        './images/make-contact/make-contact-2.jpeg',
        './images/make-contact/make-contact-3.jpeg',
        './images/make-contact/make-contact-6.jpeg',
        './images/bring-best/bring-best-2.jpeg',
        './images/bring-best/bring-best-5.jpeg',
        './images/experiment/experiment-3.jpeg',
        './images/experiment/experiment-5.jpeg',
        './images/value-progress/value-progress-3.jpeg',
        './images/value-progress/value-progress-5.jpeg'
      );
    } else {
      alert(`No cards found for ${deckTitle}.`);
      return;
    }
  
    // Hide the gallery and display the deck
    document.getElementById('gallery-container').style.display = 'none';
    document.getElementById('deck-container').style.display = 'flex';
    document.getElementById('shuffle-button-image').style.display = 'block';
  
    // Render all collected cards
    renderDeck(allCards);
  }
  
// Update the renderGallery function to add event listeners for permanent cards
// Function to render the gallery view with delete functionality for custom cards
function renderGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  galleryGrid.innerHTML = ''; // Clear existing cards

  // Render permanent cards with specific backgrounds
  permanentDecks.forEach(deck => {
    const card = document.createElement('div');
    card.className = 'gallery-card';

    // Set the background image for permanent cards
    if (galleryCardBackgrounds[deck.title]) {
      card.style.backgroundImage = `url(${galleryCardBackgrounds[deck.title]})`;
      card.style.backgroundSize = 'cover'; // Ensure image covers the card
      card.style.backgroundPosition = 'center'; // Centre the background image
    }

    // Add the title overlay for readability
    card.innerHTML = `<div class="gallery-card-title">${deck.title}</div>`;

    // Add click behaviour for the card
    if (deck.title === 'Master Deck') {
      card.onclick = viewMasterDeck;
    } else {
      function renderGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = ''; // Clear existing cards
      
        // Render permanent cards with specific backgrounds
        permanentDecks.forEach(deck => {
          const card = document.createElement('div');
          card.className = 'gallery-card';
      
          // Set the background image for permanent cards
          if (galleryCardBackgrounds[deck.title]) {
            card.style.backgroundImage = `url(${galleryCardBackgrounds[deck.title]})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
          }
      
          // Add the title overlay for readability
          card.innerHTML = `<div class="gallery-card-title">${deck.title}</div>`;
      
          // Attach click behaviour for the card
          card.onclick = () => viewDeck(deck.title); // Call viewDeck with the deck title
      
          galleryGrid.appendChild(card);
        });
      
        // Retrieve dynamic cards from localStorage
        const decks = JSON.parse(localStorage.getItem('decks')) || [];
      
        // Render dynamic cards
        decks.forEach(deck => {
          const card = document.createElement('div');
          card.className = 'gallery-card';
          card.innerHTML = `<div class="gallery-card-title">${deck.title}</div>`;
          card.onclick = () => viewDeck(deck.title); // Unified function
          galleryGrid.appendChild(card);
        });
      
        // Add the "Add Page" card
        const addPageCard = document.createElement('div');
        addPageCard.className = 'gallery-card add-page';
        addPageCard.textContent = '+ New page';
        addPageCard.onclick = addNewPage;
        galleryGrid.appendChild(addPageCard);
      }
          
    }

    galleryGrid.appendChild(card);
  });

  // Retrieve custom cards from localStorage
  const decks = JSON.parse(localStorage.getItem('decks')) || [];

  // Render dynamic cards with delete functionality
  decks.forEach((deck, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <div class="gallery-card-title">${deck.title}</div>
      <button class="delete-button">Delete</button>
    `;

    // Add delete functionality
    const deleteButton = card.querySelector('.delete-button');
    deleteButton.onclick = () => {
      // Remove the card from the decks array
      decks.splice(index, 1);

      // Update localStorage
      localStorage.setItem('decks', JSON.stringify(decks));

      // Re-render the gallery
      renderGallery();
    };

    galleryGrid.appendChild(card);
  });

  // Add the "Add Page" card
  const addPageCard = document.createElement('div');
  addPageCard.className = 'gallery-card add-page';
  addPageCard.textContent = '+ New page';
  addPageCard.onclick = addNewPage;
  galleryGrid.appendChild(addPageCard);
}

function viewDeck(deckTitle) {
  const allCards = [];

  // Add cards based on deck title
  if (deckTitle === 'Master Deck') {
    // Collect all predefined and custom cards
    Object.keys(deckByCategory).forEach(category => {
      allCards.push(...deckByCategory[category]);
    });

    // Add custom cards stored in localStorage
    Object.keys(customCards).forEach(category => {
      customCards[category].forEach(card => {
        allCards.push({
          text: card.text,
          category: category,
          template: `./images/templates/${category}-template.jpeg`
        });
      });
    });
  } else if (deckTitle === 'Ideation') {
    // Specific cards for Ideation
    allCards.push(
      './images/think-big/think-big-1.jpeg',
      './images/think-big/think-big-2.jpeg',
      './images/think-big/think-big-3.jpeg',
      './images/think-big/think-big-4.jpeg',
      './images/think-big/think-big-8.jpeg',
      './images/make-contact/make-contact-1.jpeg',
      './images/make-contact/make-contact-4.jpeg',
      './images/experiment/experiment-1.jpeg'
    );
  } else if (deckTitle === 'Delivery') {
    // Specific cards for Delivery
    allCards.push(
      './images/mission-impact/mission-impact-1.jpeg',
      './images/mission-impact/mission-impact-2.jpeg',
      './images/mission-impact/mission-impact-3.jpeg',
      './images/mission-impact/mission-impact-4.jpeg',
      './images/mission-impact/mission-impact-5.jpeg',
      './images/mission-impact/mission-impact-6.jpeg',
      './images/mission-impact/mission-impact-7.jpeg',
      './images/think-big/think-big-5.jpeg',
      './images/think-big/think-big-6.jpeg',
      './images/think-big/think-big-8.jpeg',
      './images/think-big/think-big-9.jpeg',
      './images/make-contact/make-contact-3.jpeg',
      './images/make-contact/make-contact-5.jpeg',
      './images/make-contact/make-contact-6.jpeg',
      './images/bring-best/bring-best-1.jpeg',
      './images/bring-best/bring-best-2.jpeg',
      './images/bring-best/bring-best-3.jpeg',
      './images/bring-best/bring-best-4.jpeg',
      './images/experiment/experiment-1.jpeg',
      './images/experiment/experiment-2.jpeg',
      './images/experiment/experiment-4.jpeg',
      './images/experiment/experiment-5.jpeg',
      './images/value-progress/value-progress-1.jpeg',
      './images/value-progress/value-progress-2.jpeg',
      './images/value-progress/value-progress-3.jpeg',
      './images/value-progress/value-progress-4.jpeg'
    );
  } else if (deckTitle === 'Review') {
    // Specific cards for Review
    allCards.push(
      './images/mission-impact/mission-impact-1.jpeg',
      './images/mission-impact/mission-impact-2.jpeg',
      './images/mission-impact/mission-impact-3.jpeg',
      './images/mission-impact/mission-impact-5.jpeg',
      './images/mission-impact/mission-impact-7.jpeg',
      './images/think-big/think-big-6.jpeg',
      './images/think-big/think-big-7.jpeg',
      './images/make-contact/make-contact-2.jpeg',
      './images/make-contact/make-contact-3.jpeg',
      './images/make-contact/make-contact-6.jpeg',
      './images/bring-best/bring-best-2.jpeg',
      './images/bring-best/bring-best-5.jpeg',
      './images/experiment/experiment-3.jpeg',
      './images/experiment/experiment-5.jpeg',
      './images/value-progress/value-progress-3.jpeg',
      './images/value-progress/value-progress-5.jpeg'
    );
  } else {
    alert(`No cards found for ${deckTitle}.`);
    return;
  }

  // Hide the gallery and display the deck
  document.getElementById('gallery-container').style.display = 'none';
  document.getElementById('deck-container').style.display = 'flex';
  document.getElementById('shuffle-button-image').style.display = 'block';

  // Render all collected cards
  renderDeck(allCards);
}

// Function to view the Master Deck and display the full-page container
function viewMasterDeck() {
  const allCards = []; // Collect all predefined and custom cards

  // Add predefined cards to the Master Deck
  Object.keys(deckByCategory).forEach(category => {
    allCards.push(...deckByCategory[category]);
  });

  // Add custom cards from localStorage to the Master Deck
  Object.keys(customCards).forEach(category => {
    if (customCards[category]) {
      customCards[category].forEach(card => {
        allCards.push({
          text: card.text,
          category: category,
          template: `./images/templates/${category}-template.jpeg`, // Use optional template
        });
      });
    }
  });

  // Hide the gallery view and display the Master Deck container
  document.getElementById('gallery-container').style.display = 'none';
  document.getElementById('full-page-container').style.display = 'block'; // Show the full-page container

  // Clear and render Master Deck content inside the container
  const container = document.querySelector('#full-page-container .container');
  container.innerHTML = ''; // Clear previous content

  allCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.style.backgroundImage = `url(${card.template || card})`; // Use template or default background
    cardElement.style.width = '200px'; // Adjust width for visual consistency
    cardElement.style.height = '300px'; // Adjust height for visual consistency
    cardElement.style.margin = '10px'; // Add spacing around cards

    const textElement = document.createElement('div');
    textElement.className = 'card-text';

    cardElement.appendChild(textElement);
    container.appendChild(cardElement);
  });
}

// Attach the viewMasterDeck function to the "Master Deck" card in the gallery
document.addEventListener('DOMContentLoaded', function () {
  const galleryGrid = document.getElementById('gallery-grid');
  const masterDeckCard = Array.from(galleryGrid.children).find(
    card => card.textContent.trim() === 'Master Deck'
  );

  if (masterDeckCard) {
    masterDeckCard.addEventListener('click', viewMasterDeck);
  }
});
// Add functionality to the "Return" button
document.addEventListener('DOMContentLoaded', function () {
  const returnButton = document.getElementById('return-button');

  // Show "My Decks" and hide the Master Deck when clicked
  returnButton.addEventListener('click', function () {
    // Hide the Master Deck view
    document.getElementById('full-page-container').style.display = 'none';

    // Show the gallery view
    document.getElementById('gallery-container').style.display = 'block';
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const returnButton = document.getElementById('return-button');

  // Show "My Decks" and hide the Master Deck when clicked
  returnButton.addEventListener('click', function () {
    // Hide the Master Deck view
    document.getElementById('full-page-container').style.display = 'none';

    // Show the gallery view
    document.getElementById('gallery-container').style.display = 'block';
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const galleryGrid = document.getElementById('gallery-grid');
  const returnButton = document.getElementById('return-button');

  // Attach click handlers to the gallery cards
  galleryGrid.addEventListener('click', function (event) {
    const cardTitle = event.target.closest('.gallery-card')?.querySelector('.gallery-card-title')?.textContent.trim();

    if (cardTitle === 'Master Deck') {
      viewDeck('Master Deck');
    } else if (cardTitle === 'Ideation') {
      viewDeck('Ideation');
    } else if (cardTitle === 'Delivery') {
      viewDeck('Delivery');
    } else if (cardTitle === 'Review') {
      viewDeck('Review');
    }
  });

  // Return button functionality
  returnButton.addEventListener('click', function () {
    document.getElementById('full-page-container').style.display = 'none';
    document.getElementById('gallery-container').style.display = 'block';
  });
});

// Function to render the selected deck
function viewDeck(deckTitle) {
  const allCards = [];

  if (deckTitle === 'Master Deck') {
    // Include all cards for Master Deck
    Object.keys(deckByCategory).forEach(category => {
      allCards.push(...deckByCategory[category]);
    });
    Object.keys(customCards).forEach(category => {
      allCards.push(...customCards[category]);
    });
  } else if (deckTitle === 'Ideation') {
    // Include specific cards for Ideation
    allCards.push(
      './images/think-big/think-big-1.jpeg',
      './images/think-big/think-big-2.jpeg',
      './images/think-big/think-big-3.jpeg',
      './images/think-big/think-big-4.jpeg',
      './images/think-big/think-big-8.jpeg',
      './images/make-contact/make-contact-1.jpeg',
      './images/make-contact/make-contact-4.jpeg',
      './images/experiment/experiment-1.jpeg'
    );
  } else if (deckTitle === 'Delivery') {
    // Include specific cards for Delivery
    allCards.push(
      './images/mission-impact/mission-impact-1.jpeg',
      './images/mission-impact/mission-impact-2.jpeg',
      './images/mission-impact/mission-impact-3.jpeg',
      './images/mission-impact/mission-impact-4.jpeg',
      './images/mission-impact/mission-impact-5.jpeg',
      './images/mission-impact/mission-impact-6.jpeg',
      './images/mission-impact/mission-impact-7.jpeg',
      './images/think-big/think-big-5.jpeg',
      './images/think-big/think-big-6.jpeg',
      './images/think-big/think-big-8.jpeg',
      './images/think-big/think-big-9.jpeg',
      './images/make-contact/make-contact-3.jpeg',
      './images/make-contact/make-contact-5.jpeg',
      './images/make-contact/make-contact-6.jpeg',
      './images/bring-best/bring-best-1.jpeg',
      './images/bring-best/bring-best-2.jpeg',
      './images/bring-best/bring-best-3.jpeg',
      './images/bring-best/bring-best-4.jpeg',
      './images/experiment/experiment-1.jpeg',
      './images/experiment/experiment-2.jpeg',
      './images/experiment/experiment-4.jpeg',
      './images/experiment/experiment-5.jpeg',
      './images/value-progress/value-progress-1.jpeg',
      './images/value-progress/value-progress-2.jpeg',
      './images/value-progress/value-progress-3.jpeg',
      './images/value-progress/value-progress-4.jpeg'
    );
  } else if (deckTitle === 'Review') {
    // Include specific cards for Review
    allCards.push(
      './images/mission-impact/mission-impact-1.jpeg',
      './images/mission-impact/mission-impact-2.jpeg',
      './images/mission-impact/mission-impact-3.jpeg',
      './images/mission-impact/mission-impact-5.jpeg',
      './images/mission-impact/mission-impact-7.jpeg',
      './images/think-big/think-big-6.jpeg',
      './images/think-big/think-big-7.jpeg',
      './images/make-contact/make-contact-2.jpeg',
      './images/make-contact/make-contact-3.jpeg',
      './images/make-contact/make-contact-6.jpeg',
      './images/bring-best/bring-best-2.jpeg',
      './images/bring-best/bring-best-5.jpeg',
      './images/experiment/experiment-3.jpeg',
      './images/experiment/experiment-5.jpeg',
      './images/value-progress/value-progress-3.jpeg',
      './images/value-progress/value-progress-5.jpeg'
    );
  }

  // Hide gallery and show full-page container
  document.getElementById('gallery-container').style.display = 'none';
  document.getElementById('full-page-container').style.display = 'block';

  // Update title dynamically
  const deckTitleElement = document.getElementById('deck-title');
  deckTitleElement.textContent = `${deckTitle} Deck`;

  // Clear and render deck content
  const container = document.querySelector('#full-page-container .container');
  container.innerHTML = ''; // Clear any existing cards

  allCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.style.backgroundImage = `url(${card})`;
    cardElement.style.width = '200px';
    cardElement.style.height = '300px';
    cardElement.style.margin = '10px';

    container.appendChild(cardElement);
  });
}
function handleDeckChange() {
  const selectedDeck = document.getElementById('deck-dropdown').value;
  let allCards = [];

  if (selectedDeck === 'master-deck') {
    // Include all predefined and custom cards for the Master Deck
    Object.keys(deckByCategory).forEach(category => {
      allCards.push(...deckByCategory[category]);
    });

    // Add custom cards from localStorage
    Object.keys(customCards).forEach(category => {
      customCards[category].forEach(card => {
        allCards.push({
          text: card.text,
          template: `./images/templates/${category}-template.jpeg`, // Use template for custom cards
        });
      });
    });
  } else if (selectedDeck === 'ideation') {
    // Cards for Ideation
    allCards = [
      './images/think-big/think-big-1.jpeg',
      './images/think-big/think-big-2.jpeg',
      './images/think-big/think-big-3.jpeg',
      './images/think-big/think-big-4.jpeg',
      './images/think-big/think-big-8.jpeg',
      './images/make-contact/make-contact-1.jpeg',
      './images/make-contact/make-contact-4.jpeg',
      './images/experiment/experiment-1.jpeg',
    ];
  } else if (selectedDeck === 'delivery') {
    // Cards for Delivery
    allCards = [
      './images/mission-impact/mission-impact-1.jpeg',
      './images/mission-impact/mission-impact-2.jpeg',
      './images/mission-impact/mission-impact-3.jpeg',
      './images/mission-impact/mission-impact-4.jpeg',
      './images/mission-impact/mission-impact-5.jpeg',
      './images/mission-impact/mission-impact-6.jpeg',
      './images/mission-impact/mission-impact-7.jpeg',
      './images/think-big/think-big-5.jpeg',
      './images/think-big/think-big-6.jpeg',
      './images/think-big/think-big-8.jpeg',
      './images/think-big/think-big-9.jpeg',
      './images/make-contact/make-contact-3.jpeg',
      './images/make-contact/make-contact-5.jpeg',
      './images/make-contact/make-contact-6.jpeg',
      './images/bring-best/bring-best-1.jpeg',
      './images/bring-best/bring-best-2.jpeg',
      './images/bring-best/bring-best-3.jpeg',
      './images/bring-best/bring-best-4.jpeg',
      './images/experiment/experiment-1.jpeg',
      './images/experiment/experiment-2.jpeg',
      './images/experiment/experiment-4.jpeg',
      './images/experiment/experiment-5.jpeg',
      './images/value-progress/value-progress-1.jpeg',
      './images/value-progress/value-progress-2.jpeg',
      './images/value-progress/value-progress-3.jpeg',
      './images/value-progress/value-progress-4.jpeg',
    ];
  } else if (selectedDeck === 'review') {
    // Cards for Review
    allCards = [
      './images/mission-impact/mission-impact-1.jpeg',
      './images/mission-impact/mission-impact-2.jpeg',
      './images/mission-impact/mission-impact-3.jpeg',
      './images/mission-impact/mission-impact-5.jpeg',
      './images/mission-impact/mission-impact-7.jpeg',
      './images/think-big/think-big-6.jpeg',
      './images/think-big/think-big-7.jpeg',
      './images/make-contact/make-contact-2.jpeg',
      './images/make-contact/make-contact-3.jpeg',
      './images/make-contact/make-contact-6.jpeg',
      './images/bring-best/bring-best-2.jpeg',
      './images/bring-best/bring-best-5.jpeg',
      './images/experiment/experiment-3.jpeg',
      './images/experiment/experiment-5.jpeg',
      './images/value-progress/value-progress-3.jpeg',
      './images/value-progress/value-progress-5.jpeg',
    ];
  }

  // Render the selected cards
  renderDeck(allCards);
}
document.querySelector('a[href="#my-cards"]').addEventListener('click', function (event) {
  event.preventDefault();

  // Ensure "Add Card" section is displayed
  document.querySelector('.add-card-section').style.display = 'block';

  // Create a completely separate #custom-deck-container
  const rightColumn = document.querySelector('.right-column');

  // Check if the custom-deck-container already exists, if not, create it
  let customDeckContainer = document.getElementById('custom-deck-container');
  if (!customDeckContainer) {
    customDeckContainer = document.createElement('div');
    customDeckContainer.id = 'custom-deck-container';
    customDeckContainer.className = 'deck-container'; // Reuse deck-container styling
    rightColumn.appendChild(customDeckContainer);
  }

  // Clear the custom-deck-container for fresh content
  customDeckContainer.innerHTML = '';

  // Fetch all custom cards
  const customCardsArray = [];
  Object.keys(customCards).forEach(category => {
    customCards[category].forEach(card => {
      customCardsArray.push({
        text: card.text,
        template: `./images/templates/${category}-template.jpeg`, // Use the template image for the category
        category: category, // Store the category for delete functionality
      });
    });
  });

  // Handle case where no custom cards exist
  if (customCardsArray.length === 0) {
    customDeckContainer.innerHTML = '<p style="text-align: center; color: black;">No custom cards created yet.</p>';
    return;
  }

  // Render all custom cards in the custom-deck-container
  customCardsArray.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.style.backgroundImage = `url(${card.template})`;
    cardElement.style.backgroundSize = 'cover';
    cardElement.style.backgroundPosition = 'center';

    // Card text
    const textElement = document.createElement('div');
    textElement.className = 'card-text';
    textElement.textContent = card.text;

    // Delete button
    const deleteButton = document.createElement('div');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = '×';
    deleteButton.onclick = function (event) {
      event.stopPropagation(); // Prevent triggering card click event
      deleteCustomCard(card);
    };

    // Append text and delete button to the card
    cardElement.appendChild(textElement);
    cardElement.appendChild(deleteButton);

    // Add the card to the custom-deck-container
    customDeckContainer.appendChild(cardElement);
  });
});

// Function to delete a custom card
function deleteCustomCard(cardToDelete) {
  const { text, category } = cardToDelete;

  // Find the category and filter out the card to delete
  if (customCards[category]) {
    customCards[category] = customCards[category].filter(card => card.text !== text);

    // Save updated customCards back to localStorage
    localStorage.setItem('customCards', JSON.stringify(customCards));

    // Refresh the custom deck container
    document.querySelector('a[href="#my-cards"]').click();
  }
}
