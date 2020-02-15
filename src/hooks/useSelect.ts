import { useState } from 'react';

type NumberType = 0 | 1 | 2;

interface Check {
    readonly selected: { [key: string]: boolean };
    readonly selectAll: NumberType;
}

interface SelectManager {
    readonly toggleRow: (key: any) => void;
    readonly toggleAllRow: (rowData: any, rowDataKey: string) => void;
    readonly uncheckAllRow: () => void;
}

const useSelect = (): [Check, SelectManager] => {
    const [check, setCheck] = useState<Check>({
        selected: {},
        selectAll: 0
    } as Check);

    const manager: SelectManager = {
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
        toggleAllRow: (rowData: any, rowDataKey: string) => {
            const { selected, selectAll } = check;

            if (selectAll === 0) {
                rowData!.forEach((eachData: any) => {
                    const key = eachData[rowDataKey];
                    selected[key] = true;
                });
            }

            setCheck({
                selected,
                selectAll: selectAll === 0 ? 1 : 0
            });
        },
        uncheckAllRow: () => {
            setCheck({
                selected: {},
                selectAll: 0
            });
        }
    };

    return [check, manager];
};

export default useSelect;
