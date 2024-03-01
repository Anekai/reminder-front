export const setUser = ({ commit }, payload) => {
  //commit("setUser", payload);
  try {
    if (payload) {
      var payloadConstructor = {
        name: payload.name,
        email: payload.email,
        homePage: payload.homePage
      }
    } else {
      payloadConstructor = {}
    }
    commit("setUser", payloadConstructor);
  } catch(error) {
    throw error;
  }
};
export const setChangeUserData = ({ commit }, payload) => {
  commit("setChangeUserData", payload);
};