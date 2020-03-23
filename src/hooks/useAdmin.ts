import { useEffect, useState } from 'react';
import { useProfile } from './useProfile';

const useAdmin = (): boolean => {
    const profile = useProfile();
    const [isAdmin, setBeAdmin] = useState<boolean>(false);

    useEffect(() => {
        if (profile.data !== undefined && profile.data.isAdmin) {
            setBeAdmin(true);
        }
    }, [profile]);

    return isAdmin;
};

export default useAdmin;
