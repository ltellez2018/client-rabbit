"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const reporter_routes_1 = __importDefault(require("./routes/reporter.routes"));
const app = express_1.default();
// settings
app.set('port', process.env.PORT || 3000);
// middlewares
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// app.use(passport.initialize());
// passport.use(passportMiddleware);
app.get('/', (req, res) => {
    return res.send(`The API is at http://localhost:${app.get('port')}`);
});
app.use(reporter_routes_1.default);
exports.default = app;
