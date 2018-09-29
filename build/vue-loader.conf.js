module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    cssModules: {},
    loaders: {
      'docs': docsLoader
    }
  }
}