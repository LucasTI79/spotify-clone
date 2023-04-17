declare global {
  interface window {
    navigation: {
      canGoBack: boolean,
      canGoForward: boolean
    }
  }
}

window.navigation = window.navigation || {};