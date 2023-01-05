import { useNavigate } from "react-router-dom";

const QuestionnaireDetails = ({ questionnaire }) => {
    const navigate = useNavigate();
    console.log(questionnaire)
    return (
        <div className="questionnaire-details">
            <h1>hello</h1>
            <h2>Title:{console.log(questionnaire.questionnaireID)}</h2>
            <p>lol {questionnaire.questionnaireTitle}</p>
            <div>he {questionnaire.questionnaireTitle}</div>

            <button onClick={() => navigate('/admin')}>Back</button>
        </div>
    );
}

export default QuestionnaireDetails;