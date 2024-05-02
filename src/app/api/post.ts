async function createPie(
  pieName: string,
  wholePrice: number,
  slicePrice: number,
  sliceCalories: number
) {
  const newId = Math.floor(Math.random() * 1000);

  return fetch(`http://localhost:3200/api/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: newId,
      name: pieName,
      wholePrice: wholePrice,
      slicePrice: slicePrice,
      sliceCalories: sliceCalories,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export default createPie;
