import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Container from '../../utils/ContainerUtils/Container';
import GetToken from '../../utils/GetToken';
import NoStyleLink from '../../atoms/NoStyleLink';
import NoStyleA from '../../atoms/NoStyleA';

const FooterWrapStyle = styled.div`
    display: flex;
    flex: none;
    flex-direction: column;
`;

const FooterStyle = styled.footer`
    background: var(--color-gray-background);
    height: 100px;
`;

const TextWrapStyle = styled.div`
    line-height: 100px;
    
    @media screen and (max-width: 420px) {
        margin: auto 5%;
    }
`;

const TextLeftStyle = styled.div`
    font-family: 'Gugi';
    font-size: 18px;
    float: left;
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
`;

const TextRightStyle = styled.div`
    float: right;
    margin-left: 45px;
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
    font-size: 14px;

    @media screen and (max-width: 420px) {
        margin-left: 16px;
    }
`;

const Footer: React.FC = () => {
    return (
        <FooterWrapStyle>
            <FooterStyle>
                <Container>
                    <TextWrapStyle>
                        <NoStyleLink to="/">
                            <TextLeftStyle>수프트</TextLeftStyle>
                        </NoStyleLink>

                        <NoStyleLink to="/admin" onClick={GetToken}>
                            <TextRightStyle>관리자</TextRightStyle>
                        </NoStyleLink>
                        <NoStyleA href="mailto://admin@skylightqp.kr">
                            <TextRightStyle>문의</TextRightStyle>
                        </NoStyleA>
                        <NoStyleA href="https://github.com/swsuft/suft-frontend" target="_blank" rel="noopener noreferrer">
                            <TextRightStyle><FontAwesomeIcon icon={faGithub}/> GitHub</TextRightStyle>
                        </NoStyleA>
                    </TextWrapStyle>
                </Container>
            </FooterStyle>
        </FooterWrapStyle>
    );
};

export default Footer;
