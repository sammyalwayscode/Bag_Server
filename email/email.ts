import { google } from "googleapis";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "55109447296-0blr29bkdo1gu995oobh71ql2is9bj22.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04pDgWouHMeltCgYIARAAGAQSNwF-L9Ircccm1j5RvOWRUF4Bppn9LhF5kJ4-CvQLVypZdkrKBWAg8Pslb5DrcPlvx_CVAKOrHis";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

export const recieveOrder = async (email: string, name: string) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
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

    const buildFile = path.join(__dirname, "../views/mail.ejs");
    const data = await ejs.renderFile(buildFile, {
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
  } catch (error) {
    return error;
  }
};
