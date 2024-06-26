import { v4 as uuidv4 } from "uuid";

async function createPie(
  pieName: string,
  wholePrice: number,
  slicePrice: number,
  sliceCalories: number
) {
  const response = await fetch(`http://localhost:3200/api/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: uuidv4(),
      name: pieName,
      wholePrice: wholePrice,
      slicePrice: slicePrice,
      sliceCalories: sliceCalories,
      dateTimeCreated: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Sorry, there was an ${response.statusText.toLowerCase()} error creating this pie.`
    );
  }

  return response.json().then((data) => {
    return data;
  });
}

export default createPie;
