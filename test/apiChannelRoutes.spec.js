// const request = require("supertest");
// const { expect } = require("chai");
// global._ENV = process.env.NODE_ENV || "testing"; // necesario para que se cargue la configuración específica
// process.env.NODE_ENV = "testing";

// const server = require("../src/app_server/server");
// // const mongoose = require("mongoose");
// // const Channel = require("../src/app_server/Channel/channel.model");

// // ...

// describe("Api routes comprobation: '/api/channel', '/api/channel/register', '/api/channel/check-channel-exists'", async (done) => {
//     // const channel = await Channel.create({
//     //     channelType: "YOUTUBE",
//     //     clientEmail: "testing@test.com",
//     //     channelName: "duotest1",
//     //     channelLanguage: "PT",
//     //     channelCategory: "education",
//     //     // clientInterestingNow: false,
//     // });
//     const data = { channelName: "noexisteenbd" };
//     // after all
//     after(function () {
//         server.close();
//         // done();
//     });

//     it("The route '/api/channel/' its redirect to '/api', and after should return the message that contains 'Redirecting to /api'", function (done) {
//         request(server)
//             .post("/api/channel/check-channel-exists", data)
//             .expect(200)
//             .end(function (error, response) {
//                 if (error) {
//                     console.log("Request Error: " + error);
//                 } else {
//                     // console.dir(response);
//                     expect(response.text).to.contain("Redirecting to /api");
//                 }
//                 return done();
//             });
//     });
// });

// test("POST /api/posts", async () => {
//     const data = {
//         title: "Post 1",
//         content: "Lorem ipsum",
//     };

//     await supertest(app)
//         .post("/api/posts")
//         .send(data)
//         .expect(200)
//         .then(async (response) => {
//             // Check the response
//             expect(response.body._id).toBeTruthy();
//             expect(response.body.title).toBe(data.title);
//             expect(response.body.content).toBe(data.content);

//             // Check the data in the database
//             const post = await Post.findOne({ _id: response.body._id });
//             expect(post).toBeTruthy();
//             expect(post.title).toBe(data.title);
//             expect(post.content).toBe(data.content);
//         });
// });
