import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faThList,
  faTags,
  faQuestionCircle,
  faInfo,
  faArrowRight,
  faLanguage,
  faBars,
  faTimes,
  faSearch,
  faAngleDown,
  faPlay,
  faPlayCircle,
  faPause,
  faPauseCircle,
  faCircleNotch,
  faChevronRight,
  faChevronLeft,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faStopwatch,
  faFilter,
  faTerminal,
  faUser,
  faLock,
  faCheck,
  faEnvelope,
  faPencilAlt,
  faTachometerAlt,
  faSignOutAlt,
  faHome,
  faUserAlt,
  faImages,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// fontawesome.config = {
//   autoAddCss: false,
// };

// eslint-disable-next-line max-len
library.add(faThList, faTags, faQuestionCircle, faInfo, faArrowRight, faLanguage, faBars, faTimes, faSearch, faAngleDown, faPlay, faPlayCircle, faPause, faPauseCircle, faCircleNotch, faChevronRight, faChevronLeft, faLongArrowAltRight, faLongArrowAltLeft, faStopwatch, faFilter, faTerminal, faUser, faLock, faCheck, faEnvelope, faUser, faPencilAlt, faTachometerAlt, faSignOutAlt, faHome, faUserAlt, faImages);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
