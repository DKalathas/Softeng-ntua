import { Link } from 'react-router-dom';


const QuestionnaireList = ({ questionnaire }) => {
    return (
        <div className="questionnaire-list">
            {questionnaire.map(questionnaire => (
                <div className="questionnaire-preview" key={questionnaire.questionnaireID} >
                    <Link to={`/questionnaire/${questionnaire.questionnaireID}`}>
                        <h2>{questionnaire.questionnaireID}</h2>
                        <p>{questionnaire.questionnaireTitle}</p>
                    </Link>
                </div>
            ))}
        </div>);
}

export default QuestionnaireList;