type EnumLiteralsOf<T extends object> = T[keyof T];

const AdminMenuStatus = Object.freeze({
    ADMIN_PROBLEM: 0 as 0,
    ADMIN_VIEW: 1 as 1,
    ADMIN_USERBLOCK: 2 as 2,
    ADMIN_WAITINGUSER: 3 as 3
});
export type AdminMenuStatusType = EnumLiteralsOf<typeof AdminMenuStatus>;

export default AdminMenuStatus;
