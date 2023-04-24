import { AnyAction } from "redux";


export const actionLoggerMiddleWare: any = (store: any): any => (next: any): any => (action: AnyAction): any => {
    // Выводим в консоль время события и его содержание
    //console.log(`${new Date().getTime()} | Action: ${action.type} / JSON.stringify(action)`);
    // Передаём событие «по конвейеру» дальше
    return next(action);
};



