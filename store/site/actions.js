export const setAuth = ({ commit }, payload) => {
  try {
    if (payload) {
      var payloadConstructor = {
        access_token: payload.token,
      }
    } else {
      payloadConstructor = {}
    }
    commit("setAuth", payloadConstructor);
  } catch(error) {
    throw error;
  }
};

export const setLogout = ({ commit }) => {
  sessionStorage.clear();
  ['site'].map((item)=>{
    localStorage.removeItem(item);
  })
  commit("setAuth", {});
};

export const setMenu = ({ commit }, payload) => {
  commit("setMenu", payload);
};