async function updatePie(
  pieId: number,
  pieName: string,
  wholePrice: number,
  slicePrice: number,
  sliceCalories: number
) {
  return fetch(`http://localhost:3200/api/${pieId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: pieId,
      name: pieName,
      wholePrice: wholePrice,
      slicePrice: slicePrice,
      sliceCalories: sliceCalories,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    });
}

export default updatePie;
