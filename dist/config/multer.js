"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDetail = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
//File Validation
const upload = (0, multer_1.default)({ storage: storage }).single("avatar");
exports.upload = upload;
const uploadDetail = (0, multer_1.default)({ storage: storage }).single("descAvatar");
exports.uploadDetail = uploadDetail;
// const storage = multer.diskStorage({
//   destination: function (req: Request, _file: any, cb: any) {
//       const dir = './uploads/';
//       mkdir(dir, (err: NodeJS.ErrnoException) => {
//           cb(err, dir)
//       });
//   },
//   filename: function (_req: Request, file: any, cb: any) {
//       cb(null, file.originalname)
//   }
// });
// const upload = multer({
//   storage: storage
// });
