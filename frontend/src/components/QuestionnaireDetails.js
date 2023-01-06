import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const QuestionnaireDetails = () => {

    const { id } = useParams();
    const { data: questionnaire, error, isPending } = useFetch('http://localhost:4000/intelliq_api/allquestionnaire/' + id);
    const navigate = useNavigate();

    return (
        <div className="questionnaire-details" >
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {questionnaire && questionnaire.map(questionnaire => (
                <div key={questionnaire.questionnaireID}>
                    <button onClick={() => navigate('/admin')}>Back</button>
                    <h2 >ID of Questionnaire: {questionnaire.questionnaireID}</h2>
                    <p>Title of Questionnaire: {questionnaire.questionnaireTitle}</p>
                    {questionnaire.questions && questionnaire.questions.map(questions => (
                        <div className="questionnaire-preview" key={questions.qID}>
                            <p >ID of Question: {questions.qID}</p>
                            <p>Question: {questions.qtext}</p>
                            {questions.options && questions.options.map(option => (
                                <div className='box' key={option.optID}>
                                    <p>ID of Option: {option.optID}</p>
                                    <p>Option: {option.opttxt}</p>
                                    <p>Next Qyestion: {option.nextqID}</p>

                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={() => navigate('/admin')}>Back</button>
                </div>
            ))}
        </div>
    );
}

export default QuestionnaireDetails;