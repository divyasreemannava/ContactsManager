import {useState} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "../styles/login.css"
import dots from "../images/dots.png"
import ecllipse from "../images/ecllipse.png"
import { useEffect } from "react";
import ecllipse1 from "../images/ecllipse1.png"
import {Icon} from "react-icons-kit"
import {eye} from "react-icons-kit/feather/eye"
import {eyeOff} from "react-icons-kit/feather/eyeOff"

const Login = () =>{
    let flag = 1
    const navigate = useNavigate();
    // const [logindata,setData] = useState({email:"",password:""});
    const [error,errorMess] = useState({email:{isValid:true,message:""},password:{isValid:true,message:""}})
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [icon,setIcon] = useState(eyeOff)
    const [type,setType] = useState("password")
    const handleToggle = ()=>{
        if(type==="password"){
            setIcon(eye);
            setType("text")
        }else{
            setIcon(eyeOff);
            setType("password")
        }
    }
    // const [passwordType,setPasswordType] = useState(password)
    async function handleSignIn(e){
        let formData = new FormData();
        e.preventDefault()  
        console.log(formData)
        if(email!==""&& password!==""){
        formData.email = email
        formData.password = password
        
        console.log(formData)
        
        
        }else{
            flag =0;
            alert("Please fill all the details")
        }
        // console.log(user,password)
        await axios({
            method:"POST",
            url:"http://localhost:8000/api/v1/login",
            data:{...formData},
            // redirect:"follow"
        })
        .then(result => {
            flag=1
            window.localStorage.setItem("token",result.data.token);
            console.log(localStorage.getItem("token"))
            console.log(result)
            // console.log(JSON.stringify(result.data.message.message))
        console.log(1);
        })
        .catch(err => {
            // console.log(err.message)
            flag=0
            if(err.message==="Request failed with status code 400"){
                alert("User not found please signup to login")
            }
            if(err.message==="Request failed with status code 401"){
                alert("Incorrect password")
            }
            
        })
        if(flag===1){
            
            navigate("/contacts")
        }       
        
    }
    const handleSignUp = ()=>{
        navigate("/register")
    }
    const checkErrors = (type) => {
        switch(type){

            case "email":
                console.log(email)
                var regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                console.log(!email.match(regex))
                if (!email.match(regex)){
                    errorMess({...error, email:{isValid: false,message: "Please Enter Valid Mail Id"}})
                }else{
                    errorMess({...error, email:{isValid: true,message: ""}})
                }
                break;
            case "password":
                if(password.length<6 || password.length>15){
                    errorMess({...error, password:{isValid: false,message: "Please Enter Valid password"}})
                }else{
                    errorMess({...error, password:{isValid: true,message: ""}})
                }
                break;

                default: return error
        }
    }
    return (
        <div className="loginBox">
            
            <div className="login">
            <h1 className="logo">Logo</h1><br/>
            <p className="text">Enter your credentials to access your account</p>
            <div id = "forms">
                <img src={dots} className="dotsImg1" alt = "dots"/>
                <img src={dots} className="dotsImg2" alt = "dots"/>
                <img src={ecllipse} className="ecllipseimg1" alt = "dots"/>
                <img src={ecllipse1} className="ecllipseimg2" alt = "dots"/>
                {/* <img src={ecllipse} className="ecllipseimg2" alt = "dots"/> */}
                <input type = "email" placeholder="User Id" onChange={(e)=>setEmail(e.target.value)} className="usermail" value = {email} onBlur={(event)=> {checkErrors("email")}}/><br/><br/>
            {!error.email.isValid ? <div className="errorBox" style={{marginLeft:"100px",color:"orangered"}}>Please enter valid mail id</div>:<div className="errorBox"></div>}
            <div className="passwordbox">
                <input type = {type} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="userpassword" value = {password} onBlur={(event)=> {checkErrors("password")}}/> <span onClick={handleToggle}><Icon  className="eye" icon={icon}/></span><br/><br/>
                {!error.password.isValid ? <div className="errorBox"   style={{marginLeft:"-130px",marginTop:"10px",color:"orangered"}}>Please Enter Valid Password</div>:<div className="errorBox"></div>}
                {/* <Circle/> */}
                </div>
                <button onClick={handleSignIn} className="signin">Sign In </button><br/><br/>
                <button onClick={handleSignUp} className="signup">Sign Up </button>
                
            </div>
            
            </div>
        
            {/* <div className="lastText">Don't have an account?Please <span className="request"> Sign Up</span></div> */}
        </div>
    )
}

export default Login