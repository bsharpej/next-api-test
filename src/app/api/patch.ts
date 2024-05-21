async function updatePie(
  pieId: number,
  pieName: string,
  wholePrice: number,
  slicePrice: number,
  sliceCalories: number
) {
  const response = await fetch(`http://localhost:3200/api/${pieId}`, {
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
  });

  if (!response.ok) {
    throw new Error(
      `Sorry, there was an ${response.statusText.toLowerCase()} error updating this pie.`
    );
  }

  return response.json().then((data) => {
    return data;
  });
}

export default updatePie;
