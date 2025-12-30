import { test } from "../src/fixtures/page.fixtures";
import { expect } from "@playwright/test";
import testdata from "../test-data/Todo-testdata.json";



test("Verify we can add new task", { tag: ["@regression"] }, async ({ homePage }) => {
  //test data
  const tasks = testdata.testcaseId1;
  let count = 0;
  await test.step("Navigate to the website", async () => {
    await homePage.NavigatetoUrl();
  });

  for (const task of tasks) {
    await test.step(`Adding a task ${task.name}`, async () => {
      await homePage.AddTasks(task.name);
    });
  }

  await test.step("Verify all the products were added", async () => {
    count = await homePage.getCountofAddedTasks();
    expect(count).toBe(tasks.length);
  });

  await test.step("Check the task", async () => {
    await homePage.checkTheTasks(2);
  });


  await test.step("Remove duplicate element", async () => {
    const { actual, expected } = (await homePage.removeDuplicatesTasks()) as { actual: string, expected: string };

    expect(actual).toBe(expected);
  });

});

test("Veriy the test case 2 data",{tag:["@smoke"]}, async ({ homePage }) => {
  const tasks = testdata.testcaseId2;

  for (const task of tasks) {
    console.log(`Task to add: ${task.do}`);
    console.log(`Task to add: ${task.make}`);
    console.log(`Task to add: ${task.work}`);
    console.log(`---------------------------`);
  }
});

test("This test will fail intentionally",{tag:["@regression"]}, async ({ homePage }) => {
  await homePage.NavigatetoUrl();
  const title = await homePage.page.title();
  expect(title).toBe("TodoMVC: React - Fail");
});
