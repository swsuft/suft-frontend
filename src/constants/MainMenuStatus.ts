type EnumLiteralsOf<T extends object> = T[keyof T];

const MainMenuStatus = Object.freeze({
    MEAL_MENU: 0 as 0,
    BASIC_SUBJECT_MENU: 1 as 1,
    MAJOR_SUBJECT_MENU: 2 as 2,
    PREPARING_MENU: 3 as 3
});
export type MainMenuStatusType = EnumLiteralsOf<typeof MainMenuStatus>;

export default MainMenuStatus;
