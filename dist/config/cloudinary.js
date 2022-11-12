"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
require("dotenv").config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRETS,
    secure: true,
});
exports.default = cloudinary_1.v2;
// exports.uploads = () => (file: any, folder: any) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(
//       file,
//       (result: any) => {
//         resolve({
//           url: result.url,
//           id: result.public_id,
//         });
//       },
//       {
//         resource_type: "auto",
//         folder: folder,
//       }
//     );
//   });
// };
