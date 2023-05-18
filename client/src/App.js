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
import HeaderContainer from "./HeaderContainer";
import AlphabetContainer from "./AlphabetContainer";
import CategoryContainer from "./CategoryContainer";
import SharkContainer from "./SharkContainer";
import WordProgressContainer from "./WordProgressContainer";
import KeyboardContainer from "./KeyboardContainer";
import Complete from "./Complete";
import Incomplete from "./Incomplete";
import word_data from "./WordData";
import { useState } from "react";
import CompletedWord from "./CompletedWord";

var today = new Date();
var month = String(today.getMonth() + 1).padStart(2, "0");
var day = String(today.getDate()).padStart(2, "0");
var year = today.getFullYear();
var currentDate = month + "/" + day + "/" + year;

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
const random_word = getRandomWord();

function App(props) {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const delay = 200; // Half a second delay

        const timer = setTimeout(() => {
            setLoading(false);
        }, delay);

        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
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
            } catch (err) {
                console.log("error");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="app">
            {isLoading ? (
                <div className="loading-circle"></div>
            ) : (
                <div className="game-container">
                    <>
                        {props.wordOfDay.every(
                            (value, index) =>
                                value === props.wordProgress[index]
                        ) === true ? (
                            <>
                                <HeaderContainer />
                                <AlphabetContainer />
                                <CategoryContainer />
                                <SharkContainer />
                                <WordProgressContainer />
                                <Complete />
                            </>
                        ) : (
                            <>
                                {props.numberWrong === 6 ? (
                                    <>
                                        <HeaderContainer />
                                        <AlphabetContainer />
                                        <CategoryContainer />
                                        <SharkContainer />
                                        <CompletedWord />
                                        <Incomplete />
                                    </>
                                ) : (
                                    <>
                                        <HeaderContainer />
                                        <AlphabetContainer />
                                        <CategoryContainer />
                                        <SharkContainer />
                                        <WordProgressContainer />
                                        <KeyboardContainer />
                                    </>
                                )}
                            </>
                        )}
                    </>
                </div>
            )}
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
        // increaseNumWrong: () => dispatch(increaseNumWrong()),
        // decreaseNumWrong: () => dispatch(decreaseNumWrong()),
        // changeLetterStatus: () => dispatch(changeLetterStatus("A", true)),
        // updateWordProgress: () => dispatch(updateWordProgress(0, "T")),
        updateWordOfDay: (arr) => dispatch(updateWordOfDay(arr)),
        updateWordOfDayEmpty: (array) => dispatch(updateWordOfDayEmpty(array)),
        updateLoading: (bool) => dispatch(updateLoading(bool)),
        updateWordOfDayCategory: (category) =>
            dispatch(updateWordOfDayCategory(category)),
        updateWordOfDayDate: (date) => dispatch(updateWordOfDayDate(date)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
