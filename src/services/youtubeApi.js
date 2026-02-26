const YT_KEY = import.meta.env.VITE_YOUTUBE_KEY

export async function searchYouTube(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query,
  )}&key=${YT_KEY}&type=video&maxResults=20`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Network response was not ok')
  const data = await res.json()
  return data.items || []
}
