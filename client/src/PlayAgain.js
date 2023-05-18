import "./main.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
    updateWordOfDay,
    updateWordOfDayEmpty,
    updateLoading,
    updateWordOfDayCategory,
    updateWordOfDayDate,
} from "./redux/WordProgress/word-progress.actions";
import { resetNumWrong } from "./redux/NumberWrong/num-wrong.actions";
import { resetLetters } from "./redux/LettersUsed/letters-used.actions";
import { useState } from "react";
import word_data from "./WordData";

var today = new Date();
var month = String(today.getMonth() + 1).padStart(2, "0");
var day = String(today.getDate()).padStart(2, "0");
var year = today.getFullYear();
var currentDate = month + "/" + day + "/" + year;

var random_word = getRandomWord();
function getRandomWord() {
    var categories = Object.values(word_data.data.words.categories);
    var randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
    var words = randomCategory.words;
    var randomWord = words[Math.floor(Math.random() * words.length)];

    return {
        name: randomWord,
        category: randomCategory.name,
    };
}

function PlayAgain(props) {
    const [isLoading, setLoading] = useState(true);

    const handlePlayAgain = () => {
        random_word = getRandomWord();
        console.log("test");
        console.log(props);
        const fetchData = async () => {
            try {
                var wod = random_word.name;
                const wodArr = [];
                const progressArr = [];
                for (let i of wod) {
                    progressArr.push(i === " " ? " " : "_");
                    wodArr.push(i === " " ? " " : i.toUpperCase());
                }
                props.updateWordOfDayEmpty(progressArr);
                props.updateWordOfDay(wodArr);
                props.updateWordOfDayCategory(random_word.category);
                props.updateWordOfDayDate(currentDate);
                props.updateLoading(false);
                props.resetNumWrong();
                props.resetLetters();
            } catch (err) {
                console.log("error");
            }
        };
        fetchData();
    };

    return (
        <div className="play-again">
            <button onClick={handlePlayAgain}>Play Again</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        numberWrong: state.counter.numberWrong,
        lettersUsed: state.changeLetterStatus.lettersUsed,
        wordProgress: state.wordProgress.wordProgress,
        wordOfDay: state.wordProgress.wordOfDay,
        loading: state.wordProgress.loading,
        category: state.wordProgress.wordOfDayCategory,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateWordOfDay: (arr) => dispatch(updateWordOfDay(arr)),
        updateWordOfDayEmpty: (array) => dispatch(updateWordOfDayEmpty(array)),
        updateLoading: (bool) => dispatch(updateLoading(bool)),
        updateWordOfDayCategory: (category) =>
            dispatch(updateWordOfDayCategory(category)),
        updateWordOfDayDate: (date) => dispatch(updateWordOfDayDate(date)),
        resetNumWrong: () => dispatch(resetNumWrong()),
        resetLetters: () => dispatch(resetLetters()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayAgain);
