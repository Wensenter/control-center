const mutations = {
    setMenus(state, items) {
        state.menuItems = [...items]
    },
    setLoading(state, isShowLoading) {
        state.isShowLoading = isShowLoading
    }
}
export default mutations