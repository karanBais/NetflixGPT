export default async function handler(req, res) {
  const { path } = req.query; // e.g., "movie/now_playing"
  const TMDB_API_KEY = process.env.TMDB_BEARER_TOKEN;

  if (!path) {
    return res.status(400).json({ error: "Missing 'path' query parameter" });
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/${path}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    res.status(500).json({ error: "Failed to fetch from TMDB" });
  }
}