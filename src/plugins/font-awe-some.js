import Vue from 'vue'
import {library} from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faUnlockAlt from '@fortawesome/fontawesome-free-solid/faUnlockAlt'
import farThumbsUp from '@fortawesome/fontawesome-free-regular/faThumbsUp'

library.add(faEdit)
library.add(faUser)
library.add(faUnlockAlt)
library.add(faThumbsUp)
library.add(farThumbsUp)

// import solid from '@fortawesome/fontawesome-free-solid'
// import regular from '@fortawesome/fontawesome-free-regular'

// library.add(solid)
// library.add(regular)
// 导入fontawesome
Vue.component('icon', FontAwesomeIcon)