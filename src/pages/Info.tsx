import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faStickyNote, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import InfoLayout from '../layouts/InfoLayout';
import InfoNoticeBox from '../components/InfoNoticeBox';

const H1TitleStyle = styled.p`
    font-family: 'Gugi';
    font-size: 34px;
    margin: 4px auto;
`;

const H2TitleStyle = styled.p`
    font-weight: 700;
    font-size: 26px;
    margin: 5px auto;
`;

const LineStyle = styled.div`
    margin: 20px auto;
`;

const Info: React.FC = () => {
    return (
        <InfoLayout>
            <br />
            <H1TitleStyle>수프트 Suft</H1TitleStyle>
            <p>수프트(Suft)는 각종 문제풀이(CBT 방식), 위키, 급식 정보 등 학교와 관련된 서비스를 제공합니다.</p>

            <LineStyle />

            <H2TitleStyle>
                <FontAwesomeIcon icon={faStickyNote} size="sm" /> 패치노트
            </H2TitleStyle>

            <InfoNoticeBox year={2019} month={11} day={6}>
                문제 풀이 시 객관식 문제에서 사용 할 수 있는 숫자 버튼(1~5)이 추가되었어요.
                <br/>
                프론트엔드 코드가 공개되었어요.
                <br />
                푸터를 포함한 몇가지 디자인이 수정되었어요.
            </InfoNoticeBox>

            <InfoNoticeBox year={2019} month={10} day={3}>
                자격증 카테고리가 추가되었어요.
                <br />
            </InfoNoticeBox>

            <InfoNoticeBox year={2019} month={9} day={22}>
                자동 로그인이 안되었던 오류가 수정되었어요.
                <br />
                IE 브라우저 사용 시 안내 메세지를 추가했어요.
                <br />
            </InfoNoticeBox>

            <InfoNoticeBox year={2019} month={9} day={8}>
                내부적으로 급식 불러오는 과정이 수정되었어요.
                <br />
                관리자 페이지에 유저 차단 메뉴가 추가되었어요.
                <br />
            </InfoNoticeBox>

            <InfoNoticeBox year={2019} month={9} day={4}>
                급식 불러오는 과정이 최적화 되었어요. 일부 항목에 아이콘이 추가적으로 적용되었어요.
                <br />
                '정보처리와 관리' 과목이 '일반 문제풀이'로 이동되었어요.
                <br />
                마지막으로 UX를 개선했어요.
            </InfoNoticeBox>

            <InfoNoticeBox year={2019} month={9} day={2}>
                이제 급식 메뉴에 오늘, 내일 급식이 표시되요.
            </InfoNoticeBox>

            <InfoNoticeBox year={2019} month={8} day={31}>
                모바일에서 화면이 짤리던 오류가 수정되었어요. 아이콘이 적용되었어요.
                <br />
                수프트 로고 글꼴이 변경되었어요. 로그인 화면에서 위키 바로가기를 추가하였어요.
                <br />
                관리자 페이지 UI를 변경하였어요. 급식 메뉴'만' 추가되었어요.
            </InfoNoticeBox>

            <InfoNoticeBox year={2019} month={8} day={12}>
                소개 페이지가 추가되고 관리 시스템이 개편되었어요. UX가 개선되었어요.
            </InfoNoticeBox>

            <InfoNoticeBox year={2019} month={7} day={24}>
                수프트위키가 런칭되었어요.
            </InfoNoticeBox>

            <InfoNoticeBox year={2019} month={7} day={23}>
                수프트 사이트가 런칭되었어요.
            </InfoNoticeBox>

            <LineStyle />

            <H2TitleStyle>
                <FontAwesomeIcon icon={faUserEdit} size="sm" /> 개발자 & 문제 출제자
            </H2TitleStyle>
            <p>고한혁, 한동진, 하대겸</p>
            <p>하건우, 하선우</p>

            <LineStyle />

            <H2TitleStyle>
                <FontAwesomeIcon icon={faPlusCircle} size="sm" /> 문제 등록 및 기여하기
            </H2TitleStyle>
            <p>문제 출제자를 추가로 받지 않습니다. 추후 문제 등록 및 출제가 오픈됩니다!</p>
        </InfoLayout>
    );
};

export default Info;
