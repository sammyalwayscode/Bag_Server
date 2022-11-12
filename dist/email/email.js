"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recieveOrder = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const GOOGLE_SECRET = "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";
const GOOGLE_ID = "55109447296-0blr29bkdo1gu995oobh71ql2is9bj22.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN = "1//04pDgWouHMeltCgYIARAAGAQSNwF-L9Ircccm1j5RvOWRUF4Bppn9LhF5kJ4-CvQLVypZdkrKBWAg8Pslb5DrcPlvx_CVAKOrHis";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });
const recieveOrder = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "olorundasamuel2@gmail.com",
                refreshToken: accessToken.token,
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                accessToken: GOOGLE_REFRESHTOKEN,
            },
        });
        const buildFile = path_1.default.join(__dirname, "../views/mail.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, {
            name: name,
        });
        const mainOptions = {
            from: "Bag.🛍️🎒🛍️🎒 <olorundasamuel2@gmail.com>",
            to: email,
            subject: "Your Order Has Been Recived 🤝🤝🤝",
            html: data,
        };
        transporter.sendMail(mainOptions, () => {
            console.log("Mail Sent Successfully");
        });
    }
    catch (error) {
        return error;
    }
});
exports.recieveOrder = recieveOrder;
