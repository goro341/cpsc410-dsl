
const replaceAll = (target: string, search: string, replacement: string) => {
    return target.replace(new RegExp(search, 'g'), replacement);
};

export {replaceAll};