'use strict';

QUnit.module("Тестируем функцию deepMerge", function() {
    QUnit.test("Работает правильно с вложенными объектами", function(assert) {
        const source = {
            user: {
                name: "Alice",
                age: 25,
                address: {
                    city: "Wonderland",
                    zip: 12345
                }
            },
            hobbies: ["reading", "gaming"]
        };

        const target = {
            user: {
                age: 30,
                address: {
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const expected = {
            user: {
                name: "Alice",
                age: 30,
                address: {
                    city: "Wonderland",
                    zip: 12345,
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно работать правильно с вложенными объектами");
    });

    QUnit.test("Работает правильно с невложенными объектами", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
        };

        const target = {
            age: 30,
            isInWonderland: true,
        };

        const expected = {
            name: "Алиса",
            age: 30,
            isInWonderland: true,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно правильно перезаписывать ключи");
    });

    QUnit.test("Работает с пустым исходным объектом", function(assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const target = {};

        const expected = {
            name: "Алиса",
            age: 25,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать исходный объект при отсутствии второго");
    });

QUnit.test("Работает с глубокой вложенностью", function(assert) {
    const source = {
        a: {
            b: {
                c: {
                    d: 1,
                    e: 2
                }
            }
        }
    };

    const target = {
        a: {
            b: {
                c: {
                    e: 3,
                    f: 4
                }
            }
        }
    };

    const expected = {
        a: {
            b: {
                c: {
                    d: 1,
                    e: 3,
                    f: 4
                }
            }
        }
    };

    const result = deepMerge(source, target);
    assert.deepEqual(result, expected, "Должно рекурсивно объединять объекты на любой глубине");
});

    QUnit.test("Перезаписывает значение возраста age из target", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
            city: "Wonderland"
        };

        const target = {
            age: 30
        };

        const expected = {
            name: "Алиса",
            age: 30,
            city: "Wonderland"
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Возраст age из target должен перезаписать значение из source");
    });
});