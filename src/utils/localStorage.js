const LOCALSTORAGE_PREFIX = 'RFE-';

export const getKey = (key) => `${LOCALSTORAGE_PREFIX}${key}`;

export const set = (name, data, expire, other = false) => {
  if (!process.browser) return;

  const obj = {
    data,
  };

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

export const remove = (name, other = false) => {
  if (!process.browser) return;

  if (other) {
    window.localStorage.removeItem(name);
  } else {
    window.localStorage.removeItem(getKey(name));
  }
};

export const get = (name, other = false) => {
  if (!process.browser) return null;

  let obj;

  if (other) {
    obj = window.localStorage.getItem(name);
  } else {
    obj = window.localStorage.getItem(getKey(name));
  }

  if (!obj) {
    return null;
  }

  let json;

  if (other) {
    json = obj;
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
