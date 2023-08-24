import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from "vuetify/labs/components";

const vuetify = createVuetify({
    components: {
        ...components,
        ...labs,
      },
    
    directives,
  })

const app = createApp(App)
app.use(createPinia())
app.use(VNetworkGraph)
app.use(vuetify)
app.mount("#app")
