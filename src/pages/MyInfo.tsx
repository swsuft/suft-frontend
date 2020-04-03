import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import DefaultLayout from '../layouts/DefaultLayout';
import FontedTitle from '../atomics/Typography/FontedTitle';
import Input from '../atomics/Input';
import LabelText from '../atomics/Typography/LabelText';
import Select from '../atomics/Select';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';
import SquareButton from '../atomics/SquareButton';
import { useProfile } from '../hooks/useProfile';
import ErrorCode from '../error/ErrorCode';
import UserApi from '../api/User';

const BodyStyle = styled.div`
    margin: 32px auto;
`;

const MyInfo: React.FC<RouteComponentProps> = ({ history }) => {
    const profile = useProfile();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('1');

    useEffect(() => {
        if (profile.data === undefined) return;

        setEmail(profile!.data.email);
        setName(profile!.data.name);
        setGrade(profile!.data.grade);
    }, [profile]);

    const updateMyInfo = () => {
        const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;

        if (password === '') {
            cogoToast.warn('현재 비밀번호를 입력하지 않았습니다.');
        } else if (newPassword !== '' && newPassword !== rePassword) {
            cogoToast.warn('변경하려는 비밀번호가 일치 하지 않습니다.');
        } else if (newPassword !== '' && password === newPassword) {
            cogoToast.warn('변경하려는 비밀번호가 기존과 동일합니다.');
        } else if (newPassword !== '' && !pwRegExp.test(newPassword)) {
            cogoToast.warn('비밀번호는 영문자, 특수문자, 숫자가 포함되어야 하며 최소 6글자이여야합니다.');
        } else {
            UserApi.update(profile.data!.email, password, newPassword === '' ? undefined : newPassword, grade)
                .then(() => {
                    cogoToast.success('내 정보가 수정되었습니다!');
                    history.push('/');
                    window.location.reload();
                })
                .catch((err) => {
                    const { code } = err.response.data;
                    if (code === ErrorCode.PW_NOT_MATCH) {
                        cogoToast.error('비밀번호가 올바르지 않습니다.');
                    }
                });
        }
    };

    return (
        <DefaultLayout>
            <CenterContainer>
                <div>
                    <FontedTitle>내 정보</FontedTitle>

                    <BodyStyle>
                        <LabelText>이메일 (이메일은 변경 할 수 없습니다.)</LabelText>
                        <Input value={email} disabled />

                        <LabelText>이름 (이름은 변경 할 수 없습니다.)</LabelText>
                        <Input value={name} disabled />

                        <LabelText>현재 비밀번호</LabelText>
                        <Input value={password} type="password" placeholder="내 정보 변경 시 현재 비밀번호를 입력해주세요." onChange={(e) => setPassword(e.target.value)} />

                        <LabelText>비밀번호 변경</LabelText>
                        <Input value={newPassword} type="password" placeholder="비밀번호 변경 시 입력해주세요." onChange={(e) => setNewPassword(e.target.value)} />
                        <Input value={rePassword} type="password" placeholder="확인을 위해 한 번 더 비밀번호를 입력해주세요." onChange={(e) => setRePassword(e.target.value)} />

                        <LabelText>학년</LabelText>
                        <Select value={grade} onChange={(e) => setGrade(e.target.value)} width="100%">
                            <option value="1">1학년</option>
                            <option value="2">2학년</option>
                            <option value="3">3학년</option>
                        </Select>
                    </BodyStyle>

                    <SquareButton onClick={updateMyInfo}>
                        <FontAwesomeIcon icon={faPen} /> 수정하기
                    </SquareButton>
                </div>
            </CenterContainer>
        </DefaultLayout>
    );
};

export default withRouter(MyInfo);
