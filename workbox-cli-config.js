module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{txt,woff,woff2,ttf,eot,png,svg,xml,ico,json,jpeg,webp,html,js,css,map}"
  ],
  "swDest": "dist/service-worker.js",
  "navigateFallback": "/index.html",
  "globIgnores": [
    "../workbox-cli-config.js"
  ],
  "handleFetch": true
};
