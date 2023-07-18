const path = require("path");
const fs = require("fs");

/**
 * Moves javascript files from the source to the destination
 */
class CustomMovePluginJS {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap("CustomMovePlugin", (compilation) => {
      const { from, to } = this.options;

      // Ensure 'from' and 'to' paths are resolved to absolute paths
      const absoluteFrom = path.resolve(compiler.context, from);
      const absoluteTo = path.resolve(compiler.options.output.path, to);

      // Create the destination directory if it doesn't exist
      if (!fs.existsSync(absoluteTo)) {
        fs.mkdirSync(absoluteTo, { recursive: true });
      }

      const jsFiles = fs
        .readdirSync(absoluteFrom)
        .filter((file) => path.extname(file) === ".js");

      // Move each .js file to the 'to' directory
      jsFiles.forEach((fileName) => {
        // const fileName = path.basename(file);
        const sourcePath = path.join(absoluteFrom, fileName);
        const destinationPath = path.join(absoluteTo, fileName);

        // Move the file using fs.renameSync() which effectively moves the file
        fs.renameSync(sourcePath, destinationPath);
        console.log(`Moved ${fileName} to ${absoluteTo}`);
      });
    });
  }
}

module.exports = CustomMovePluginJS;
