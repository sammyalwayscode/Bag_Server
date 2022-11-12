import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETS,
  secure: true,
});

export default cloudinary;

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
