export function getParameterByName(name: any): any {
  const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export function enumToArrayString(enumerator: any): any {
  return Object.keys(enumerator).map(key => enumerator[key]).filter(value => typeof value === 'string') as string[]
}

export function isURL(str: string): boolean {
  const urlRegex = '^(?:http(s)?:\\/\\/)[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$';
  const url = new RegExp(urlRegex);
  return str.length < 2083 && url.test(str);
}

export function parseJwt(token: string) {
  try {
    // Get Token Header
    const base64HeaderUrl = token.split('.')[0];
    const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
    const headerData = JSON.parse(window.atob(base64Header));

    // Get Token payload and date's
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const dataJWT = JSON.parse(window.atob(base64));
    dataJWT.header = headerData;

    // TODO: add expiration at check ...


    return dataJWT;
  } catch (err) {
    return false;
  }
}
