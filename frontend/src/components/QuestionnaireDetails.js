import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import "./Details.css"

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
                    <div className="qlist row header">
                        <div className="col">
                            <h2>Questionnaire ID: {questionnaire.questionnaireID}</h2>
                            <p>Title: {questionnaire.questionnaireTitle}</p>
                        </div>
                        <div className="col"></div>
                        <div className="col"></div>
                        <div className="col">
                            <button onClick={() => navigate('/All')}>Back</button>
                        </div>
                    </div>
                    {questionnaire.questions && questionnaire.questions.map(questions => (
                        <div className="questionnaire-preview1 text-center" key={questions.qID}>
                            <p><b>ID of Question: {questions.qID}</b></p>
                            <p><b>Question: {questions.qtext}</b></p>
                            <p className="car3">Possible Answers</p>
                            {questions.options && questions.options.map(option => (
                                <div className='box1 text-center' key={option.optID}>
                                    <p>ID of Option: {option.optID}</p>
                                    <p>Option: {option.opttxt}</p>
                                    <p>Next Question: {option.nextqID}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="text-center">
                    <button onClick={() => navigate('/All')}>Back</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default QuestionnaireDetails;