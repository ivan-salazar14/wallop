import userService from "../domain/services/user";
const assert = require("chai").assert;
const chai = require("chai");
let chaiHttp = require('chai-http');
let server = require('../server');
chai.use(chaiHttp);
var expect = chai.expect;
var authenticatedUser = chai.request.agent(server);
var credentials = null;

describe("User Service", () => {

    /*   before(function (done) {
          authenticatedUser.post('/v1/login')
              .send({ "username": "Ivansalazar", "password": "asa12aawQ312" })
              .end(function (err, res) {
                  if (err)
                      return done(err);
  
                  credentials = res.body.user.accessToken;
                  done();
              });
      }); */

    describe("its a instance of service", () => {

        it("Is not null", () => {
            assert.isNotNull(userService);
        });
    });

    describe("/POST user", () => {
        it("Should be able to register a user", (done) => {
            authenticatedUser.post('/v1/user')
                //.set({ "Authorization": `Bearer ${credentials}` })
                .send({
                    "name": "ivan",
                    "username": "Ivansalazar2",
                    "lastName": "salazar2",
                    "password": "asa12aawQ312",
                    "email": "dfadfadf",
                    "prefer_coin": "jpy"
                })
                .end(function (err, res) {
                    if (err)
                        return done(err);

                    expect(res.body).to.be.an('Object');
                    done();
                });
        });
    });
});
