'use strict';

/**
 * Функция, которая глубоко объединяется два объекта в один.
 * 
 * Если оба объекта содержат одинаковые ключи, и значения по этим ключам 
 * являются объектами, то они должны быть объединены рекурсивно. Если 
 * значения не являются объектами, то значение из второго объекта должно 
 * перезаписывать значение из первого.
 * 
 * @param {Object} source - исходный объект
 * @param {Object} target - целевой объект, значения которого имеют приоритет
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
    const merged = {...source};

    if (target === null || typeof target !== 'object') {
        return merged;
    }

    for (const key of Object.keys(target)) {
        const sourceValue = source[key];
        const targetValue = target[key];

        const isSourceObj = sourceValue !== null
            && typeof sourceValue === 'object'
            && !Array.isArray(sourceValue);

        const isTargetObj = targetValue !== null
            && typeof targetValue === 'object'
            && !Array.isArray(targetValue);
        
        if (isSourceObj && isTargetObj) {
            merged[key] = deepMerge(sourceValue, targetValue);
        } else {
            merged[key] = targetValue;
        }
    }

    return merged;
}