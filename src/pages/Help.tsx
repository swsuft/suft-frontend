import React from 'react';
import styled from 'styled-components';
import DefaultLayout from '../layouts/DefaultLayout';
import FontedTitle from '../atomics/Typography/FontedTitle';
import Container from '../utils/ContainerUtils/Container';

const UlStyle = styled.ul`
    padding-inline-start: 2rem;
`;

const Help: React.FC = () => {
    return (
        <DefaultLayout>
            <Container>
                <FontedTitle>가이드라인</FontedTitle>
                <p>문제 품질을 위해 아래 가이드라인을 지켜야하며 거부 시 강제 삭제되거나 수정될 수 있습니다.</p>
                <br />
                <UlStyle>
                    <li>문제에는 오타가 포함되지 않아야 합니다.</li>
                    <li>마크다운 등 문법 오류로 문제가 비정상적으로 표기되는 일이 없어야 합니다.</li>
                    <li>문제 품질이 너무 낮지 않아야 합니다. (기준은 관리자 재량)</li>
                    <li>비속어, 차별 표현 등 제삼자가 불쾌감을 유발하는 표현이 사용되어서는 안 됩니다.</li>
                    <li>학년, 학기 및 차시, 과목을 해당 문제에 맞게 정확하게 설정해야 합니다.</li>
                    <li>
                        주관식 또는 객관식 복수 정답이 있으면 제출 양식을 내용에 정확하게 표기해야 합니다. (추후 개선)
                    </li>
                    <li>올바르지 않은 정답이 설정되지 않아야 합니다.</li>
                    <li>문제 최상단, 최하단에는 자동으로 여백이 들어가므로 참고하여 출제합니다.</li>
                    <li>문제 기본 글꼴 크기는 약 17px(1.1rem)로 설정됩니다.</li>
                    <li>수프트에서는 문제 저작권에 대한 책임을 지지 않습니다.</li>
                </UlStyle>

                <FontedTitle>자주 묻는 질문</FontedTitle>
                <p>
                    <b>Q. </b> 문제 출제 시 기본 글꼴 크기를 바꿀 수 있나요?
                </p>
                <p>
                    <b>A. </b> 현재 에디터에서는 지원하지 않습니다.
                </p>
                <br />
                <p>
                    <b>Q. </b> 내 문제 페이지에서 낸 문제를 검색이나 정렬 할 수 있나요?
                </p>
                <p>
                    <b>A. </b> 추후 업데이트 예정입니다.
                </p>
                <br />
                <p>
                    <b>Q. </b> 복수 주관식 &middot; 객관식 문제는 어떻게 내나요?
                </p>
                <p>
                    <b>A. </b> 별도의 시스템은 추후 업데이트 예정이며 그전까지는 제출 양식을 내용에 표기해야 합니다.
                </p>
                <br />
                <p>
                    <b>Q. </b> 가이드라인을 어기는(특히 불쾌감을 조성하는 용어 사용) 문제를 봤어요.
                </p>
                <p>
                    <b>A. </b> 수프트 아래 '문의' 버튼을 이용해서 신고해주세요.
                </p>
                <br />
                <p>
                    <b>Q. </b> 문제가 없다고 나와요.
                </p>
                <p>
                    <b>A. </b> 문제를 직접 내서 만들어나갈 수 있습니다.
                </p>
                <br />
                <p>
                    <b>Q. </b> 오류 또는 문제점을 발견하였어요.
                </p>
                <p>
                    <b>A. </b> 수프트 아래 '문의' 버튼을 이용해서 알려주거나 GitHub 이슈 페이지를 이용해주세요.
                </p>
                <br />
                <p>
                    <b>Q. </b> 수프트에 직접 (기술적인) 기여를 하고 싶어요.
                </p>
                <p>
                    <b>A. </b> 수프트 사이트는 오픈소스입니다. GitHub에서 직접 기여해 보세요.
                </p>
                <br />
            </Container>
        </DefaultLayout>
    );
};

export default Help;
