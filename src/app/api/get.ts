async function fetchAllPies(searchTerm: string) {
  const response = await fetch(
    `http://localhost:3200/api/search?name=${searchTerm}`
  );

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
