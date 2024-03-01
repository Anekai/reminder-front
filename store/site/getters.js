export const getAuth  = ({ auth }) => auth.access_token ? auth.access_token : null;
export const getToken  = ({ auth }) => auth && auth.access_token ? auth.access_token : null;
export const getMenu  = ({ menu }) =>  menu;
