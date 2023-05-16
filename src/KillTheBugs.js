import { useEffect, useState } from 'react';
import './index.css';
import { ReactComponent as Bug } from './components/bug.svg';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const KillTheBugs = () => {
    const easyTimeLimit = 2;
    const mediumTimeLimit = 1.6;
    const hardTimeLimit = 1.3;
    const MySwal = withReactContent(Swal);
    const [attempts, setAttempts] = useState(0);
    const [square, setSquare] = useState(Array(12).fill("x"));
    const [isRespawning, setIsRespawning] = useState(false);
    const [timeLimit, setTimeLimit] = useState(easyTimeLimit);
    const [isStarted, setIsStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const handleBugClick = (index) => {
        setAttempts(prevAttempts => prevAttempts + 1);
        const newSquare = [...square];
        newSquare[index] = false;
        setSquare(newSquare);
        setIsRespawning(true);
    }

    useEffect(() => {
        if(isGameOver === true) {
            MySwal.fire({
                title: <p id='game-over-alert'>Congratulations! You've killed all the bugs after {attempts} clicks!</p>,
                footer: <p id='game-over-alert'>Hey, have you ever asked a programmer how much they hate bugs?</p>
            })
            setIsStarted(false);
            setSquare(Array(12).fill("x"));
            setIsRespawning(true);
        }
    }, [isGameOver])

    useEffect(() => {
        if(square.every(value => value === false)) {
            setIsGameOver(true);
        }
    })

    useEffect(() => {
        if(isRespawning === true) {
            setTimeout(() => {
                setSquare(Array(12).fill("x"));
                setIsRespawning(false);
            }, timeLimit * 1000)
        }
    }, [isRespawning]);

    const element = (
        <>
            <div id="game-container">
                <div id="game-title-container">
                    <h3 id="game-title">Bugs will respawn <span>simultaneously</span> after {timeLimit} seconds since you killed them.</h3>
                    <h4 id="game-title">Your task is to kill them all!</h4>
                </div>
                {
                    isStarted ? "" :
                    <select id="difficulty-dropdown" onChange={(e) => setTimeLimit(e.target.value)}>
                        <option value={easyTimeLimit}>Easy ({easyTimeLimit} secs)</option>
                        <option value={mediumTimeLimit}>Medium ({mediumTimeLimit} secs)</option>
                        <option value={hardTimeLimit}>Hard ({hardTimeLimit} secs)</option>
                    </select>
                }
                <div id="game-arena">
                    {isStarted ? square.map((square, index) => {
                        return (
                            <div key={index} id="game-square">
                                <div id="bug-container" onClick={() => handleBugClick(index)}>
                                    {square !== false ? (square === "x" ? <Bug id="bug-img" /> : "") : ""}
                                </div>
                            </div>
                        )
                    }) : <div id="start-game-instruction-container"><h5 id="start-game-instruction">Choose difficulty level, then click the play button!</h5></div>}
                </div>
                {
                    isStarted ?
                    <div id="score-board">
                        <h4 id="score-counter">Attempts: {attempts}</h4>
                    </div> : ""
                }
                {
                    isStarted ? "" :
                    <button onClick={() => {
                        setIsStarted(true);
                        setIsGameOver(false);
                        setAttempts(0);
                    }}>PLAY</button>
                }
                <div id="footer">
                    <p>Created by MalvinVal</p>
                    <p>View the source code <a href='https://github.com/malvinval/tic-tac-toe'>here</a>.</p>
                </div>
            </div>
        </>
    );

    return element;
}

export default KillTheBugs;