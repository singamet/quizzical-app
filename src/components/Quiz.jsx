import { nanoid } from "nanoid";
import { useState, useEffect } from "react"
import Bars from "react-loading-icons/dist/esm/components/bars";

export default function Quiz() {
    const fetchData = async () => {
        const response = await fetch("https://the-trivia-api.com/api/questions?limit=5");
        const data = await response.json();
        const arr = []
        data.map(x => {
            return arr.push({
                id: nanoid(),
                question: x.question,
                correctAnswer: x.correctAnswer,
                options: shuffle(x.incorrectAnswers.concat(x.correctAnswer)),
                selected: ""
            })
        });
        return arr
    };
   
        
    const [quizItems, setQuizItems] = useState([]);
    useEffect(() => {
        fetchData().then(res => setQuizItems(res));
        console.log(quizItems)
        console.log(quizCompleted)
    }, [])
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [displayAnswers, setDisplayAnswers] = useState(false);
    
    
    function shuffle(array) {
        var m = array.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
      
        return array;
    }
    useEffect(() => {
        if (quizItems.length > 0 && quizItems.every(x => x.selected !== "")) {
            setQuizCompleted(true)
        }
        console.log("QUIZ C", quizCompleted)
    },[quizItems])
    function handleChange(event) {
        const { name, value } = event.target
        //console.log(value)
        // setQuizItems(old => old.map(x => {
        //     console.log(value)
        //     return x.id === name ? {...x, selected:value} : x
        // }))
        const updated = quizItems.map(x => {
            if (x.id === name) {
                x.selected = value
            }
            return x
        })
        setQuizItems(updated);
    }
    function checkAnswers() {
        setDisplayAnswers(true)
        quizItems.map(x => {
            if (x.selected === x.correctAnswer) {
                setScore(old => old + 1)
                //console.log(score)
            }
            return x
        })
    }
    function startAgain() {
        setDisplayAnswers(false);
        setScore(0);
        setQuizCompleted(false);
        fetchData().then(res => setQuizItems(res));
    }
    function resultClass(answer, item) {
        if (displayAnswers) {
            if (answer === item.correctAnswer) {
                return "correct";
            } else if (answer === item.selected) {
                return "incorrect";
            }
            return ""
        }
        return ""
    }
    
    const items = quizItems.map(item => {
        return (
            <section key={item.id} className="quiz-item">
                <p className="question">{item.question}</p>
                <div className="options even">
                {item.options.map(x => {
                    return (
                        <div key={x}>
                                <input
                                type="radio"
                                id={x}
                                name={item.id}
                                value={x}
                                onChange={handleChange}
                                disabled={displayAnswers}
                                />
                            <label
                                className={`label ${resultClass(x, item)}`}
                                htmlFor={x}
                            >
                                {x}
                                </label>
                        </div>
                    )
                })}
                </div>
                <hr/>
            </section>
        )
    })
    return (
        <div className="quiz-container">
            {quizItems.length > 0 ?
            <div>
                <h1>QUIZZICAL</h1>
                {items}
                {displayAnswers ?
                    <div>
                    <p className="result">You scored {score}/5.</p>
                    <button onClick={startAgain}>Start Again</button>
                    </div>
                    : quizCompleted &&
                    <button
                    onClick={checkAnswers}
                    >Check Answers</button>
                }
            </div>
            : <Bars /> }
        </div>
    )
}