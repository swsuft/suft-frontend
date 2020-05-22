import React from 'react';
import styled from 'styled-components';
import NoStyleLink from '../../atomics/NoStyleLink';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import SideItem from '../../atomics/SideItem';

const SideContainer = styled.aside`
    display: flex;
    flex-direction: column;
    margin-right: 2.2rem;

    @media screen and (max-width: 420px) {
        margin-right: 0;
    }
`;

const SideListStyle = styled.div`
    border: var(--color-gray-background) solid 1.2px;
    border-radius: 10px;
`;

const FontedTitleStyle = styled(FontedTitle)`
    text-align: center;
`;

interface Item {
    readonly to: string;
    readonly name: string;
}

interface SideMenuProps {
    readonly menuTitle: string;
    readonly items: Item[];
    readonly current: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ menuTitle, items, current }) => {
    return (
        <SideContainer>
            <FontedTitleStyle>{menuTitle}</FontedTitleStyle>
            <SideListStyle>
                {items.map((value) => (
                    <NoStyleLink key={value.to} to={value.to}>
                        {current === value.to ? (
                            <SideItem check>{value.name}</SideItem>
                        ) : (
                            <SideItem>{value.name}</SideItem>
                        )}
                    </NoStyleLink>
                ))}
            </SideListStyle>
        </SideContainer>
    );
};

export default SideMenu;
