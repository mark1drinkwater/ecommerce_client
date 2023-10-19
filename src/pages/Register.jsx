import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import styled from "styled-components";
import { addUser, registerUser } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
`;

const StatusList = styled.ul`
  padding-left: 0px;
  margin-left: 0px;
  margin-top: 10px;
  list-style-type: none;
`;

const StatusItem = styled.li`
    padding-left: 10px;
    margin-left: 0px;
    font-size: 16px;
    font-weight: 500;
`;

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setInputs(prev => {
      return { ...inputs, [e.target.name]: e.target.value }
    });
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const user = { ...inputs };
    // await addUser(dispatch, user);
    // if (!userState.error)
    // window.location.href = '/login';

    //complicated need to fix
    if (user.password === user.confirmPassword) {
      const res = await registerUser(user);
      res.success ?
        window.location.href = '/login' : setErrorMessage(res.message);
    } else {
      // hard copy array
      const errorMessageTemp = [...errorMessage];
      if (!errorMessageTemp.includes("Passwords don't match."))
        errorMessageTemp.push("Passwords don't match.")

      if (!errorMessage.includes("Passwords don't match"))
        setErrorMessage(prev => {
          return [...errorMessage, "Passwords don't match"]
        })
    }

  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input name="firstName" placeholder="First Name" onChange={handleChange} />
          <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
          <Input name="username" placeholder="username" onChange={handleChange} />
          <Input name="email" placeholder="email" onChange={handleChange} />
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <Input type="password" name="confirmPassword" placeholder="confirm password" onChange={handleChange} />

          <StatusList>
            {
              errorMessage?.length > 0 && (
                errorMessage.map((item) => <StatusItem key={item}>{item}</StatusItem>
                ))
            }
          </StatusList>

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;