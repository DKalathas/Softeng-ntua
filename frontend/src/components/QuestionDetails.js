import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";


const QuestionDetails = () => {
    const { id, qid, opt} = useParams();
    const { data: que, error, isPending } = useFetch('http://localhost:4000/intelliq_api/question/' + id + '/' + qid);
    const navigate = useNavigate();
    const ids = useState(id)
    const ops = useState(opt)
    console.log(typeof ops[0])

    return (
        <div>
            <div className='row heading'>
                <h1 className='text-center col'>Answers of Questionnaire {ids}</h1>
                <button className='col text-center home' onClick={() => navigate("/admin")}>Go Back Home</button>
            </div>
        <div className="questionnaire-details" >
            {isPending  && <div className="text-center">Loading...</div>}
            {error && <div>{error}</div>}
            {que && que.map(que => (
                <div className="questionnaire-preview car5 text-center" key={que.questionnaireID}>
                    <p><b>Question: {que.qtext}</b></p>
                    {que.options && que.options.filter(option => option.optID===ops[0]).map(option => (
                        <div className='box text-center car6' key={option.optID}>
                            <p>ID of Option: {option.optID}</p>
                            <p>Option: {option.opttxt}</p>
                        </div>
                    ))}
                </div>

            ))}
        </div>
        </div>
    );
}

export default QuestionDetails;