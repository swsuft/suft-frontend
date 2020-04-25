import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Container from '../../utils/ContainerUtils/Container';
import NoStyleLink from '../../atomics/NoStyleLink';
import NoStyleA from '../../atomics/NoStyleA';
import LicenseModal from '../Modals/LicenseModal';

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

    @media screen and (max-width: 1000px) {
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

    @media screen and (max-width: 1000px) {
        margin-left: 16px;
    }
`;

const Footer: React.FC = () => {
    const licenseModalState = useState<boolean>(false);
    const [, setLicenseModalOpen] = licenseModalState;

    return (
        <FooterWrapStyle>
            <FooterStyle>
                <Container>
                    <TextWrapStyle>
                        <NoStyleLink to="/">
                            <TextLeftStyle>수프트</TextLeftStyle>
                        </NoStyleLink>

                        <NoStyleLink to="/admin">
                            <TextRightStyle>관리자</TextRightStyle>
                        </NoStyleLink>
                        <NoStyleA href="mailto://admin@skylightqp.kr">
                            <TextRightStyle>문의</TextRightStyle>
                        </NoStyleA>
                        <TextRightStyle onClick={() => setLicenseModalOpen(true)}>라이센스</TextRightStyle>
                        <NoStyleA
                          href="https://github.com/swsuft/suft-frontend"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                            <TextRightStyle>
                                <FontAwesomeIcon icon={faGithub} />
                            </TextRightStyle>
                        </NoStyleA>
                    </TextWrapStyle>
                </Container>
            </FooterStyle>

            <LicenseModal state={licenseModalState} />
        </FooterWrapStyle>
    );
};

export default Footer;
