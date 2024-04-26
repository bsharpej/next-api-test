async function deletePie(id: number) {
  return fetch(`http://localhost:3200/api/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    });
}

export default deletePie;
