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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureThumbFolderExists = exports.exactResizeExists = exports.resizeImage = exports.deleteFolder = exports.deleteFile = exports.fileName = exports.filePresent = exports.listDir = void 0;
var fs_1 = require("fs");
var promises_1 = require("fs/promises");
var lodash_1 = __importDefault(require("lodash"));
var sharp_1 = __importDefault(require("sharp"));
var app_root_path_1 = __importDefault(require("app-root-path"));
// To list directory content
function listDir(relativePath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_1.promises.readdir("".concat(app_root_path_1.default.path, "/").concat(relativePath))];
                case 1: return [2 /*return*/, _b.sent()];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.listDir = listDir;
// To check if file is present
function filePresent(relativePath) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_1.promises.access("".concat(app_root_path_1.default.path, "/").concat(relativePath), promises_1.constants.F_OK)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    e_1 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.filePresent = filePresent;
// To get file name
function fileName(start) {
    return __awaiter(this, void 0, void 0, function () {
        var files, fileValues;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, listDir("images")];
                case 1:
                    files = _a.sent();
                    fileValues = files.filter(function (element) {
                        lodash_1.default.startsWith(element, "".concat(start));
                    });
                    if (fileValues.length === 0)
                        throw new Error('file does not exist');
                    return [2 /*return*/, fileValues.reduce(function (element) { return element; })];
            }
        });
    });
}
exports.fileName = fileName;
// To Delete a file
function deleteFile(relativePath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_1.promises.rm("".concat(app_root_path_1.default.path, "/").concat(relativePath))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteFile = deleteFile;
// To delete a folder 
function deleteFolder(relativePath) {
    return __awaiter(this, void 0, void 0, function () {
        var files, _i, files_1, file, folderName, _a, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, listDir(relativePath)];
                case 1:
                    files = _b.sent();
                    if (!(files.length > 0)) return [3 /*break*/, 5];
                    _i = 0, files_1 = files;
                    _b.label = 2;
                case 2:
                    if (!(_i < files_1.length)) return [3 /*break*/, 5];
                    file = files_1[_i];
                    return [4 /*yield*/, deleteFile("images/thumb/".concat(file))];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    folderName = "".concat(app_root_path_1.default.path, "/").concat(relativePath);
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, fs_1.promises.rmdir(folderName)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _a = _b.sent();
                    message = _a.message;
                    console.log("Error: ".concat(message));
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.deleteFolder = deleteFolder;
//Resizes an image according to filename, width and height constraints
function resizeImage(filename, width, height) {
    return __awaiter(this, void 0, void 0, function () {
        var imageName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ensureThumbFolderExists()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, exactResizeExists(filename, width, height)];
                case 2:
                    if (_a.sent())
                        return [2 /*return*/];
                    return [4 /*yield*/, fileName(filename)];
                case 3:
                    imageName = _a.sent();
                    return [4 /*yield*/, (0, sharp_1.default)("".concat(app_root_path_1.default.path, "/images/").concat(imageName))
                            .resize({ width: width, height: height })
                            .toFile("".concat(app_root_path_1.default.path, "/images/thumb/").concat(imageName))];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.resizeImage = resizeImage;
// To Check if a resized image with the same dimensions exist
function exactResizeExists(filename, width, height) {
    return __awaiter(this, void 0, void 0, function () {
        var imageName, metadata, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fileName(filename)];
                case 1:
                    imageName = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, sharp_1.default)("".concat(app_root_path_1.default.path, "/images/thumb/").concat(imageName)).metadata()];
                case 3:
                    metadata = _b.sent();
                    return [2 /*return*/, metadata.width === width && metadata.height === height];
                case 4:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.exactResizeExists = exactResizeExists;
// Create thumb folder if not exists
function ensureThumbFolderExists() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, code, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, filePresent('images/thumb')];
                case 1:
                    if (!!(_b.sent())) return [3 /*break*/, 5];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fs_1.promises.mkdir("".concat(app_root_path_1.default.path, "/images/thumb"))];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    code = _a.code, message = _a.message;
                    console.log("mkdir result -> ".concat(message));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.ensureThumbFolderExists = ensureThumbFolderExists;
