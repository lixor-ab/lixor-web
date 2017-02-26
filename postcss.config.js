module.exports = {
  use: [
    "postcss-import",
    "postcss-cssnext",
    "cssnano",
    // "postcss-url"
    // "postcss-urlrev"
  ] //,
  // "postcss-url": {
  //   url: (url) => `${url}.merde`
//     URL – original url
// decl - related postcss declaration object
// from - from postcss option
// dirname – dirname of processing file
// to – from postcss option
// options – plugin options
// result – postcss result object
  // }
  // "postcss-urlrev": {
  //   relativePath: 'static/assets/media/',
  //   replacer: (url, hash) => {
  //     const dot = url.lastIndexOf('.')
  //     return `${url.substring(0, dot)}.${hash.substring(0,8)}${url.substring(dot)}`
  //   },
  // }
};
