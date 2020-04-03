import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Container from '../../utils/ContainerUtils/Container';
import UpdateEditor from '../../components/AdminEditor/UpdateEditor';
import AdminEditLayout from '../../layouts/AdminEditLayout';

const TitleStyle = styled.h1`
    margin: 1rem auto;
`;

const BackStyle = styled.span`
    cursor: pointer;
    font-weight: normal;
    font-size: 20px;
    float: right;
`;

const AdminEdit: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
    const { id } = match.params;

    const onBackClick = () => history.goBack();

    return (
        <AdminEditLayout>
            <Container>
                <TitleStyle>
                    {id}번 문제 수정{' '}
                    <BackStyle onClick={onBackClick}>
                        <FontAwesomeIcon icon={faArrowLeft} /> 뒤로가기
                    </BackStyle>
                </TitleStyle>

                <UpdateEditor id={id} />
                <br />
            </Container>
        </AdminEditLayout>
    );
};

export default withRouter(AdminEdit);
