import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"
import AppWrapper from './AppWrapper.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(AppWrapper)


app.use(pinia)
app.use(VNetworkGraph)
app.use(router)
app.mount("#app")