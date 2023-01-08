import AnswerList from "./AnswerList";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";


const AllAnswers = () => {
    const navigate = useNavigate();
    const { data: questionnaire, isPending, error } = useFetch('http://localhost:4000/intelliq_api/admin/getallquestionanswers')
    return (
        <div>
        <div className='Answers'>
                <div className='row heading'>
                    <h1 className='text-center col'>Pick a questionnaire</h1>
                    <button className='col text-center home' onClick={() => navigate("/admin")}>Go Back</button>
                </div>
            </div>
        <div className='answers'>
            {error && <div>{error}</div>}
            {isPending && <div className="text-center">Loading...</div>}
            {questionnaire && <AnswerList questionnaire={questionnaire} />}
        </div>
        </div>
    )
}

export default AllAnswers;