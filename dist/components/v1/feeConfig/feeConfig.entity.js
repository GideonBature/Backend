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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeConfigEntity = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("../../../utils");
const enums_1 = require("../../../types/enums");
let FeeConfigEntity = class FeeConfigEntity {
    id;
    network;
    chainId;
    chainName;
    amount;
    createdAt;
    updatedAt;
    generateId() {
        if (!this.id) {
            this.id = (0, utils_1.uuid)();
        }
    }
};
exports.FeeConfigEntity = FeeConfigEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)("text"),
    __metadata("design:type", String)
], FeeConfigEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.Network,
        nullable: false,
    }),
    __metadata("design:type", String)
], FeeConfigEntity.prototype, "network", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "chain_id", nullable: false }),
    __metadata("design:type", String)
], FeeConfigEntity.prototype, "chainId", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "chain_name", nullable: false }),
    __metadata("design:type", String)
], FeeConfigEntity.prototype, "chainName", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        precision: 65,
        scale: 30,
        nullable: false,
    }),
    __metadata("design:type", String)
], FeeConfigEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "created_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], FeeConfigEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: "updated_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], FeeConfigEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FeeConfigEntity.prototype, "generateId", null);
exports.FeeConfigEntity = FeeConfigEntity = __decorate([
    (0, typeorm_1.Entity)("FeeConfig"),
    (0, typeorm_1.Unique)("unique_network_config", ["chainName", "network", "chainId"])
], FeeConfigEntity);
exports.default = FeeConfigEntity;
