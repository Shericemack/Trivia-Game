
var card = $("#quiz-area");
var countStartNumber = 11;

// Question set
var questions = [{
  question: "What team wears purple and gold?",
  answers: ["Lakers", "Raptors", "76ers", "Golden State Warriors"],
  correctAnswer: "Lakers",
  image: "assets/images/kobe.jpg"
}, {
  question: "Who scored 100 points in one NBA game?",
  answers: ["Micheal Jordan", "Wilt Chamberlain", "Kobe Bryant", "Shaq"],
  correctAnswer: "Wilt Chamberlain",
  image: "assets/images/wilt.png"
}, {
  question: "Which NBA team won the most titles in the 90s?",
  answers: ["New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls"],
  correctAnswer: "Chicago Bulls",
  image: "assets/images/bull.jpg"
}, {
  question: "What is the name of the individual with the most NBA champtionships'?",
  answers: ["Bill Russell", "Micheal Jordan", "Robert Hory", "Kobe Bryant"],
  correctAnswer: "Bill Russell",
  image: "assets/images/bill.png"
}, {
  question: "Who was the first player to jump from the free throw line?",
  answers: ["Vince Carter", "Karim abdul Jabar", "Tracy McGrady", "Micheal Jordan"],
  correctAnswer: "Micheal Jordan",
  image: "assets/images/micheal jordan.jpg"
}, {
  question: "Who made the most 3-pointers in a NBA season EVER?",
  answers: ["Reggie Miller", "Ray Allen", "Steph Curry", "Micheal Redd"],
  correctAnswer: "Steph Curry",
  image: "assets/images/step.png"
}, {
  question: "Micheal Jordan retired from basketball to play which sport?",
  answers: ["Baseball", "Hockey", "Golf", "Tennis"],
  correctAnswer: "Baseball",
  image: "assets/images/baseball.jpg"
}, {
  question: "What year was basketball invented?",
  answers: ["1932", "1973s", "1946", "1922"],
  correctAnswer: "1946",
  image: "assets/images/basketball.jpg"
}];

var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    card.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(game.counter);

    card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    card.html("<h2>Nope!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});
