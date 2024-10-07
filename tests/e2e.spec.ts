import { test, expect } from "@playwright/test";

test(`only cherry pie shows when searching "che"`, async ({ page }) => {
  await page.goto("http://localhost:3000/");

  page.getByRole("searchbox", { name: "che" });

  expect(page.getByTestId("Cherry"));
});

test(`only cherry and peach pies shows when searching "ch"`, async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");

  page.getByRole("searchbox", { name: "ch" });

  expect(page.getByTestId("Cherry"));
  expect(page.getByTestId("Peach"));
});

test("creates a new pie called 'Banoffee' and checks it is displayed", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");

  await page.fill('[name="name"]', "Banoffee");
  await page.fill('[name="wholePrice"]', "20");
  await page.fill('[name="slicePrice"]', "3");
  await page.fill('[name="sliceCalories"]', "400");

  await page.click("text=Create Pie");

  page.getByTestId("Banoffee");
});
