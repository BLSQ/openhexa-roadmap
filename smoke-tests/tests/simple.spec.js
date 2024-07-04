// @ts-check

import { test, expect } from '@playwright/test';


test.beforeEach(async ({page}) => {
  // @ts-ignore
  await page.goto(process.env.OH_BASE_URL);
  await login(page)
})


async function login(page) {
  // Login
  await page.goto("/login")
  await page.getByPlaceholder('Email address').fill(process.env.OH_USERNAME);
  await page.getByPlaceholder('Password').fill(process.env.OH_PASSWORD);
  await page.getByRole('button', {name: "Sign in"}).click({ force: true });
  await expect(page.getByText(/Where to go from here?/)).toBeVisible();
}

test("view workspace's dashboard", async ({page }) => {
  await expect(page.getByText(/Where to go from here?/)).toBeVisible();
});

test("view workspace's tables", async ({ page }) => {
  await page.getByRole("navigation").getByRole("link").nth(2).click(); // Tables link
  await expect(page.getByRole("heading", {name: "Tables"})).toBeVisible();  
  await expect(page.getByRole('columnheader', { name: 'Name' }).first()).toBeVisible();  
});

test("view workspace's files", async ({ page }) => {
  await page.getByRole("navigation").getByRole("link").nth(1).click(); // Files link
  await expect(page.getByRole('columnheader', { name: 'Size' }).first()).toBeVisible();  
  await expect(page.getByRole('columnheader', { name: 'Name' }).first()).toBeVisible();  
  
});

test("view workspace's jupyterlab environment", async ({ page }) => {
  await page.getByRole("navigation").getByRole("link").nth(6).click(); // Jupyterlab link
  await expect(page.frameLocator('iframe').locator('#tab-key-2-0').getByText('Launcher')).toBeVisible({timeout: 20000});
});
