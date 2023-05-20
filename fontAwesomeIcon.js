import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faAddressCard} from "@fortawesome/free-solid-svg-icons";

library.add(faAddressCard);

Vue.component("font-awesome-icon", FontAwesomeIcon);