import { connect } from "react-redux";

function CompletedWordContainer(props) {
    var currentProgress = props.wordProgress;

    return (
        <div className="stacked-div word-progress-container">
            <div className="letter-spaces-container">
                {currentProgress === "loading" ? (
                    <div className="loading-circle"></div>
                ) : (
                    <>
                        {props.wordOfDay?.map((letter) => {
                            return (
                                <>
                                    {letter === " " ? (
                                        <div className="new-line"></div>
                                    ) : (
                                        <>
                                            {letter === "_" ? (
                                                <div className="letter-space">
                                                    {" "}
                                                </div>
                                            ) : (
                                                <div className="letter-space">
                                                    <div className="letter-text">
                                                        {letter}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        numberWrong: state.counter.numberWrong,
        lettersUsed: state.changeLetterStatus.lettersUsed,
        wordProgress: state.wordProgress.wordProgress,
        wordOfDay: state.wordProgress.wordOfDay,
    };
};
export default connect(mapStateToProps)(CompletedWordContainer);
