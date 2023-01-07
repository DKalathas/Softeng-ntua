import AnswerList from "./AnswerList";
import useFetch from "./useFetch";

const AllAnswers = () => {

    const { data: questionnaire, isPending, error } = useFetch('http://localhost:4000/intelliq_api/admin/getallquestionanswers')
    return (
        <div>
        <div className="Answers"></div>
        <div className='answers'>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {questionnaire && <AnswerList questionnaire={questionnaire} />}
        </div>
        </div>
    )
}

export default AllAnswers;