import { useState } from 'react';

interface Check {
    readonly selected: any;
    readonly selectAll: number;
}

const useSelect = (): [Check, any] => {
    const [check, setCheck] = useState<Check>({
        selected: {},
        selectAll: 0
    } as Check);

    const setRow = {
        toggleRow: (key: any) => {
            const s = check.selected;
            if (s[key] === true) {
                delete s[key];
            } else {
                s[key] = true;
            }

            setCheck({
                selected: s,
                selectAll: 2
            });
        },
        toggleAllRow: (data: any, keyName: string) => {
            const selected = {} as any;

            if (check.selectAll === 0) {
                data!.forEach((x: any) => {
                    selected[x[keyName]] = true;
                });
            }

            setCheck({
                selected,
                selectAll: check.selectAll === 0 ? 1 : 0
            });
        },
        uncheckAllRow: () => {
            setCheck({
                selected: {},
                selectAll: 0
            });
        }
    };

    return [check, setRow];
};

export default useSelect;
