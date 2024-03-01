const mutations = {
  setAuth: (state, payload) => {
    state.auth = payload
  },
  setMenu: (state, payload) => {
    state.menu = payload;
  }
};

export default mutations;