// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/Users/patrickferris/Documents/Projects/pf2018/.cache/layouts/index.js"))
}

exports.components = {
  "component---src-templates-post-js": preferDefault(require("/Users/patrickferris/Documents/Projects/pf2018/src/templates/post.js")),
  "component---cache-dev-404-page-js": preferDefault(require("/Users/patrickferris/Documents/Projects/pf2018/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/patrickferris/Documents/Projects/pf2018/src/pages/404.js")),
  "component---src-pages-about-js": preferDefault(require("/Users/patrickferris/Documents/Projects/pf2018/src/pages/about.js")),
  "component---src-pages-blog-page-js": preferDefault(require("/Users/patrickferris/Documents/Projects/pf2018/src/pages/blog-page.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/patrickferris/Documents/Projects/pf2018/src/pages/index.js"))
}

exports.json = {
  "layout-index.json": require("/Users/patrickferris/Documents/Projects/pf2018/.cache/json/layout-index.json"),
  "optimise-your-website.json": require("/Users/patrickferris/Documents/Projects/pf2018/.cache/json/optimise-your-website.json"),
  "graphics-and-p-5.json": require("/Users/patrickferris/Documents/Projects/pf2018/.cache/json/graphics-and-p-5.json"),
  "dev-404-page.json": require("/Users/patrickferris/Documents/Projects/pf2018/.cache/json/dev-404-page.json"),
  "404.json": require("/Users/patrickferris/Documents/Projects/pf2018/.cache/json/404.json"),
  "about.json": require("/Users/patrickferris/Documents/Projects/pf2018/.cache/json/about.json"),
  "blog-page.json": require("/Users/patrickferris/Documents/Projects/pf2018/.cache/json/blog-page.json"),
  "index.json": require("/Users/patrickferris/Documents/Projects/pf2018/.cache/json/index.json"),
  "404-html.json": require("/Users/patrickferris/Documents/Projects/pf2018/.cache/json/404-html.json")
}