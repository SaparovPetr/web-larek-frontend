/** ПП
 * Импортируется интерфейс событий приложения IEvents.
 */

import {IEvents} from "./events";

// Гарда для проверки на модель
/** ПП
 * Описывается функция isModel, которая проверяет, является ли переданный объект экземпляром класса Model. Это нужно чтобы отличать модели от простых объектов.
 */
export const isModel = (obj: unknown): obj is Model<any> => {
    return obj instanceof Model;
}

/**
 * Базовая модель, чтобы можно было отличить ее от простых объектов с данными
 */
export abstract class Model<T> {
    constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }

    // Сообщить всем что модель поменялась
    /** ПП
     * метод emitChanges, который публикует событие об изменении модели, чтобы все подписчики обновились. */
    emitChanges(event: string, payload?: object) {
        // Состав данных можно модифицировать
        this.events.emit(event, payload ?? {});
    }

    // далее можно добавить общие методы для моделей
}