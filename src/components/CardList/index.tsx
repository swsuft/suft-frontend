import React from 'react';
import styled from 'styled-components';
import Card from '../Card';

const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
    
    @media screen and (max-width: 1000px) {
        justify-content: center;
    }
`;

const CardList: React.FC = () => {
    return (
        <Container>
            <Card>
                <h2>제목</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim tincidunt tristique.</p>
            </Card>

            <Card>
                <h2>제목</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim tincidunt tristique.</p>
            </Card>

            <Card>
                <h2>제목</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim tincidunt tristique.</p>
            </Card>
        </Container>
    );
};

export default CardList;
