const mutations = {
  setUser: (state, payload) => {
    state.userInfos = payload;
  },
  setChangeUserData: (state, payload) => {
    state.userInfos.name = payload.name
    state.userInfos.email = payload.email
    state.userInfos.homePage = payload.homePage
  },
};

export default mutations;
