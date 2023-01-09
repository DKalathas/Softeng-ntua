import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const QuesDetails = () => {
    const { idsession, qid } = useParams();
    //const [first, setFirst] = useState('');
    const { data: que, error, isPending } = useFetch('http://localhost:4000/intelliq_api/allquestionnaire/' + qid);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        navigate('/')
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
                                <label> {que.questions[0].qtext}</label>
                                {que.questions[0].options && que.questions[0].options.map(option => (
                                    <div className='box1 text-center car6' key={option.optID}>
                                        {option.opttxt === "<open string>" && <textarea
                                            type="text"
                                            required

                                        ></textarea>}
                                        {option.opttxt !== "<open string>" &&

                                            <div>
                                                <input type="radio" id={option.optID} name={option.opttxt} value={option.optID} />
                                                <label for={option.opttxt}> {option.opttxt}</label><br />

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

export default QuesDetails;