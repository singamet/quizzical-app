export default function Start(props) {
    return (
        <div className="container">
            <h1>Quizzical</h1>
            <button onClick={props.start}>Start Quiz</button>
        </div>
    )
}