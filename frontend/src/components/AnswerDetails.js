import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from 'react-router-dom';
import { useState } from "react";



const AnswerDetails = () => {

    const { id } = useParams();
    const { data: answers, error, isPending } = useFetch('http://localhost:4000/intelliq_api/allanswers/' + id);
    const navigate = useNavigate();
    const ids = useState(id)

    return (
        <div>
            <div className='Answers'>
                <div className='row heading'>
                    <h1 className='text-center col'>Answers for questionnaire {ids}</h1>
                    <button className='col text-center home' onClick={() => navigate("/admin")}>Go Back Home</button>
                </div>
            </div>
            <div className="questionnaire-details" >
                {isPending && <div className="text-center">Loading...</div>}
                {error && <div>{error}</div>}
                {answers && answers.map(answers => (
                    <div className="questionnaire-preview1 text-center" key={answers.session} style={{ padding: 0 }}>
                        <Link to={`/answer/${answers.questionnaireID}/${answers.questionID}/${String(answers.optionID)}`}>
                            <div className="car7">
                                <p className="car7"><b>Session:</b> {answers.session}</p>
                                <p><b>Question ID:</b> {answers.questionID}</p>
                                <p><b>Option ID:</b> {answers.optionID}</p>
                                <p><b>Click here for more</b></p>
                            </div>
                        </Link>

                    </div>
                ))}
                <div className="text-center">
                    <button onClick={() => navigate('/allanswers')}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default AnswerDetails;