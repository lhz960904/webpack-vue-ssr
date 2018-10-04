module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    cssModules: {
      localIdentName: '[path]-[name]-[hash:base64:5]',
      camelCase: true
    }
  }
}