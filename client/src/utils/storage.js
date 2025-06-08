export function getLocal(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function addToList(key, movie) {
  const list = getLocal(key);
  const exists = list.some((m) => m.tmdb_id === movie.tmdb_id);
  if (!exists) {
    list.push(movie);
    localStorage.setItem(key, JSON.stringify(list));
  }
}
