import React, { useState } from "react";
import Grid from "./Components/Grid/Grid";
import ErrorBoundary from "./Components/ErrorBoundry/ErrorBoundry";

function App() {
    const [difficulty, setDifficulty] = React.useState(0.5);
    const [generate, setGenerate] = React.useState(false);
    const [win, setWin] = useState(false);
    const [lost, setLost] = useState(false);
    const [untilWinCounter, setUntilWinCounter] = useState(0);

    return (
        <main>
            <header>
                <div>
                    <select
                        name="difficulty"
                        id="difficulty"
                        onChange={(e) => {
                            setDifficulty(parseFloat(e.target.value));
                        }}
                        defaultValue={0.5}
                    >
                        <option value="0.9">Easy Peasy Lemon Squizy</option>
                        <option value="0.7">Easy</option>
                        <option value="0.5">Medium</option>
                        <option value="0.3">Hard</option>
                        <option value="0.1">Imposible</option>
                    </select>
                </div>
                <button
                    onClick={() => {
                        setGenerate((prev) => !prev);
                        setLost(false);
                    }}
                >
                    New Sudoku
                </button>
            </header>
            <h1 className="dancing-script-400">
                {lost ? "It's Okay, Try again 😊" : win ? "🎉Congratulations🎉" : "SUDOKU WORLD"}
            </h1>
            <ErrorBoundary
                fallback={
                    <div style={{ textAlign: "center", marginTop: "20px", fontSize: "20px" }}>
                        <p
                            style={{
                                backgroundColor: "white",
                                padding: "10px",
                                borderRadius: "8px",
                                color: "yellowgreen",
                                fontWeight: "bold",
                                fontSize: "30px",
                            }}
                        >
                            Sudoku generation went wrong 😊
                        </p>
                        <p
                            style={{
                                fontWeight: "bold",
                                color: "black",
                                backgroundColor: "white",
                                padding: "10px",
                                borderRadius: "8px",
                            }}
                        >
                            My algorithm fails about 1 in 10 times, because of random generations
                        </p>
                        <p
                            style={{
                                fontWeight: "bold",
                                color: "black",
                                backgroundColor: "white",
                                padding: "10px",
                                borderRadius: "8px",
                            }}
                        >
                            Currently trying to think of a better algorithm
                        </p>
                        <p style={{ backgroundColor: "white", padding: "10px", borderRadius: "8px" }}>
                            Please try again
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007BFF",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "24px",
                            }}
                        >
                            Refresh
                        </button>
                    </div>
                }
            >
                <Grid
                    difficulty={difficulty}
                    generate={generate}
                    win={win}
                    setWin={setWin}
                    setLost={setLost}
                    untilWinCounter={untilWinCounter}
                    setUntilWinCounter={setUntilWinCounter}
                />
            </ErrorBoundary>
        </main>
    );
}

export default App;
