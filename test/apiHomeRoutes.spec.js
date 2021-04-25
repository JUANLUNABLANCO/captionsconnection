// var assert = require("assert");
const request = require("supertest");
const { expect } = require("chai");

global._ENV = process.env.NODE_ENV || "testing"; // necesario para que se cargue la configuración específica
process.env.NODE_ENV = "testing";

const mongoose = require("../src/app_server/_connections/db_connect");

const server = require("../src/app_server/server");
// const mongoose = require("mongoose");
// const createServer = require("../src/app_server/server");
// > npm run mongodTtest
const colors = {
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    reset: "\x1b[0m",
};

// BgBlack = "\x1b[40m";
// BgRed = "\x1b[41m";
// BgGreen = "\x1b[42m";
// BgYellow = "\x1b[43m";
// BgBlue = "\x1b[44m";
// BgMagenta = "\x1b[45m";
// BgCyan = "\x1b[46m";
// BgWhite = "\x1b[47m";

before((done) => {
    console.warn(
        colors.FgYellow,
        "REMEMBER !!!: DATABASE DAEMON SHOULD BE STARTED: > npm run mongodTest "
    );
    console.log("\x1b[0m");
    done();
});

after((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => {
            server.close();
            done();
        });
    });
});

describe("Api routes comprobation: '/', '/api', '/home'", function (done) {
    // ruta '/'
    it("The route '/' its redirect to '/api', and after should return the message that contains 'Redirecting to /api'", function (done) {
        // assert.equal(5, 3 + 2, "Error: add a + b dont gives you 5");
        request(server)
            .get("/")
            .expect(302)
            .expect("Location", "/api")
            .end(function (error, response) {
                if (error) {
                    console.log(colors.FgRed, "Request " + error);
                    console.log(colors.reset, "");
                    done(error);
                } else {
                    // console.dir(response);
                    expect(response.text).to.contain("Redirecting to /api");
                    done();
                }
            });
    });
    // ruta '/api'
    it("The route '/api' should return the json '{... message: 'in /api'}'", function (done) {
        // assert.equal(5, 3 + 2, "Error: add a + b dont gives you 5");
        request(server)
            .get("/api")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (error, response) {
                if (error) {
                    console.log(colors.FgRed, "Request " + error);
                    console.log(colors.reset, "");
                    done(error);
                } else {
                    // text: '{"ok":true,"status":200,"message":"in /api"}',
                    expect(response.text).to.contains(
                        '{"ok":true,"status":200,"message":"in /api"}'
                    );
                    // body: { ok: true, status: 200, message: 'in /api' },
                    expect(response.body.message).to.equal("in /api");
                    done();
                }
            });
    });
    // ruta '/home'
    it("The route '/api/home' should return the json '{... message: 'in /api/home'}'", function (done) {
        // assert.equal(5, 3 + 2, "Error: add a + b dont gives you 5");
        request(server)
            .get("/api/home")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (error, response) {
                if (error) {
                    console.log(colors.FgRed, "Request " + error);
                    console.log(colors.reset, "");
                    done(error);
                } else {
                    expect("Content-Type", /json/);
                    // text: '{"ok":true,"status":200,"message":"in /api"}',
                    expect(response.text).to.contains(
                        '{"ok":true,"status":200,"message":"in /api/home"}'
                    );
                    // body: { ok: true, status: 200, message: 'in /api' },
                    expect(response.body.message).to.equal("in /api/home");
                    done();
                }
            });
    });
});

describe("channel routes comprobation: '/api/channel', '/api/channel/check-channel-exists', '/api/channel/register'", async function (done) {
    it("The route '/api/channel/check-channel-exists' its returns true | false'", function (done) {
        let data = { channelName: "noexisteenbd" };
        request(server)
            .post("/api/channel/check-channel-exists")
            .set("Accept", "application/json")
            .send(data)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((error, response) => {
                if (error) {
                    console.log(colors.FgRed, "Request " + error);
                    console.log(colors.reset, "");
                    done(error);
                } else {
                    expect(response.body.isChannelNameAvailable).to.equal(true);
                    done();
                }
            });
    });

    // it("The route '/api/channel/register' its returns ", function (done) {
    //     let data = {
    //         channelType: "YOUTUBE",
    //         clientEmail: "testing@test.com",
    //         channelName: "duotest3",
    //         channelLanguage: "PT",
    //         channelCategory: "education",
    //         clientInterestingNow: false,
    //     };
    //     request(server)
    //         .post("/api/channel/register")
    //         .set("Accept", "application/json")
    //         .send(data)
    //         .expect("Content-Type", /json/)
    //         .expect(201)
    //         .end(function (error, response) {
    //             if (error) {
    //                 console.log(colors.FgRed, "Request " + error);
    //                 console.log(colors.reset, "");
    //             } else {
    //                  expect(response.body.channel).to.equal(true);
    //                  done();
    //             }
    //         });
    // });
});
