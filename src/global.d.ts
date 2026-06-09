export {}

declare global {
  interface Window {
    // Señal entre Hero (LeadModal) y CookieBanner para secuenciar los diálogos
    __leadModalPending?: boolean
  }
}
