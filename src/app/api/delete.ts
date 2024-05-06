async function deletePie(id: number) {
  const response = await fetch(`http://localhost:3200/api/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      `Sorry, there was an ${response.statusText.toLowerCase()} deleting this pie.`
    );
  }

  return response.json().then((data) => {
    return data;
  });
}

export default deletePie;
