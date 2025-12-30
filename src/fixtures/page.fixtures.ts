import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from "../pages/homePage";

type pages = {
    homePage : HomePage;
}


const test =  base.extend<pages>(
    {
        homePage : async({page},use)=>
        {
            const homePage = new HomePage(page);
            use(homePage);
        }

    }
);


export {test};