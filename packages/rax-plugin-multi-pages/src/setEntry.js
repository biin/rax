const path = require('path');
const fs = require('fs-extra');

const { hmrClient } = require('rax-compile-config');

const MulitPageLoader = require.resolve('./MulitPageLoader');

function getDepPath(rootDir, com) {
  if (com[0] === '/') {
    return path.join(rootDir, 'src', com);
  } else {
    return path.resolve(rootDir, 'src', com);
  }
};

module.exports = (config, context, type) => {
  const { rootDir, command } = context;
  const isDev = command === 'dev';

  // MPA
  let routes = [];

  try {
    routes = fs.readJsonSync(path.resolve(rootDir, 'src/app.json')).routes;
  } catch (e) {
    console.error(e);
    throw new Error('routes in app.json must be array');
  }

  config.entryPoints.clear();

  routes.forEach((route) => {
    const entryConfig = config.entry(route.component.replace(/pages\/([^\/]*)\/index/g, (str, $) => $));
    if (isDev) {
      entryConfig.add(hmrClient);
    }

    const pageEntry = getDepPath(rootDir, route.component);
    entryConfig.add(`${MulitPageLoader}?type=${type}!${pageEntry}`);
  });
};
