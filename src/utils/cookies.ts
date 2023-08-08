export function setCookie(name: string, value: string, props?: any) {
    // console.log(`Set cookie: ${name}=${value}`)

    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
    // console.log(`Get cookie: ${name}`)
    const cookies = document.cookie.split(';').filter(c => {
        return c.trim().startsWith(name + '=');
    });

    return cookies && cookies.length > 0 && decodeURIComponent(cookies[0].split('=')[1]) || ''
}