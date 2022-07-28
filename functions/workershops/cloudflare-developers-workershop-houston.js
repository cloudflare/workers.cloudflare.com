export async function onRequest() {
    const url = new URL(
      "https://www.ortusclub.com/cloudflare-developers-workershop-houston/"
    )
  
    return fetch(url)
  }