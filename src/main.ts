import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VNetworkGraph)
app.mount("#app")