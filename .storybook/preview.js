import { addParameters } from '@storybook/react';

addParameters({
    backgrounds: [
        { name: 'background', value: '#f1f2f6', default: true },
        { name: 'gray-background', value: '#dfe4ea' },
        { name: 'white', value: '#ffffff' }
    ]
});