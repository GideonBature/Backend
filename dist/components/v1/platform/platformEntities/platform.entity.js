"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../../../../config"));
const platformConstants_1 = __importDefault(require("../../../../config/platformConstants"));
// Platform Entity
let PlatformEntity = class PlatformEntity {
    id;
    name;
    version;
    description;
    url;
    userTypes;
    supportedCountries;
    createdAt;
    updatedAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlatformEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 255,
        default: config_1.default.platformConfig.name,
    }),
    __metadata("design:type", String)
], PlatformEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 255 }),
    __metadata("design:type", String)
], PlatformEntity.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PlatformEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PlatformEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', default: platformConstants_1.default.userTypes }),
    __metadata("design:type", Array)
], PlatformEntity.prototype, "userTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
        default: platformConstants_1.default.supportedCountries,
    }),
    __metadata("design:type", Array)
], PlatformEntity.prototype, "supportedCountries", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PlatformEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PlatformEntity.prototype, "updatedAt", void 0);
PlatformEntity = __decorate([
    (0, typeorm_1.Entity)('platform')
], PlatformEntity);
exports.default = PlatformEntity;
