export const BLACK = "#000000";
export const WHITE = "#FFFFFF";

/**
 * Returns CSS color oneOf['black', 'white'] based on the given rgb bg color
 *
 * @param color
 * @returns {string}
 */
export const getTextColor = (color) => {
  if (color[0] === "#") {
    return invertColor(color, true);
  }
  color = color.replace(/[^\d,]/g, "").split(",");
  const brightness = Math.round(
    (parseInt(color[0]) * 299 +
      parseInt(color[1]) * 587 +
      parseInt(color[2]) * 114) /
      1000
  );
  return brightness > 125 ? BLACK : WHITE;
};

export const getHoverColor = (color) =>
  getTextColor(color) === WHITE
    ? "rgba(255, 255, 255, 0.2)"
    : "rgba(0, 0, 0, 0.2)";

/**
 * Gets a contrasted color based on a given hex color. The flag bw determines if the
 * returned hex color should only be black or white
 *
 * @param {string} hex - hex color
 * @param {boolean} bw
 * @returns {string}
 */
export const invertColor = (hex, bw) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  let r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? BLACK : WHITE;
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
};

const padZero = (str, len) => {
  len = len || 2;
  const zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
};
