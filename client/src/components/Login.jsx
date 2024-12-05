import React, {  useState } from 'react'
import "./Login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Login = () => {
     const url="http://localhost:5000"
     const navigate=useNavigate();
     const [currState,setCurrState]=useState("Sign Up")
     const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandle=(e)=>{
       const name=e.target.name;
       const value=e.target.value;
       setData(data=>({...data,[name]:value}))
    }


    const onLogin=async(e)=>{
      e.preventDefault();
      let newUrl=url;
       if(currState==="Login"){
         newUrl+="/api/user/login"
       }else{
         newUrl+="/api/user/register"
       }

       const res=await axios.post(newUrl,data);
       
       if(res.data.success){
           navigate("/home")
       }else{
         alert(res.data.message)
       }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin}  className="login-popup-container">
             <div className="login-popup-title">
                <h2>{currState}</h2>
             </div>
             <div className="login-popup-inputs">
                {currState==="Login"
                ?<></>
                :<input name='name' onChange={onChangeHandle} value={data.name} type="text" placeholder='Your name' required />
                }
                <input name='email' onChange={onChangeHandle} value={data.email}  type="email" placeholder='Your email' required/>
                <input name='password' onChange={onChangeHandle} value={data.password}   type="password" placeholder='Password' required/>
             </div>
             <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
             
             {currState==="Login"
             ?<p>Create a New account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
             :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
             }
        </form>
    </div>
  )
}

export default Login
