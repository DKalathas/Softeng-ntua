import React from 'react';
import {useNavigate} from "react-router-dom";

import './Home.css';

function Home() {
    const navigate = useNavigate();

  return (
    <div className="Home text-center">
        <div className='bd row text-center'>
          <div className='col scale-in-center buttons text-center'>
            <div className='size'>Sign in as:</div>
              <button type="button" onClick={()=>navigate("/admin")} className='btn btn1 jello-horizontal'><h2>Admin</h2></button>
              <button type="button" className='btn btn1 jello-horizontal'><h2>User</h2></button>            
          </div>
          <div className='col title text-center scale-in-center'>
            <div className='size1'>intelliQ</div>
          </div>
        </div>
    </div>
  );
}

export default Home;