import { useState, useEffect } from "react";

function PokemonQuiz({ pokemons, onClose }) {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [questionNo, setQuestionNo] = useState(1);
  const [finished, setFinished] = useState(false);

  // Preload audio files
  const introSound = new Audio("/whos-that-pokemon.mp3");
  const correctSound = new Audio("/correct.mp3");
  const wrongSound = new Audio("/wrong.mp3");

  function generateQuestion() {
    const random = pokemons[Math.floor(Math.random() * pokemons.length)];

    const wrongOptions = pokemons
      .filter(x => x.name !== random.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [...wrongOptions, random].sort(() => Math.random() - 0.5);

    setQuestion(random);
    setOptions(allOptions);
    setAnswered(null); // reset answer for new question
  }

  function checkAnswer(selected) {
    setAnswered(selected);

    if (selected === question.name) {
      setScore(prev => prev + 1);
      correctSound.play(); // play correct sound
    } else {
      wrongSound.play(); // play wrong sound
    }
  }

  function nextQuestion() {
    if (questionNo === 10) {
      setFinished(true);
      return;
    }

    setQuestionNo(prev => prev + 1);
    generateQuestion();
  }

  useEffect(() => {
    if (pokemons.length > 0) {
      generateQuestion();
    }
  }, [pokemons]);

  // Play intro voice whenever a new question is generated
  useEffect(() => {
    if (question) {
      introSound.play();
    }
  }, [question]);

  let rank;
  if (score === 10) {
    rank = "👑 Pokémon Champion";
  } else if (score >= 8) {
    rank = "🌟 Pokémon Master";
  } else if (score >= 6) {
    rank = "🔥 Elite Trainer";
  } else if (score >= 4) {
    rank = "⚡ Gym Challenger";
  } else {
    rank = "🌱 Rookie Trainer";
  }

  return (
    <div className="modal">
      <div className="modal-content" style={{ backgroundColor: "#de3d37", color: "white" }}>
        {finished ? (
          <div className="quiz-finished">
            <h1>🎉 Quiz Complete!</h1>
            <h2>Your Score: {score} / 10</h2>
            <h2>Your Rank: {rank}</h2>

            <button
              className="shiny-btn"
              onClick={() => {
                setScore(0);
                setQuestionNo(1);
                setFinished(false);
                generateQuestion();
              }}
              style={{ marginRight: 20 }}
            >
              PLAY AGAIN
            </button>

            <button className="shiny-btn" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          question && (
            <div className="quizContent">
              <h3 className="quizTitle">
                Who's That Pokémon <img style={{ width: 32 }} src="Question.png" alt="?" />
              </h3>
              <div className="quizHead">
                <p>{questionNo}/10</p>
                <p className="score-badge">Score: {score}</p>
              </div>

              <div className="quizImgContainer">
                <img
                  src={question.image}
                  alt={question.name}
                  style={{ width: "150px" }}
                  className={answered ? "quiz-reveal" : "quiz-hide"}
                />
                {answered ? "" : <img style={{ width: 125 }} src="Question.png" alt="?" />}
              </div>

              <div className="options">
                {options.map(opt => (
                  <button
                    key={opt.name}
                    onClick={() => checkAnswer(opt.name)}
                    disabled={answered !== null}
                    className={
                      answered === null
                        ? "hmm"
                        : opt.name === question.name
                        ? "correct"
                        : answered === opt.name
                        ? "wrong"
                        : ""
                    }
                    style={{
                      margin: "5px",
                      padding: "10px",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>

              <div className="quizBottom">
                <button
                  onClick={nextQuestion}
                  disabled={!answered}
                  className="shiny-btn"
                  style={{ margin: 20 }}
                >
                  NEXT
                </button>

                <button onClick={onClose} className="shiny-btn" style={{ margin: 20 }}>
                  CLOSE
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default PokemonQuiz;
