import AnswerList from "./AnswerList";
import useFetch from "./useFetch";

const AllAnswers = () => {

    const { data: questionnaire, isPending, error } = useFetch('http://localhost:4000/intelliq_api/admin/getallquestionanswers')
    return (

        <div className='Admin'>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {questionnaire && <AnswerList questionnaire={questionnaire} />}
        </div>
    )
}

export default AllAnswers;