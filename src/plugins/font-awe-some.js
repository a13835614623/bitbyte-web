import Vue from 'vue'
import {library} from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faUnlockAlt from '@fortawesome/fontawesome-free-solid/faUnlockAlt'
import farThumbsUp from '@fortawesome/fontawesome-free-regular/faThumbsUp'
import faStar from '@fortawesome/fontawesome-free-solid/faStar'
import faShare from '@fortawesome/fontawesome-free-solid/faShare'
import farStar from '@fortawesome/fontawesome-free-regular/faStar'
import faShareSquare from '@fortawesome/fontawesome-free-regular/faShareSquare'
import faQq from '@fortawesome/fontawesome-free-brands/faQq'

library.add(faEdit)
library.add(faUser)
library.add(faUnlockAlt)
library.add(faThumbsUp)
library.add(farThumbsUp)
library.add(faStar)
library.add(farStar)
library.add(faShare)
library.add(faShareSquare)
library.add(faQq)
// import solid from '@fortawesome/fontawesome-free-solid'
// import regular from '@fortawesome/fontawesome-free-regular'

// library.add(solid)
// library.add(regular)
// 导入fontawesome
Vue.component('icon', FontAwesomeIcon)