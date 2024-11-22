import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"
import AppWrapper from './AppWrapper.vue'
import router from './router'

import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

const pinia = createPinia()
const app = createApp(AppWrapper)
const vuestic = createVuestic()

app.use(pinia)
app.use(VNetworkGraph)
app.use(router)
app.use(vuestic)
app.mount("#app")