import React from "react";
import Grid from "./Components/Grid/Grid";
import ErrorBoundary from "./Components/ErrorBoundry/ErrorBoundry";

function App() {
    return (
        <main>
            <h1 className="dancing-script-400">SUDOKU WORLD</h1>
            <ErrorBoundary
                fallback={
                    <div style={{ textAlign: "center", marginTop: "20px", fontSize: "20px" }}>
                        <p style={{ color: "yellowgreen", fontWeight: "bold", fontSize: "30px" }}>
                            Sudoku generation went wrong 😊
                        </p>
                        <p style={{ fontWeight: "bold" }}>
                            My algorithm fails about 1 in 10 times, because of random generations
                        </p>
                        <p style={{ fontWeight: "bold" }}>Currently trying to think of a better algorithm</p>
                        <p>Please try again</p>
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
                <Grid />
            </ErrorBoundary>
        </main>
    );
}

export default App;
