import MonitorService from "../domain/services/monitor";
//const assert = require("chai").assert;
let chaiHttp = require('chai-http');
const chai = require("chai");
let server = require('../server');
chai.use(chaiHttp);
var expect = chai.expect;
var authenticatedUser = chai.request.agent(server);
var credentials = null;

describe("Monitor Service", () => {

    before(function (done) {
        authenticatedUser.post('/v1/login')
            .send({ "username": "Ivansalazar", "password": "asa12aawQ312" })
            .end(function (err, res) {
                if (err)
                    return done(err);

                credentials = res.body.user.accessToken;
                done();
            });
    });

    describe("/POST follow", () => {
        it("Should be able to follow a coin if the user still does not follow it", (done) => {
            authenticatedUser.post('/v1/follow')
                .set({ "Authorization": `Bearer ${credentials}` })
                .send({ username: 'ivan', symbol: 'etc' })
                .end(function (err, res) {
                    if (err)
                        return done(err);

                    expect(res.body.message).to.be.an('string');
                    console.log(res.body)
                    done();
                });
        });
    });

    describe("/GET follow/:quantity", () => {
        it("Should be able to get all follow  coins of user", (done) => {
            authenticatedUser.get('/v1/follow/10')
                .set({ "Authorization": `Bearer ${credentials}` })
                .query({ order: -1 })
                .end(function (err, res) {
                    if (err)
                        return done(err);

                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });


    describe("/GET coins", () => {
        it("should be allow listing all currencies ", (done) => {
            authenticatedUser.get('/v1/coins')
                .set({ "Authorization": `Bearer ${credentials}` })
                .query({ page: 1, per_page: 100 })
                .end(function (err, res) {
                    if (err)
                        return done(err);

                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
});