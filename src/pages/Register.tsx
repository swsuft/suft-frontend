import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import config from '../config/main';

const MenuStyle = styled.div`
    width: 800px;
    height: 690px;
    background-color: #ffffff;
    border-radius: 30px;
    box-shadow: 5px 5px 20px 5px #cbcbcb;
    text-align: center;

    @media screen and (max-width: 420px) {
        width: 80vw;
        height: 690px;
    }
`;

const MenuTitleStyle = styled.div`
    font-family: 'Gugi';
    font-size: 40px;
    padding-top: 25px;
`;

const InputStyle = styled.input`
    border: none;
    border-radius: 20px;
    width: 50%;
    height: 45px;
    padding-left: 20px;
    margin-bottom: 20px;
    background-color: var(--color-background);
`;

const SelectStyle = styled.select`
    border: none;
    border-radius: 20px;
    width: 52%;
    height: 45px;
    padding-left: 20px;
    appearance: none;
    margin-bottom: 10px;
    background-color: var(--color-background);
`;

const ButtonStyle = styled.button`
    width: 35%;
    height: 45px;
    margin-bottom: 10px;

    font-size: 18px;
    font-weight: 700;

    border: none;
    border-radius: 20px;

    color: #000;
    background-color: var(--color-yellow);
    cursor: pointer;
`;

const BackPageTextStyle = styled(Link)`
    font-size: 15px;
    color: #747d8c;
    text-decoration: none;
    transition: all 200ms ease;

    &:hover {
        color: var(--color-yellow);
        cursor: pointer;
    }
`;

const EmptyLineStyle = styled.div<{ amount: number }>`
    margin-bottom: ${(props) => props.amount}px;
`;

const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [rePw, setRePw] = useState('');
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');

    const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.placeholder === '이메일') {
            setEmail(evt.target.value);
        } else if (evt.target.placeholder === '비밀번호') {
            setPw(evt.target.value);
        } else if (evt.target.placeholder === '비밀번호 확인') {
            setRePw(evt.target.value);
        } else if (evt.target.placeholder === '이름(실명)') {
            setName(evt.target.value);
        }
    };

    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setGrade(evt.target.value);
    };

    const onRegisterButtonClick = () => {
        const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
        const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (email === '' || pw === '' || rePw === '' || name === '' || grade === '') {
            alert('빈 칸이 존재합니다.');
        } else if (pw !== rePw) {
            alert('비밀번호가 일치 하지 않습니다.');
        } else if (!emailRegExp.test(email)) {
            alert('올바른 이메일이 아닙니다.');
        } else if (!pwRegExp.test(pw)) {
            alert('비밀번호는 영문자, 특수문자, 숫자가 포함되어야 하며 최소 6글자이여야합니다.');
        } else {
            axios
                .post(`${config.endpoint}/register`, {
                    email,
                    password: pw,
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
        <MainLayout>
            <MenuStyle>
                <MenuTitleStyle>수프트</MenuTitleStyle>
                <h2>회원가입</h2>

                <EmptyLineStyle amount={20} />

                <p>이메일</p>
                <InputStyle value={email} type="email" placeholder="이메일" onChange={onInputChange} />

                <p>
                    비밀번호
                    <br />
                    (영문자, 숫자, 특수문자 포함 / 최소 6글자)
                </p>
                <InputStyle value={pw} type="password" placeholder="비밀번호" onChange={onInputChange} />
                <InputStyle value={rePw} type="password" placeholder="비밀번호 확인" onChange={onInputChange} />

                <p>이름</p>
                <InputStyle value={name} type="text" placeholder="이름(실명)" onChange={onInputChange} />

                <p>학년</p>
                <SelectStyle value={grade} onChange={onSelectChange}>
                    <option value="" placeholder="학년">
                        클릭하여 학년을 선택해주세요.
                    </option>
                    <option value="1">1학년</option>
                    <option value="2">2학년</option>
                    <option value="3">3학년</option>
                </SelectStyle>

                <EmptyLineStyle amount={10} />

                <ButtonStyle onClick={onRegisterButtonClick}>회원가입</ButtonStyle>
                <br />
                <BackPageTextStyle to="/">돌아가기</BackPageTextStyle>
            </MenuStyle>
        </MainLayout>
    );
};

export default withRouter(Register);
