require('../../node_modules/tiny-slider/dist/tiny-slider.css')
import {tns} from '../../node_modules/tiny-slider/src/tiny-slider';

var slider = tns({
  container: '.carousel',
  items: 3,
  gutter: '15',
  nav: false,
  controlsText: ['', '']
});