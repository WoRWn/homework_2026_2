'use strict';

/**
 * Проверяет, является ли значение объектом, который подходит для рекурсивного 
 * объединения (не массив, не null и не примитив).
 *
 * @param {*} value - проверяемое значение
 * @returns {boolean} `true`, если value - объект
 *
 * @example
 * // returns true
 * isValueObject({});    
 *    
 * @example 
 * // returns false
 * isValueObject(null);
 * 
 * @example
 * // returns false
 * isValueObject(42);        
 */
const isValueObject = (value) => (value !== null && typeof value === 'object' && !Array.isArray(value));

/**
 * Функция, которая глубоко объединяется два объекта в один.
 * 
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам 
 * являются объектами, то они должны быть объединены рекурсивно. Если 
 * значения не являются объектами, то значение из второго объекта должно 
 * перезаписывать значение из первого.
 * 
 * @param {*} source - исходный объект; некорректные значения заменяются на {}
 * @param {*} target - целевой объект, значения которого имеют приоритет; некорректные значения игнорируются
 * 
 * @example
 * // returns { a: 1, b: { c: 3, d: 4 } }
 * deepMerge({ a: 1, b: { c: 3 } }, { b: { d: 4 } });
 * 
 * @example
 * // returns { a: 2, b: 3 }
 * deepMerge({ a: 1, b: 3 }, { a: 2 });
 * 
 * @returns {Object} - новый объект, содержащий объединенные свойства
 */
const deepMerge = (source, target) => {
    const safeSource = isValueObject(source) ? source : {};
    const merged = {...safeSource};

    if (!isValueObject(target)) {
        return merged;
    }

    return Object.entries(target).reduce(
        (merged, [key, targetValue]) => {
            const sourceValue = safeSource[key];

            merged[key] = isValueObject(sourceValue) && isValueObject(targetValue) 
                ? deepMerge(sourceValue, targetValue) 
                : targetValue;
            return merged;
        }, merged
    );
}
