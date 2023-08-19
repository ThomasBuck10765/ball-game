export function getRandomInt(min: number, max: number, inclusive?: boolean, excludeZero?: boolean) {
    if (inclusive) {
        let value = Math.floor(Math.random() * (max - min + 1)) + min;

        if (excludeZero) {
            while (value === 0) {
                value = Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }

        return value;
    } else {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export function getRandomNumber(min: number, max: number, inclusive?: boolean) {
    if (inclusive) {
        return Math.random() * (max - min + 1) + min;
    } else {
        return Math.random() * (max - min) + min;
    }
}
