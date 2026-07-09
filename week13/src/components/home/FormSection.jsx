import React, { useContext, useState } from 'react'
import { ThemeColorContext } from '../../context/context'
import { Button, Card, Title, Wrapper } from '../layout/common';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import { useUserInfoDispatch } from '../../context/UserInfoContext';

const FormSection = () => {
    const mode = useContext(ThemeColorContext);
    const navigate = useNavigate();
    const dispatch = useUserInfoDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birth: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        dispatch({ type: 'SET_USER_INFO', payload: formData });
        navigate('/mypage');
    }

  return (
    <Wrapper>
        <Card>
            <Title>회원 정보 입력</Title>
            <Form name='name' type='text' label='이름' value={formData.name} onChange={handleChange} />
            <Form name='email' type='email' label='이메일' value={formData.email} onChange={handleChange} />
            <Form name='birth' type='date' label='생년월일' value={formData.birth} onChange={handleChange} />
            <Form name='gender' label='성별' value={formData.gender} onChange={handleChange} />

            <Button mode={mode.button} onClick={handleSubmit}>
                    제출하기
            </Button>
        </Card>
    </Wrapper>
  )
}

export default FormSection