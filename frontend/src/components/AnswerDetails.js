import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from 'react-router-dom';



const AnswerDetails = () => {

    const { id } = useParams();
    const { data: answers, error, isPending } = useFetch('http://localhost:4000/intelliq_api/allanswers/' + id);
    const navigate = useNavigate();

    return (
        <div className="questionnaire-details" >
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <h2>Answers from {id}</h2>
            <button onClick={() => navigate('/admin')}>Back</button>
            {answers && answers.map(answers => (
                <div className="questionnaire-preview" key={answers.questionnaireID}>
                    <Link to={`/answer/${answers.questionnaireID}/${answers.questionID}`}>
                        <p>Session: {answers.session}</p>
                        <p>Question ID: {answers.questionID}</p>
                        <p>Option ID: {answers.optionID}</p>
                    </Link>
                </div>

            ))}
            <button onClick={() => navigate('/admin')}>Back</button>
        </div>
    );
}

export default AnswerDetails;