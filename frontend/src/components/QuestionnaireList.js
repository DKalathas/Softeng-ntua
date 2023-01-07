import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';


const QuestionnaireList = ({ questionnaire }) => {
    return (
        <div className="questionnaire-list">
            <Carousel>
            {questionnaire.map(questionnaire => (
                <Carousel.Item>
                <div className="questionnaire-preview" key={questionnaire.questionnaireID} >
                    <Link to={`/questionnaire/${questionnaire.questionnaireID}`}>
                        <h3 className='ID-car'>{questionnaire.questionnaireID}</h3>
                        <p className='Title-car'><b>{"Title : " + questionnaire.questionnaireTitle}</b></p>
                        <p className='Key-car'><b>{"Keywords : " + questionnaire.keywords.join(", ")}</b></p>
                    </Link>
                </div>
                </Carousel.Item>
            ))}
            </Carousel>
        </div>);
}

export default QuestionnaireList;