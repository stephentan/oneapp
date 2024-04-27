class DataStore {
  constructor() {
    this.models = {};
  }

  getModel(modelName: string) {
    return this.models[modelName];
  }

  addModel(modelName: string, model) {
    this.models[modelName] = model;
  }
}

const singleton = new DataStore();
// ensure the API is never changed
// -------------------------------

Object.freeze(singleton);

// export the singleton API only
// -----------------------------

export default singleton;
