import React, { useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../../constants/config';
import RegisterHeaderText from './RegisterHeaderText';
import RegisterButton from './RegisterButton';
import RegisterFooterText from './RegisterFooterText';

const InputStyle = styled.input`
    border: none;
    border-radius: 20px;
    width: 95%;
    height: 46px;
    padding-left: 20px;
    margin-bottom: 10px;
    background-color: white;    
`;

const SelectStyle = styled.select`
    border: none;
    border-radius: 20px;
    width: 100%;
    height: 46px;
    padding-left: 20px;
    appearance: none;
    margin-bottom: 10px;
    background-color: white;
`;

const InfoTextStyle = styled.p`
    font-size: 14px;
    margin-left: 12px;
    color: var(--color-text);
`;

const RegisterWrapperStyle = styled.div`
    margin: 32px auto;
`;

const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');

    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setGrade(evt.target.value);
    };

    const onRegisterButtonClick = () => {
        const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
        const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (email === '' || password === '' || rePassword === '' || name === '' || grade === '') {
            alert('빈 칸이 존재합니다.');
        } else if (password !== rePassword) {
            alert('비밀번호가 일치 하지 않습니다.');
        } else if (!emailRegExp.test(email)) {
            alert('올바른 이메일이 아닙니다.');
        } else if (password !== rePassword) {
        } else if (!pwRegExp.test(password)) {
            alert('비밀번호는 영문자, 특수문자, 숫자가 포함되어야 하며 최소 6글자이여야합니다.');
        } else {
            axios
                .post(`${config.ENDPOINT}/register`, {
                    email,
                    password,
                    name,
                    grade
                })
                .then((data) => {
                    if (!data.data.success) {
                        alert(data.data.message);
                    } else {
                        alert('회원가입이 완료되었습니다!\n메인 페이지로 이동합니다.');
                        history.push('/');
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };

    return (
        <div>
            <RegisterHeaderText/>

            <RegisterWrapperStyle>
                <InfoTextStyle>이메일</InfoTextStyle>
                <InputStyle value={email} type="email" placeholder="사용할 이메일을 입력해주세요." onChange={(evt) => setEmail(evt.target.value)}/>

                <InfoTextStyle>
                    비밀번호 (최소 6글자 이상, 영문자, 숫자, 특수문자 포함)
                </InfoTextStyle>
                <InputStyle value={password} type="password" placeholder="조건에 맞는 비밀번호를 입력해주세요." onChange={(evt) => setPassword(evt.target.value)}/>
                <InputStyle value={rePassword} type="password" placeholder="확인을 위해 한 번 더 비밀번호를 입력해주세요." onChange={(evt) => setRePassword(evt.target.value)}/>

                <InfoTextStyle>이름</InfoTextStyle>
                <InputStyle value={name} type="text" placeholder="자신의 실명을 입력해주세요." onChange={(evt) => setName(evt.target.value)}/>

                <InfoTextStyle>학년</InfoTextStyle>
                <SelectStyle value={grade} onChange={onSelectChange}>
                    <option value="1">1학년</option>
                    <option value="2">2학년</option>
                    <option value="3">3학년</option>
                </SelectStyle>
            </RegisterWrapperStyle>

            <RegisterButton onClick={onRegisterButtonClick}/>

            <RegisterFooterText/>
        </div>
    );
};

export default withRouter(Register);
