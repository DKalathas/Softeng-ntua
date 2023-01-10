import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";

const NextQue = () => {
    const { idsession, qid, nextid } = useParams();
    const [next, setNext] = useState('');
    const [opt, setOpt] = useState('');
    const [queid, setQueid] = useState('');
    const { data: que, error, isPending } = useFetch('http://localhost:4000/intelliq_api/question/' + qid + '/' + nextid);
    const navigate = useNavigate();
    //ok
    const handleSubmit = (e) => {
        e.preventDefault();
        const nextt = { next, opt, queid };
        if (nextt.next !== '-') {
            fetch(`http://localhost:4000/intelliq_api/doanswer/${qid}/${nextt.queid}/${idsession}/${nextt.opt}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
            }).then(
                navigate(`/ques/${idsession}/${qid}/${nextt.next}`))
        } else {
            navigate('/')
        }

    }
    return (
        <div>
            <div className='row heading'>
                <h1 className='text-center col'>Answer the Questionnaire with id :{qid}</h1>
            </div>
            <div className="questionnaire-details" >
                {isPending && <div className="text-center">Loading...</div>}
                {error && <div>{error}</div>}
                {que && que.map(que => (
                    <div key={que.questionnaireID}>
                        <div className="create">
                            <form onSubmit={handleSubmit}>
                                <label> {que.qtext}</label>
                                {que.options && que.options.map(option => (
                                    <div className='box1 text-center car6' key={option.optID}>
                                        {option.opttxt &&

                                            <div key={option.optID}>
                                                <input
                                                    type="radio"
                                                    id="1"
                                                    name="1"
                                                    value={option.nextqID}
                                                    onChange={(e) => {
                                                        setNext(e.target.value);
                                                        setOpt(option.optID)
                                                        setQueid(que.qID)
                                                    }
                                                    }
                                                />
                                                <label htmlFor="1"> {option.opttxt}</label><br />

                                            </div>
                                        }
                                    </div>
                                ))}


                                <div className="text-center">
                                    <button >Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NextQue;