import React from 'react';
import styled from 'styled-components';
import CardTitle from '../../atomics/Typography/CardTitle';
import { useMeal } from '../../hooks/useMeal';
import DayTag from '../../atomics/DayTag';
import useDay from '../../hooks/useDay';
import Card from '../Card';

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

    @media screen and (max-width: 1000px) {
        width: 100%;
    }
`;

const MealTextStyle = styled.pre`
    font-family: 'Noto Sans KR', sans-serif;
`;

const MealCard: React.FC = () => {
    const meal = useMeal();
    const [today, tomorrow] = useDay();

    return (
        <Card pcWidth="calc(100% - 3rem)" pcHeight="14rem" mobileWidth="18rem" mobileHeight="26rem">
            <MealWrapperStyle>
                <MealBodyStyle>
                    <CardTitle>
                        오늘 급식은?&nbsp;
                        <DayTag>{today}일</DayTag>
                    </CardTitle>

                    <MealTextStyle>{meal[0]}</MealTextStyle>
                </MealBodyStyle>
                <MealBodyStyle>
                    <CardTitle>
                        내일 급식은?&nbsp;
                        <DayTag>{tomorrow}일</DayTag>
                    </CardTitle>
                    <MealTextStyle>{meal[1]}</MealTextStyle>
                </MealBodyStyle>
            </MealWrapperStyle>
        </Card>
    );
};

export default MealCard;
