// const mongoose = require("mongoose");
// // const createServer = require("../src/app_server/server");
// // > npm run mongodTtest
// const colors = {
//     FgRed: "\x1b[31m",
//     FgGreen: "\x1b[32m",
//     FgYellow: "\x1b[33m",
//     FgBlue: "\x1b[34m",
//     FgMagenta: "\x1b[35m",
//     FgCyan: "\x1b[36m",
//     FgWhite: "\x1b[37m",
//     reset: "\x1b[0m",
// };

// // BgBlack = "\x1b[40m";
// // BgRed = "\x1b[41m";
// // BgGreen = "\x1b[42m";
// // BgYellow = "\x1b[43m";
// // BgBlue = "\x1b[44m";
// // BgMagenta = "\x1b[45m";
// // BgCyan = "\x1b[46m";
// // BgWhite = "\x1b[47m";

// before((done) => {
//     console.warn(
//         colors.FgYellow,
//         "REMEMBER !!!: DATABASE DAEMON SHOULD BE STARTED: > npm run mongodTest "
//     );
//     console.log("\x1b[0m");
//     mongoose.connect("mongodb://localhost:27017/DB_caption_connection", {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//     });
//     mongoose.connection
//         .once("open", () => {
//             console.log(
//                 "**********************************************************************"
//             );
//             console.log(
//                 "*        connection to database, in TESTING_MODE, in PORT: 27017     *"
//             );
//             console.log(
//                 "**********************************************************************"
//             );
//             done();
//         })
//         .on("error", (error) => {
//             console.error.bind(console, error); // enlaza el track de error a la consola (proceso actual)
//             done(error);
//         });
// });

// after((done) => {
//     mongoose.connection.db.dropDatabase(() => {
//         mongoose.connection.close(() => done());
//     });
// });

// const app = createServer();
