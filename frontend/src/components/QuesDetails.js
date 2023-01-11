import { useParams, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import useFetch from "./useFetch";
import { useState } from "react";

const QuesDetails = () => {
    const { idsession, qid } = useParams();
    const [next, setNext] = useState('');
    const [opt, setOpt] = useState('');
    const [queid, setQueid] = useState('');
    const { data: que, error, isPending } = useFetch('http://localhost:4000/intelliq_api/allquestionnaire/' + qid);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const nextt = { next, opt, queid };
        fetch(`http://localhost:4000/intelliq_api/doanswer/${qid}/${nextt.queid}/${idsession}/${nextt.opt}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        }).then(
            navigate(`/ques/${idsession}/${qid}/${nextt.next}`))

    }
    console.log(next,opt,queid);
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
                           <Card className="Card">
                            <Card.Body>
                                <label className="questiontxt">{que.questions[0].qtext}</label>
                                {que.questions[0].options && que.questions[0].options.map(option => (
                                    <div className='text-center option' key={option.optID}>
                                        {option.opttxt === "<open string>" && <textarea
                                            type="text"
                                            required
                                            onChange={(e) => {
                                                setNext(e.target.value);
                                                setOpt(option.optID)
                                                setQueid(que.questions[0].qID)
                                            }
                                            }
                                        />}
                                        {option.opttxt !== "<open string>" &&

                                            <div key={option.optID} className="hov">
                                                <input
                                                    type="radio"
                                                    id="1"
                                                    name="1"
                                                    value={option.nextqID}
                                                    onChange={(e) => {
                                                        setNext(e.target.value);
                                                        setOpt(option.optID)
                                                        setQueid(que.questions[0].qID)
                                                    }
                                                    }
                                                />
                                                <label htmlFor="1">{option.opttxt}</label><br />

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

export default QuesDetails;