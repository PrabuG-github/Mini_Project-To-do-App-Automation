import { Locator, Page, expect } from "@playwright/test";


export class HomePage {
    //page
    readonly page: Page;

    //locators
    private static readonly textBoxLocator = "textbox";
    private static readonly taskListLocator = "//ul[@class='todo-list']/li";
    private static readonly destroyButtonsLocator = "//button[@class='destroy']";


    
    private textBox: Locator;
    private taskList: Locator;
    private destroyButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textBox = this.page.getByRole(HomePage.textBoxLocator);
        this.taskList = this.page.locator(HomePage.taskListLocator);
        this.destroyButtons = this.page.locator(HomePage.destroyButtonsLocator);
    };



    async NavigatetoUrl() {
        await this.page.goto("https://todomvc.com/examples/react/dist/");
        const title = await this.page.title();
        console.log(`${title}`);
        expect(title).toBe("TodoMVC: React");
    };


    async AddTasks(task: string) {
        await this.textBox.fill(task);
        await this.textBox.press("Enter");
    }

    async getCountofAddedTasks(): Promise<number> {
        return await this.taskList.count();
    }

    async checkTheTasks(n: number) {
        await this.page.getByRole("checkbox").nth(n).click();
    }


    async removeDuplicatesTasks(): Promise<object> {
        const addTasks = await this.taskList.allTextContents();

        const seen = new Set<string>();
        const duplicateIndexes: number[] = [];

        addTasks.forEach((task, index) => {
            if (seen.has(task)) {
                duplicateIndexes.push(index);
            } else {
                seen.add(task);
            }
        });

        for (const idx of duplicateIndexes) {
            await this.destroyButtons.nth(idx).dispatchEvent("click");
        }

        const afterRemoved = await this.taskList.allTextContents();

        console.log("After removal:", afterRemoved.length);
        console.log("Expected:", addTasks.length - duplicateIndexes.length);


        return {
            actual: afterRemoved.length,
            expected: addTasks.length - duplicateIndexes.length
        };


    }


}