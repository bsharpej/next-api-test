async function fetchAllPies(searchTerm: string) {
  return fetch(`http://localhost:3200/api/search?name=${searchTerm}`).then(
    (response) => response.json()
  );
}

export default fetchAllPies;
