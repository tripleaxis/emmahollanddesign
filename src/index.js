// PolyFills
import 'babel-polyfill'
import 'whatwg-fetch';

import App from './app';
import './index.less';

App.run(
  document.querySelector('#app')
);

