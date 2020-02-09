import React from 'react';
import styled from 'styled-components';
import CardTitle from '../../atomics/Typography/CardTitle';
import { useMeal } from '../../hooks/useMeal';

const MealCardStyle = styled.div`
    width: calc(100% - 3rem);
    height: 14rem;
    background-color: white;
    padding: 1rem;
    margin-bottom: 1rem;

    transition: all 0.1s ease-in-out;

    &:hover {
        box-shadow: 5px 5px 1px var(--color-yellow);
    }

    @media screen and (max-width: 1000px) {
        width: 18rem;
        height: 26rem;
    }
`;

const MealWrapperStyle = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;

const MealBodyStyle = styled.div`
    width: 50%;
    margin-bottom: 1rem;
`;

const MealTextStyle = styled.pre`
    font-family: 'Noto Sans KR', sans-serif;
`;

const MealCard: React.FC = () => {
    const meal = useMeal();

    return (
        <MealCardStyle>
            <MealWrapperStyle>
                <MealBodyStyle>
                    <CardTitle>
                        오늘 급식은?
                    </CardTitle>

                    <MealTextStyle>{meal[0]}</MealTextStyle>
                </MealBodyStyle>
                <MealBodyStyle>
                    <CardTitle>
                        내일 급식은?
                    </CardTitle>
                    <MealTextStyle>{meal[1]}</MealTextStyle>
                </MealBodyStyle>
            </MealWrapperStyle>
        </MealCardStyle>
    );
};

export default MealCard;
