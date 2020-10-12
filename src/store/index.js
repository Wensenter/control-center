import Vue from 'vue'
import Vuex from 'vuex'
import routes from './routes'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        routes
    }
})

export default store