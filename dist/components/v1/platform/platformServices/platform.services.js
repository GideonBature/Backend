"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformService = void 0;
const platform_entity_1 = __importDefault(require("../platformEntities/platform.entity"));
const data_source_1 = __importDefault(require("../../../../config/persistence/data-source"));
class _PlatformService {
    platformRepository;
    constructor(platformRepository) {
        this.platformRepository = platformRepository;
    }
}
const platformRepository = data_source_1.default.getRepository(platform_entity_1.default);
exports.PlatformService = new _PlatformService(platformRepository);
exports.default = platformRepository;
