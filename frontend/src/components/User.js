import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import QuesList from "./QuesList";
import { v4 as uuid } from 'uuid';


const Ques = () => {
    const navigate = useNavigate();
    const unique_id = uuid();
    const { data: questionnaire, isPending, error } = useFetch('http://localhost:4000/intelliq_api/admin/getallquestionanswers')

    return (
        <div>
            <div className='Answers'>
                <div className='row heading'>
                    <h1 className='text-center col'>Pick a questionnaire</h1>
                    <button className='col text-center home' onClick={() => navigate("/")}>Go Back Home</button>
                </div>
            </div>
            <div className='answers'>
                {error && <div>{error}</div>}
                {isPending && <div className="text-center">Loading...</div>}
                {questionnaire && <p className='text-center col'> Your session id is: {unique_id} </p>}
                {questionnaire && <QuesList questionnaire={questionnaire} idsession={unique_id} />}
            </div>
        </div>
    )
}

export default Ques;