import { routes } from "@/router";
import storage from "@/utils/storage";

const state = () => ({
  routes: storage.get("permissionRoutes") || [],
});
const actions = {
  generateRoutes({ commit }, { permissions, admin = false }) {
    console.log(permissions, admin);
    let accessedRoutes = admin ? routes : filterRoutes(routes, permissions);
    storage.set("permissionRoutes", accessedRoutes);
    commit("SET_ROUTES", accessedRoutes);
  },
};
const filterRoutes = (routes, permissions) => {
  return routes.filter((route) => {
    if (route.children) {
      route.children = filterRoutes(route.children, permissions);
    }
    let meta = route.meta;
    return (
      !meta ||
      (meta &&
        (!meta.permission ||
          (meta.permission && permissions.includes(meta.permission))))
    );
  });
};

const mutations = {
  SET_ROUTES(state, routes) {
    state.routes = routes;
  },
  CLEAR_ROUTES(state) {
    state.routes = [];
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
