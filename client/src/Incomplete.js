import React from "react";
import PlayAgain from "./PlayAgain";

function Incomplete() {
    const messages = [
        "You did not get the word...",
        "Better luck next time!",
        "Oh well...",
        "Oh no...",
        "You lost...",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    return (
        <div className="complete-container">
            <div className="complete lose">{randomMessage}</div>
            <PlayAgain />
        </div>
    );
}

export default Incomplete;
