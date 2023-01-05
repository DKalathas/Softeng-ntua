import QuestionnaireDetails from "./QuestionnaireDetails";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const QuestionAll = () => {

    const { id } = useParams();
    const { data: questionnaire, error, isPending } = useFetch('http://localhost:4000/intelliq_api/questionnaire/' + id);

    return (<div className='Admin'>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {questionnaire && <QuestionnaireDetails questionnaire={questionnaire} />}
    </div>);
}

export default QuestionAll;