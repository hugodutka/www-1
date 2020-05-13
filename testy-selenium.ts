import { Builder, Capabilities } from "selenium-webdriver";

import { expect } from "chai";

import { driver } from "mocha-webdriver";

describe("testDrugi", function () {
  it("should say something", async function () {
    this.timeout(20000);
    await driver.get("file:///Users/hugodutka/mim/www/lab1/index.html");
    expect(
      await driver.find("select#from").getText()
    ).to.include("Warszawa");
    await driver.find("input#first-name").sendKeys("Hugo");
    await driver.find("section.flight-reservation").doClick();
  });
});
