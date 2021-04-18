const assert = require("chai").assert;
const mocha = require("mocha");
const MonitorService = require("../domain/services/monitor");

//import MonitorService from '../domain/services/monitor';
mocha.describe("Post Service", () => {
    //  const MonitorServiceInstance = new MonitorService();

    mocha.describe("Create instance of service", () => {
        it("Is not null", () => {
            assert.isNotNull(MonitorService);
        });

        it("Exposes the createPost method", () => {
            assert.isFunction(MonitorService.follow);
        });
    });
});