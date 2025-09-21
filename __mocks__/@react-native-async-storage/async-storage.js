let storage = {};

const AsyncStorageMock = {
  getItem: jest.fn((key) => {
    return Promise.resolve(storage[key] ?? null);
  }),
  setItem: jest.fn((key, value) => {
    storage[key] = value;
    return Promise.resolve();
  }),
  removeItem: jest.fn((key) => {
    delete storage[key];
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    storage = {};
    return Promise.resolve();
  }),
  getAllKeys: jest.fn(() => {
    return Promise.resolve(Object.keys(storage));
  }),
  multiGet: jest.fn((keys) => {
    return Promise.resolve(keys.map(k => [k, storage[k] ?? null]));
  }),
};

module.exports = AsyncStorageMock;
module.exports.default = AsyncStorageMock;
