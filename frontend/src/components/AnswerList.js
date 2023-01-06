import { Link } from 'react-router-dom';

const AnswerList = ({ questionnaire }) => {
    return (
        <div className="questionnaire-list">
            {questionnaire.map(questionnaire => (
                <div className="questionnaire-preview" key={questionnaire.questionnaireID} >
                    <Link to={`/answer/${questionnaire.questionnaireID}`}>
                        <h2>{questionnaire.questionnaireID}</h2>
                        <p>{questionnaire.questionnaireTitle}</p>
                    </Link>
                </div>
            ))}
        </div>);
}

export default AnswerList;