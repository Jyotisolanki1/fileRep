import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setUser } from '../slices/userSlice';
import { useLoginMutation } from '../apis/authApis';


function Login() {
   
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
     
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector(state=>state.user);


    useEffect(() => {
        if (userInfo) {
          navigate('/');
        }
      }, [navigate, userInfo]);

    const handleSubmit = async(e)=>{
     e.preventDefault();       
    try {
     const result =   await login({email,password}).unwrap();
        dispatch(setUser({...result}))
           toast.success("login successfully"); 
           navigate('/')      
    } catch(err) {
        await toast.error(err?.data?.message || err.error);
    }
    }
    return (
     <>
        <h1 style={{ width: "30%", margin: "auto" }}>Register</h1>
        <Form style={{ width: "50%", margin: "auto" }} onSubmit={handleSubmit} >
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
            </Form.Group>
           
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Login
            </Button>
        </Form>
    </>
    );

}

export default Login