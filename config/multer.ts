import { Request } from "express";
import multer from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, "uploads");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

//File Validation

const upload = multer({ storage: storage }).single("avatar");
const uploadDetail = multer({ storage: storage }).single("descAvatar");

// const cpUpload = upload.fields([{ name: "avatar" }, { name: "descAvatar" }]);

export { upload, uploadDetail };

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
