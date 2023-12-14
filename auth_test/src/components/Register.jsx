import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRegisterMutation } from '../apis/authApis';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setUser } from '../slices/userSlice';


function Register() {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [file,setFile] = useState();

    const [register] = useRegisterMutation();
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
       const formData = new FormData();
        formData.append('name', name);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('file', file);
        
    try {
     const result =   await register(formData).unwrap();
        dispatch(setUser({...result}))
           toast.success("registered successfully"); 
           navigate('/')      
    } catch(err) {
       await toast.error(err?.data?.message || err.error);
    }
    }
    return (
     <>
        <h1 style={{ width: "30%", margin: "auto" }}>Register</h1>
        <Form style={{ width: "50%", margin: "auto" }} onSubmit={handleSubmit} encType='multipart/formdata'>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" onChange={e=>setName(e.target.value)}/>
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="formBasicFile">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={e=>setFile(e.target.files[0])} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    </>
    );

}

export default Register