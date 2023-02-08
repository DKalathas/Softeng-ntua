import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from 'react-router-dom';

const Viewall = () => {
    const { idsession, qid } = useParams();
    const { data: answers, error, isPending } = useFetch('http://localhost:4000/intelliq_api/getsessionanswers/' + qid + "/" + idsession);
    const navigate = useNavigate();
    console.log(answers)

    return (
        <div>
            <div className='Answers'>
                <div className='row heading'>
                    <h1 className='text-center col'>Answers for Question id: {qid}</h1>
                </div>
            </div>
            <div className="questionnaire-details" >
                {isPending && <div className="text-center">Loading...</div>}
                {error && <div>{error}</div>}
                {answers && answers.map(answer => (
                    <div>
                        {answer.answers && answer.answers.map(ans =>
                            <div className="questionnaire-preview1 text-center" key={ans.questionnaireID} style={{ padding: 0 }}>
                                <Link to={`/answer/${qid}/${ans.questionID}/${String(ans.ans)}/view`}>
                                    <div className="car7">
                                        <p><b>Question ID:</b> {ans.questionID}</p>
                                        <p><b>Answer ID:</b> {ans.ans}</p>
                                        <p><b>Click here for more</b></p>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
                <div className="text-center">
                    <button onClick={() => navigate('/finish')}>Finish</button>
                </div>
            </div>
        </div>
    );
}

export default Viewall;