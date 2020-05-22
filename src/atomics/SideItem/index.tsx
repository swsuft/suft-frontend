import styled from 'styled-components';

const SideItem = styled.div<{ check?: boolean }>`
    color: var(--color-text);
    cursor: pointer;
    padding: 1rem 2rem;
    white-space: nowrap;
    text-align: center;
    background-color: ${(props) => (props.check ? 'var(--color-gray-background)' : 'initial')};

    &:hover {
        background-color: var(--color-gray-background);
    }
`;

export default SideItem;
