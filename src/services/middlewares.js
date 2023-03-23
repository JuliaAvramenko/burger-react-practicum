

export const actionLoggerMiddleWare = store => next => action => {
    // Выводим в консоль время события и его содержание
    console.log(`${new Date().getTime()} | Action: ${JSON.stringify(action)}`);
    // Передаём событие «по конвейеру» дальше
    return next(action);
};