async function fetchAllPies(searchTerm: string) {
  const hasSearchValue = searchTerm.length > 0;
  const getEndPoint = hasSearchValue
    ? `http://localhost:3200/api/search?name=${searchTerm}`
    : `http://localhost:3200/api`;

  const response = await fetch(getEndPoint);

  if (!response.ok) {
    throw new Error(
      `${response.status.toString()} ${
        response.statusText
      }. Sorry, there was an error fetching pie data.`
    );
  }

  return response.json();
}

export default fetchAllPies;
