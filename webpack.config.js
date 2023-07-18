const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const LANDING_PAGE_DIR_NAME = "builtLandingPage";
const BUILD_DIR = "build";
const EXTENSION_DIR_NAME = "extension";

module.exports = {
  entry: {
    popup: "./src/popup.js",
    options: "./src/options.js",
    contentScript: "./src/contentScripts/content-script.js",
    videoManager: "./src/contentScripts/videoManager.js",
    landingPage: "./src/landingPage.js",
  },
  output: {
    path: path.resolve(__dirname, BUILD_DIR),
    clean: true,
    chunkFilename: `[name].js`,
    filename: (pathData) => {
      return pathData.chunk.name === "landingPage"
        ? `${LANDING_PAGE_DIR_NAME}/[name].js`
        : `${EXTENSION_DIR_NAME}/[name].js`;
    },
  },
  module: {
    // TODO: make sure the utils file is not loaded twice but rather shared
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup.html",
      filename: `${EXTENSION_DIR_NAME}/popup.html`,
      customJS: "popup.js",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./src/options.html",
      filename: `${EXTENSION_DIR_NAME}/options.html`,
      customJS: "options.js",
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      template: "./src/landingPage.html",
      filename: `${LANDING_PAGE_DIR_NAME}/landingPage.html`,
      customJS: "landingPage.js",
      chunks: [],
    }),
    new CopyPlugin({
      patterns: [
        //   move items from public to build dir for extension
        { from: "public/extensionFiles", to: EXTENSION_DIR_NAME },
        { from: "public/images", to: `${EXTENSION_DIR_NAME}/images` },
        { from: "public/optionsImages", to: `${EXTENSION_DIR_NAME}/images` },
        {
          from: "public/extensionFiles/options-global.css",
          to: `${LANDING_PAGE_DIR_NAME}`,
        },
        {
          from: "public/optionsImages",
          to: `${LANDING_PAGE_DIR_NAME}/images`,
        },
      ],
    }),
  ],
};

/**
 * output
 * ------------------------------------
 * |-- build
 * |--|-- extension
 * |--|--|-- images
 * |--|--|-- options.html
 * |--|--|-- options.js
 * |--|--|-- popup.html
 * |--|--|-- popup.js
 * |--|--|-- other extension files
 * |--|-- builtLandingPage
 * |--|--|-- images
 * |--|--|-- landingPage.html
 * |--|--|-- landingPage.js
 * |--|--|-- other landing page files
 */
