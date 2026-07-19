import { useState, useEffect } from "react";

function PokemonQuiz({ pokemons, onClose }) {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);

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
    }
  }

  useEffect(() => {
    if (pokemons.length > 0) {
      generateQuestion();
    }
  }, [pokemons]);

  return (
    <div className="modal">
      <div className="modal-content">
        {question && (
          <div className="quizContent">
            <div className="quizHead">
              <h3>Who's That Pokémon?</h3>
              <p className="score-badge">Score: {score}</p>
            </div>
            <img
              src={question.image}
              alt={question.name}
              style={{ width: "150px" }}
              className={answered ? "quiz-reveal" : "quiz-hide"} />

            <div className="options">
              {options.map(opt => (
                <button
                  key={opt.name}
                  onClick={() => checkAnswer(opt.name)}
                  style={{
                    margin: "5px",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                  disabled={answered !== null}
                  className={
                    answered===null
                      ? "hmm"
                      :opt.name===question.name
                      ? "correct"
                      :"wrong"}
                >
                  {opt.name}
                </button>
              ))}
            </div>

            {answered && (
              <p>
                It Was {question.name}.{" "}
                {answered === question.name ? "Correct!" : "Wrong!"}
              </p>
            )}
            <div className="quizBottom">
              <button
                onClick={generateQuestion}
                disabled={!answered}
                className="nextBtn">NEXT</button>
              <button onClick={onClose} className="nextBtn">CLOSE</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default PokemonQuiz;
