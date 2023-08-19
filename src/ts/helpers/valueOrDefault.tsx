// Takes a string, and returns the integer if it's greater than defaultValue, else returns defaultValue
export function setToIntValueOrDefault(value: string, defaultValue: number) {
    let intValue = TryParseInt(value, defaultValue);

    return (intValue > defaultValue) ? intValue : defaultValue;
}

// Takes a string, and returns the float if it's greater than defaultValue, else returns defaultValue
export function setToFloatValueOrDefault(value: string, defaultValue: number) {
    let floatValue = TryParseFloat(value, defaultValue);

    return (floatValue > defaultValue) ? floatValue : defaultValue;
}

// Takes a string and tries to turn it into a float, returns the default value if not
function TryParseFloat(value: string, defaultValue: number) {
    if (CommonChecks(value)) {
        let floatValue = parseFloat(value);
        if (!isNaN(floatValue)) {
            return floatValue;
        }
    }

    return defaultValue;
}

// Takes a string and tries to turn it into an integer, returns the default value if not
function TryParseInt(value: string, defaultValue: number) {
    if (CommonChecks(value)) {
        let intValue = parseInt(value);
        if (!isNaN(intValue)) {
            return intValue;
        }
    }

    return defaultValue;
}

function CommonChecks(value: string) {
    if (value !== null) {
        return value.length > 0;
    }

    return false;
}