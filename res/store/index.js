const store = new Vuex.Store({
    state: {
        user: {
            name: "",
        }
    },
    mutations: {
        updateUser (state, data) {
            state.user = data
        }
    },
    actions: {
        fetchUser(ctx) {
            TA.m._req({
                method:"get",
                url:"/mobile/user"
            }, function (res) {
                ctx.commit('updateUser', {
                    name: res.data.name
                })
            })
        }
    }
})
export default store