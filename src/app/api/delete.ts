async function deletePie(id: number) {
  const response = await fetch(`http://localhost:3200/api/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      `${response.status.toString()} ${
        response.statusText
      }. Sorry, there was an error deleting this pie.`
    );
  }

  return response.json().then((data) => {
    return data;
  });
}

export default deletePie;
