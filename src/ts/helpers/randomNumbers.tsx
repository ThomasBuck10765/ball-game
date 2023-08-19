export function getRandomInt(min: number, max: number, inclusive?: boolean) {
    if (inclusive) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
