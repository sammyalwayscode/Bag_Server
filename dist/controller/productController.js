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
exports.searchProducts = exports.getOneProduct = exports.deleteProduct = exports.updateProduct = exports.createProducts = exports.getProducts = void 0;
const productModel_1 = __importDefault(require("../model/productModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.find();
        return res.status(200).json({
            message: "Products Gotten",
            data: product,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "An Error Occoured ❌❌❌",
            data: error,
        });
    }
});
exports.getProducts = getProducts;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findOneProduct = yield productModel_1.default.findById(req.params.id);
        return res.status(200).json({
            message: "Product Found",
            data: findOneProduct,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "An Error Occoured",
            data: error,
        });
    }
});
exports.getOneProduct = getOneProduct;
const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { productName, price, brandName, bagType, bagColor } = req.body;
        const cloudImage = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const uploadProduct = yield productModel_1.default.create({
            productName,
            price,
            brandName,
            bagType,
            bagColor,
            avatar: cloudImage.secure_url,
            avatarID: cloudImage.public_id,
        });
        return res.status(201).json({
            message: "Product Created Sucessfully",
            data: uploadProduct,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "An Error Occoured",
            data: error,
        });
    }
});
exports.createProducts = createProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const check = yield productModel_1.default.findById(req.params.id);
        if (check) {
            const { productName, price, brandName, bagType, bagColor } = req.body;
            cloudinary_1.default.uploader.destroy(check === null || check === void 0 ? void 0 : check.avatarID);
            const cloudImage = yield cloudinary_1.default.uploader.upload((_b = req.file) === null || _b === void 0 ? void 0 : _b.path);
            // const cloudImage = await cloudinary.uploader.upload(req?.file!.path);
            const updateProduct = yield productModel_1.default.findByIdAndUpdate(req.params.id, {
                productName,
                price,
                brandName,
                bagType,
                bagColor,
                avatar: cloudImage.secure_url,
                avatarID: cloudImage.public_id,
            }, { new: true });
            return res.status(201).json({
                message: "Product Updated",
                data: updateProduct,
            });
        }
        else {
            return res.status(404).json({
                message: "Can't Perform Update",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "An Error Occoured",
            data: error,
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productDelete = yield productModel_1.default.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Delete Sucessfull",
            data: productDelete,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "An Error Occoured",
            data: error,
        });
    }
});
exports.deleteProduct = deleteProduct;
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const keyword = req.query.search ?
        // {
        //   $or: [
        //     {productName: {$regex: req.query.search, $options:"i"}}
        //     {brandName: {$regex: req.query.search, $options:"i"}}
        //   ]
        // } : {}
        //const user =  await productModel.find(keyword)
        const newQuery = req.query;
        const product = yield productModel_1.default.find(newQuery);
        return res.status(200).send(product);
    }
    catch (error) {
        return res.status(404).json({
            message: "An Error Occoured",
            data: error,
        });
    }
});
exports.searchProducts = searchProducts;
