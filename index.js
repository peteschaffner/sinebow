
/**
 * Module dependencies.
 */

var convert = require('color-convert');

/**
 * Expose `Sinebow`.
 */

module.exports = Sinebow;

/**
 * Sinebow
 *
 * A smoother, more gradual rainbow.
 * Discovered here: http://frankchimero.com/talks/what-screens-want/transcript/
 * Originally from here: http://basecase.org/env/on-rainbows
 *
 * @param {Number} hue Any integer or decimal
 * @api public
 */

function Sinebow(hue) {
  var sin = Math.sin;
  var pi = Math.PI;
  var r = sin(pi * hue);
  var g = sin(pi * (hue + 1/3));
  var b = sin(pi * (hue + 2/3));
  this.rgb = [r, g, b].map(function (channel) {
    return Math.floor(255 * (channel * channel));
  });
}

/**
 * Return `rgb` as a CSS string
 *
 * @return {String}
 * @api public
 */

Sinebow.prototype.toString = function () {
  return 'rgb(' + this.rgb.join(',') + ')';
};

/**
 * Desaturate color
 *
 * `percent` is assumed to be contained in the set [0, 1]
 *
 * @param {Number} percent
 * @api public
 */

Sinebow.prototype.desaturate = function (percent) {
  this.rgb = modify(this.rgb, 'saturation', percent);
};

/**
 * Darken color
 *
 * `percent` is assumed to be contained in the set [0, 1]
 *
 * @param {Number} percent
 * @api public
 */

Sinebow.prototype.darken = function (percent) {
  this.rgb = modify(this.rgb, 'brightness', percent);
};

/**
 * Turn `rgb` into HSV and adjust
 * [saturation | brightness] `modifier` by `percent`
 *
 * @param {Array} rgb
 * @param {String} modifier
 * @param {Number} percent
 * @return {Array}
 * @api private
 */

function modify(rgb, modifier, percent) {
  modifier = (modifier === 'saturation') ? 1 : 2;
  var hsv = convert.RGBtoHSV(rgb[0], rgb[1], rgb[2]);
  hsv[modifier] *= percent;
  return convert.HSVtoRGB(hsv[0], hsv[1], hsv[2])
    .map(function (channel) {
      return Math.floor(channel);
    });
}
