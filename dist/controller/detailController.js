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
exports.deleteProductDetail = exports.updateProductDetail = exports.createDetail = exports.getDetail = void 0;
const detailModel_1 = __importDefault(require("../model/detailModel"));
const productModel_1 = __importDefault(require("../model/productModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const getDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detail = yield productModel_1.default.findById(req.params.id).populate({
            path: "productDetail",
            options: { sort: { createdAt: -1 } },
        });
        return res.status(200).json({
            message: "Data Gotten",
            data: detail,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "An Error Occoured",
            data: error,
        });
    }
});
exports.getDetail = getDetail;
const createDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { productDesription1, productDesription2 } = req.body;
        const cloudImage = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const getProduct = yield productModel_1.default.findById(req.params.id);
        const newDetail = yield detailModel_1.default.create({
            productName: getProduct === null || getProduct === void 0 ? void 0 : getProduct.productName,
            productDesription1,
            productDesription2,
            price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.price,
            brandName: getProduct === null || getProduct === void 0 ? void 0 : getProduct.brandName,
            bagType: getProduct === null || getProduct === void 0 ? void 0 : getProduct.bagType,
            bagColor: getProduct === null || getProduct === void 0 ? void 0 : getProduct.bagColor,
            avatar: getProduct === null || getProduct === void 0 ? void 0 : getProduct.avatar,
            avatarID: getProduct === null || getProduct === void 0 ? void 0 : getProduct.avatarID,
            descAvatar: cloudImage.secure_url,
            descAvatarID: cloudImage.public_id,
        });
        getProduct === null || getProduct === void 0 ? void 0 : getProduct.productDetail.push(new mongoose_1.default.Types.ObjectId(newDetail._id));
        getProduct === null || getProduct === void 0 ? void 0 : getProduct.save();
        return res.status(201).json({
            message: "Detail Created...",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "An Error Occoured.",
            data: error,
        });
    }
});
exports.createDetail = createDetail;
const updateProductDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield detailModel_1.default.findById(req.params.id);
        const cloudImage = yield cloudinary_1.default.uploader.upload(req.path);
        if (check) {
            const { productDesription1, productDesription2 } = req.body;
            cloudinary_1.default.uploader.destroy(check.avatarID);
            const updateDetail = yield detailModel_1.default.findByIdAndUpdate(req.params.id, {
                productDesription1,
                productDesription2,
                descAvatar: cloudImage.secure_url,
                descAvatarID: cloudImage.public_id,
            }, { new: true });
            return res.status(201).json({
                message: "Detail Updated",
                data: updateDetail,
            });
        }
        else {
            return res.status(404).json({
                message: "Can't preform Update",
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
exports.updateProductDetail = updateProductDetail;
const deleteProductDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const getProduct = await productModel.findById(req.params.id)
        const removeDetail = yield detailModel_1.default.findByIdAndRemove(req.params.id);
        return res.status(200).json({
            message: "Deleted!!!",
            data: removeDetail,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "An Error Occoured",
            data: error,
        });
    }
});
exports.deleteProductDetail = deleteProductDetail;
