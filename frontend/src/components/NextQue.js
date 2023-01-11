import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import Card from 'react-bootstrap/Card';
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
            navigate('/finish')
        }

    }
    return (
        <div>
            <div className='row heading'>
                <h1 className='text-center col ans4'>Answer the Questionnaire with id :{qid}</h1>
            </div>
            <div className="questionnaire-details" >
                {isPending && <div className="text-center">Loading...</div>}
                {error && <div>{error}</div>}
                {que && que.map(que => (
                    <div key={que.questionnaireID}>
                        <div className="create1 text-center">
                            <form onSubmit={handleSubmit}>
                            <Card className="Card"><Card.Body>
                                <label className="questiontxt text-center"> {que.qtext}</label>
                                {que.options && que.options.map(option => (
                                    <div className='text-center option' key={option.optID}>
                                        {option.opttxt &&

                                            <div key={option.optID} className="hov text-center">
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
                                                <label htmlFor="1" className="text-center">{option.opttxt}</label><br />

                                            </div>
                                        }
                                    </div>
                                ))}
                                </Card.Body></Card>
                                <div className="text-center">
                                    <button className="buu">Next</button>
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