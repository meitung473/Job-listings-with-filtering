// @flow

function genarateTag(...args: Array<string>): Array<string> {
    const tags = [...args].reduce((acc, tag) => {
        // if there is only value in tags
        if (Array.isArray(tag)) {
            return [...acc, ...tag];
        } else {
            return [...acc, tag];
        }
    }, []);
    return tags;
}

export function data2Info(data: Object): Object {
    const { role, tools, languages, level, ...info } = data;
    const tags = genarateTag(role, tools, languages, level);
    return Object.assign(data, { ...info, tags });
}
