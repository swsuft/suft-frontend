import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import BackIcon from '../../../atomics/Icons/BackIcon';
import FontedMiddleText from '../../../atomics/Typography/FontedMiddleText';

const BackContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;

interface LicenseModalProps {
    readonly state: [boolean, Dispatch<SetStateAction<boolean>>];
}

const LicenseModal: React.FC<LicenseModalProps> = ({ state }) => {
    const [isOpen, setOpen] = state;

    const onCloseModal = () => {
        setOpen(false);
    };

    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onCloseModal}
          contentLabel="Example Modal"
          style={{
                overlay: {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)'
                },
                content: {
                    margin: '0 auto',
                    width: '40%',
                    height: '200px'
                }
            }}
        >
            <BackContainer>
                <BackIcon onClick={onCloseModal} />
            </BackContainer>

            <FontedMiddleText>라이센스</FontedMiddleText>
            <p>
                Icons made by{' '}
                <a href="https://www.flaticon.com/authors/freepik" target="_blank" rel="noreferrer noopener">
                    Freepik
                </a>{' '}
                from{' '}
                <a href="https://www.flaticon.com/" target="_blank" rel="noreferrer noopener">
                    www.flaticon.com
                </a>
            </p>
        </Modal>
    );
};

export default LicenseModal;
