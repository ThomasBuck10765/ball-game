export default function stringToHash(string: String) {
    var hash = 0;
    const hashValue = parseInt(process.env.REACT_APP_HASH_VALUE ? process.env.REACT_APP_HASH_VALUE : '1');
    const length = string.length;

    if (length === 0) return hash;

    for (let i = 0; i < length; i++) {
        let char = string.charCodeAt(i);

        hash = ((hash << hashValue) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}
