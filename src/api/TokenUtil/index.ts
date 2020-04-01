const LOCALSTORAGE_KEY = 'token';

interface TokenManager {
    readonly isEmpty: () => boolean;
    readonly get: () => string | null;
    readonly set: (token: string) => void;
    readonly remove: () => void;
}

const TokenUtil: TokenManager = {
    isEmpty: (): boolean => {
        return localStorage.getItem(LOCALSTORAGE_KEY) === null;
    },
    get: (): string | null => {
        return localStorage.getItem(LOCALSTORAGE_KEY);
    },
    set: (token: string): void => {
        localStorage.setItem(LOCALSTORAGE_KEY, token);
    },
    remove: (): void => {
        localStorage.removeItem(LOCALSTORAGE_KEY);
    }
};

export default TokenUtil;
