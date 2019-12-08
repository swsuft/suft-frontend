import { useEffect, useState } from 'react';

const useWidth = () => {
    const [width, setWidth] = useState<number>(1024);

    useEffect(() => {
        const handle = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handle);

        return () => {
            window.removeEventListener('resize', handle);
        };
    }, []);

    return width;
};

export default useWidth;
