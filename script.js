
const questions = [
  { lyric: "State the weather, 'cause I love you better than", answer: "Cold as December", title1: "Love Story", title2: "Mine", title3: "Sparks Fly", title4: "Cold as December" },
  { lyric: "Long drives on sleepless nights, windows down, feeling my hair", answer: "Wildest Dreams", title1: "Enchanted", title2: "Red", title3: "State of Grace", title4: "Wildest Dreams" },
  { lyric: "Lost in this maze with no exit", answer: "Invisible String", title1: "Delicate", title2: "Treacherous", title3: "Long Live", title4: "Invisible String" },
  { lyric: "Flashback to when you met me, your heart was an empty train", answer: "Delicate", title1: "Story of Us", title2: "I Knew You Were Trouble", title3: "Blank Space", title4: "Delicate" },
  { lyric: "Band-Aids don't fix bullet holes", answer: "All Too Well", title1: "Back to December", title2: "We Are Never Ever Getting Back Together", title3: "Cruel Summer", title4: "All Too Well" },
  { lyric: "You said forever, now I drive alone past your street", answer: "Blank Space", title1: "Bad Blood", title2: "Shake It Off", title3: "Style", title4: "Blank Space" },
  { lyric: "We were both sixteen, summer nights", answer: "Tim McGraw", title1: "Teardrops on My Guitar", title2: "Our Song", title3: "Fifteen", title4: "Tim McGraw" },
  { lyric: "Your buzzcut and my hair swept back", answer: "Story of Us", title1: "Sparks Fly", title2: "Mine", title3: "Speak Now", title4: "Story of Us" },
  { lyric: "Hold on to the memories, they will hold on to you", answer: "Long Live", title1: "Fifteen", title2: "Mine", title3: "Our Song", title4: "Long Live" },
  { lyric: "This dorm room feels like a cage", answer: "Fifteen", title1: "Teardrops on My Guitar", title2: "Hey Stephen", title3: "Mine" },
  { lyric: "And when I felt like I was an old cardigan under someone's bed", answer: "Cardigan", title1: "august", title2: "willow", title3: "invisible string" },
  { lyric: "But you painted me a picture, perfect girl, iridescent light", answer: "State of Grace", title1: "Red", title2: "Enchanted", title3: "Sparks Fly" },
  { lyric: "Red lips and perfect strangers", answer: "Style", title1: "Blank Space", title2: "Bad Blood", title3: "Shake It Off" },
  { lyric: "Dancing with our demons at the back of the church", answer: "Haunted", title1: "Bad Blood", title2: "Shake It Off", title3: "I Knew You Were Trouble" },
  { lyric: "September stole something from me", answer: "The Story of Us", title1: "Back to December", title2: "Mine", title3: "Sparks Fly" },
  { lyric: "You were Romeo, I was Juliet", answer: "Love Story", title1: "Speak Now", title2: "Enchanted", title3: "Our Song" },
  { lyric: "This love is wild and you're caught in the crossfire", answer: "Ours", title1: "State of Grace", title2: "Red", title3: "I Knew You Were Trouble" },
  { lyric: "We built a castle out of all the debris", answer: "King of My Heart", title1: "Story of Us", title2: "Delicate", title3: "Blank Space" },
  { lyric: "Your hand in mine, caught in a dream", answer: "Invisible String", title1: "Cardigan", title2: "august", title3: "willow" },
  { lyric: "Long live the walls we crashed through", answer: "Long Live", title1: "Speak Now", title2: "Mine", title3: "Our Song" },
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
