const LOCALSTORAGE_PREFIX = 'RFE-';

export const getKey = (key: string): string => `${LOCALSTORAGE_PREFIX}${key}`;

export const set = (
  name: string,
  data: unknown,
  expire?: number,
  other = false
): void => {
  if (typeof window === 'undefined') return;

  const obj: { data: unknown; expire?: number } = { data };

  if (expire) {
    const time = new Date().getTime();
    obj.expire = time + expire * 1000;
  }

  if (other) {
    window.localStorage.setItem(name, JSON.stringify(obj));
  } else {
    window.localStorage.setItem(getKey(name), JSON.stringify(obj));
  }
};

export const remove = (name: string, other = false): void => {
  if (typeof window === 'undefined') return;

  if (other) {
    window.localStorage.removeItem(name);
  } else {
    window.localStorage.removeItem(getKey(name));
  }
};

export const get = (name: string, other = false): unknown | null => {
  if (typeof window === 'undefined') return null;

  let obj: string | null;

  if (other) {
    obj = window.localStorage.getItem(name);
  } else {
    obj = window.localStorage.getItem(getKey(name));
  }

  if (!obj) {
    return null;
  }

  let json: { data: unknown; expire?: number };

  if (other) {
    json = JSON.parse(obj);
    return json;
  } else {
    json = JSON.parse(obj);

    const { data, expire } = json;

    if (expire) {
      const time = new Date().getTime();

      if (expire < time) {
        remove(name);
        return null;
      }
    }

    return data;
  }
};

const localStorage = {
  set,
  get,
  remove,
};

export default localStorage;
