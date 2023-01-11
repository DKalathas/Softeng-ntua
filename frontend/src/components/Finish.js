import { useNavigate } from "react-router-dom";

const Finish = () => {
    const navigate = useNavigate();
    return(<div className="finish align-middle" onClick={() => navigate('/user')}>
        <h1 className="fin text-center">Thank you for participating!!</h1>
        <footer className="fin1 text-center">Click anywhere to continue...</footer>
    </div>)
}

export default Finish