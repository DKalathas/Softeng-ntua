import React from 'react';
//import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import QuestionnaireList from './QuestionnaireList';
import './ALL.css'

const All = () => {
    //const navigate = useNavigate();
    const navigate = useNavigate();
    const { data: questionnaire, isPending, error } = useFetch('http://localhost:4000/intelliq_api/admin/getallquestionanswers')
    return (
        <div>
            <div className='All'>
                <div className='row heading'>
                    <h1 className='text-center col'>Available Questionnaires</h1>
                    <button className='col text-center home' onClick={() => navigate("/admin")}>Go Back</button>
                </div>
            </div>
            <div className='questionnaires'>
                {error && <div>{error}</div>}
                {isPending && <div className='text-center'>Loading...</div>}
                {questionnaire && <QuestionnaireList questionnaire={questionnaire} />}
            </div>
        </div>
    )
};

export default All;