System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "none",
  runtime: false,
  sfxFormat: "cjs",
  minify: true,
  mangle: false,
  meta: {
    "node_modules/angular2/angular2.js": {
      build: false
    }
  },
  map: {
    "angular2": "node_modules/angular2"
  }
});
