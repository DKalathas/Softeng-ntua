import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const QuestionDetails = () => {
    const { id, qid } = useParams();
    const { data: que, error, isPending } = useFetch('http://localhost:4000/intelliq_api/question/' + id + '/' + qid);
    const navigate = useNavigate();
    console.log(useParams())

    return (
        <div className="questionnaire-details" >
            {isPending && <div className="text-center">Loading...</div>}
            {error && <div>{error}</div>}
            <h2>Question Details</h2>
            {que && que.map(que => (
                <div className="questionnaire-preview" key={que.questionnaireID}>
                    <p>Question: {que.qtext}</p>
                    {que.options && que.options.map(option => (
                        <div className='box' key={option.optID}>
                            <p>ID of Option: {option.optID}</p>
                            <p>Option: {option.opttxt}</p>

                        </div>
                    ))}

                </div>

            ))}
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}

export default QuestionDetails;