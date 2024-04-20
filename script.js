
const questions = [
  { lyric: "Time, curious time. Gave me no compasses, gave me no signs", answer: "Invisible String", title1: "Delicate", title2: "Treacherous", title3: "Long Live", title4: "Invisible String" },
  { lyric: "Handsome, you're a mansion with a view", answer: "Delicate", title1: "Story of Us", title2: "I Knew You Were Trouble", title3: "Blank Space", title4: "Delicate" },
  { lyric: "Band-Aids don't fix bullet holes", answer: "Bad Blood", title1: "Back to December", title2: "We Are Never Ever Getting Back Together", title3: "Cruel Summer", title4: "Bad Blood" },
  { lyric: "So it's gonna be forever or it's gonna go down in flames", answer: "Blank Space", title1: "Bad Blood", title2: "Shake It Off", title3: "Style", title4: "Blank Space" },
  { lyric: "He said the way my blue eyes shined put those Georgia stars to shame that night", answer: "Tim McGraw", title1: "Teardrops on My Guitar", title2: "Our Song", title3: "Fifteen", title4: "Tim McGraw" },
  { lyric: "I've never heard silence quite this loud", answer: "Story of Us", title1: "Sparks Fly", title2: "Mine", title3: "Speak Now", title4: "Story of Us" },
  { lyric: "I had the time of my life fighting dragons with you", answer: "Long Live", title1: "Fifteen", title2: "Mine", title3: "Our Song", title4: "Long Live" },
  { lyric: "Take a deep breath as you walk through the doors", answer: "Fifteen", title1: "Teardrops on My Guitar", title2: "Hey Stephen", title3: "Mine" },
  { lyric: "And when I felt like I was an old cardigan under someone's bed", answer: "Cardigan", title1: "august", title2: "willow", title3: "invisible string" },
  { lyric: "This is the golden age of something good and right and real", answer: "State of Grace", title1: "Red", title2: "Enchanted", title3: "Sparks Fly" },
  { lyric: "And I should just tell you to leave 'cause I know exactly where it leads", answer: "Style", title1: "Blank Space", title2: "Bad Blood", title3: "Shake It Off" },
  { lyric: "You and I walk a fragile line", answer: "Haunted", title1: "Bad Blood", title2: "Shake It Off", title3: "I Knew You Were Trouble" },
  { lyric: "You were Romeo, I was Juliet", answer: "Love Story", title1: "Speak Now", title2: "Enchanted", title3: "Our Song" },
  { lyric: "Strangers silence makes me want to take the stairs", answer: "Ours", title1: "State of Grace", title2: "Red", title3: "I Knew You Were Trouble" },
  { lyric: "Your love is a secret I'm hoping, dreaming, dying to keep", answer: "King of My Heart", title1: "Story of Us", title2: "Delicate", title3: "Blank Space" },
  { lyric: "Have I known you twenty seconds or twenty years?", answer: "Lover", title1: "Speak Now", title2: "Mine", title3: "Our Song" },
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll("#answers button");
const nextButton = document.getElementById("next-question");
const feedbackElement = document.getElementById("feedback");
const restartButton = document.createElement("button"); // Create restart button element

function displayQuestion() {
  const question = questions[currentQuestion];
  questionElement.textContent = question.lyric;

  // Randomize answer order
  const answers = [question.answer, question.title1, question.title2, question.title3];
  shuffleArray(answers);

  answerButtons.forEach((button, index) => {
    button.textContent = answers[index];
    button.disabled = false; // Enable all buttons again for next question
  });
  feedbackElement.textContent = "";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestion].answer;
  if (selectedAnswer === correctAnswer) {
    score++;
    feedbackElement.textContent = "Correct!";
  } else {
    feedbackElement.textContent = `Incorrect. The answer was ${correctAnswer}`;
  }
  currentQuestion++;
}

function handleNextQuestion() {
  if (currentQuestion === questions.length) {
    feedbackElement.textContent = `You answered ${score} out of ${questions.length} questions correctly!`;
    nextButton.disabled = true; // Disable next button
    showRestartButton(); // Call function to display restart button
    return;
  }
  displayQuestion();
}

function showRestartButton() {
  restartButton.textContent = "Restart Game";
  restartButton.classList.add("restart-button"); // Add styling class (optional)
  restartButton.addEventListener("click", function() {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
    nextButton.disabled = false; // Enable next button again
    feedbackElement.textContent = "";
    answerButtons.forEach(button => button.disabled = false); // Disable all buttons
    restartButton.remove(); // Remove restart button after click
  });
  document.body.appendChild(restartButton); // Add restart button to the page
}

displayQuestion(); // Display the first question on page load

nextButton.addEventListener("click", handleNextQuestion);

answerButtons.forEach(button => {
  button.addEventListener("click", function() {
    checkAnswer(this.textContent);
    handleNextQuestion();
  });
});
