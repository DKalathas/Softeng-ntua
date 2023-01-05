import React from 'react';
//import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import QuestionnaireList from './QuestionnaireList';


const All = () => {
    //const navigate = useNavigate();
    const { data: questionnaire, isPending, error } = useFetch('http://localhost:4000/intelliq_api/admin/getallquestionanswers')
    return (

        <div className='Admin'>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {questionnaire && <QuestionnaireList questionnaire={questionnaire} />}
        </div>
    )
};

export default All;