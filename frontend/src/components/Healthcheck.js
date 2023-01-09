import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";



const Healthcheck = () => {
    const navigate = useNavigate();
    const { data: stat, isPending, error } = useFetch('http://localhost:4000/intelliq_api/admin/healthcheck')
    console.log(typeof stat)
    return(
        <div>
        {isPending && <div className='text-center'>Loading...</div>}
        {error && <div>{error}</div>}
        {stat && <div className="text-center car8"><p><h2>Everything seems <b>{stat.status}</b> !!</h2></p></div>}
        <div className="questionnaire-details">
            <div className="text-center car6">
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    </div>
    </div>
    );
}

export default Healthcheck;