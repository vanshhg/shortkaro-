import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})


export async function shortenUrl(originalUrl) {
  const { data } = await api.post('/url', {
    url: originalUrl,
  })

  const shortId = data.id

  return {
    shortId,
    shortUrl: `${API_BASE_URL}/${shortId}`,
  }
}


export async function getLinkAnalytics(shortId) {
  const { data } = await api.get(`/url/analytics/${shortId}`)

  return {
    totalClicks: data.totalclicks,
    analytics: data.analytics,
  }
}


export { api, API_BASE_URL }
