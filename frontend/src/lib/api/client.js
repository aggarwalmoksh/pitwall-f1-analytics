/**
 * getJSON — a thin fetch wrapper used by every API module.
 * Adds a timeout (via AbortController) and turns non-2xx responses into
 * thrown Errors so TanStack Query can surface them as error states.
 */
export async function getJSON(url, { timeout = 15000 } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) {
      throw new Error(`Request failed (${res.status}) for ${url}`)
    }
    return await res.json()
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout}ms: ${url}`)
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}
