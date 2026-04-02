// Step 1: Select the new quote button
const newQuoteBtn = document.querySelector('#js-new-quote');
const showAnswerBtn = document.querySelector('#js-tweet');

// Step 4: API endpoint variable
const apiEndpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

// Keep track of the current quote's answer
let currentAnswer = '';

// Step 6: Function to display the question in the HTML
function displayQuote(question) {
  const quoteTextEl = document.getElementById('js-quote-text');
  quoteTextEl.textContent = question;
}

// Function to display the answer
function displayAnswer(answer) {
  const answerTextEl = document.getElementById('js-answer-text');
  answerTextEl.textContent = answer ? `Answer: ${answer}` : '';
}

// Step 5: getQuote function using fetch
function getQuote() {
  // Clear the answer when a new question is fetched
  displayAnswer('');
  showAnswerBtn.disabled = false;

  fetch(apiEndpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Step 7: Call displayQuote with the fetched question
      displayQuote(data.question);
      currentAnswer = data.answer;
    })
    .catch(error => {
      console.error('Failed to fetch trivia:', error);
      alert('Oops! Could not fetch a trivia question. Please try again.');
    });
}

// Show answer button handler
showAnswerBtn.addEventListener('click', function () {
  if (currentAnswer) {
    displayAnswer(currentAnswer);
  }
});

// Step 2: Event listener on the new quote button
newQuoteBtn.addEventListener('click', getQuote);

// Step 8: Load a quote immediately on page load
getQuote();
