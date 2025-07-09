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
exports.DistributionEntity = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("../../../utils");
const enums_1 = require("../../../types/enums");
let DistributionEntity = class DistributionEntity {
    id;
    userAddress;
    transactionHash;
    tokenAddress;
    tokenSymbol;
    tokenDecimals;
    totalAmount;
    feeAmount;
    usdRate;
    totalUsdAmount;
    totalRecipients;
    distributionType;
    chainName;
    status;
    blockNumber;
    blockTimestamp;
    network;
    createdAt;
    metadata;
    generateId() {
        if (!this.id) {
            this.id = (0, utils_1.uuid)();
        }
    }
};
exports.DistributionEntity = DistributionEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)("text"),
    __metadata("design:type", String)
], DistributionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "user_address", nullable: false }),
    __metadata("design:type", String)
], DistributionEntity.prototype, "userAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "transaction_hash", nullable: true }),
    __metadata("design:type", Object)
], DistributionEntity.prototype, "transactionHash", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "token_address", nullable: false }),
    __metadata("design:type", String)
], DistributionEntity.prototype, "tokenAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "token_symbol", nullable: false }),
    __metadata("design:type", String)
], DistributionEntity.prototype, "tokenSymbol", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "token_decimals", nullable: false }),
    __metadata("design:type", Number)
], DistributionEntity.prototype, "tokenDecimals", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "total_amount",
        precision: 65,
        scale: 30,
        nullable: false,
    }),
    __metadata("design:type", String)
], DistributionEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "fee_amount",
        precision: 65,
        scale: 30,
        nullable: false,
    }),
    __metadata("design:type", String)
], DistributionEntity.prototype, "feeAmount", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "usd_rate",
        precision: 65,
        scale: 30,
        default: "0",
    }),
    __metadata("design:type", String)
], DistributionEntity.prototype, "usdRate", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "total_usd_amount",
        precision: 65,
        scale: 30,
        default: "0",
    }),
    __metadata("design:type", String)
], DistributionEntity.prototype, "totalUsdAmount", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "total_recipients", nullable: false }),
    __metadata("design:type", Number)
], DistributionEntity.prototype, "totalRecipients", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.DistributionType,
        name: "distribution_type",
        nullable: false,
    }),
    __metadata("design:type", String)
], DistributionEntity.prototype, "distributionType", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "chain_name", default: "" }),
    __metadata("design:type", String)
], DistributionEntity.prototype, "chainName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.DistributionStatus,
        default: enums_1.DistributionStatus.PENDING,
        nullable: false,
    }),
    __metadata("design:type", String)
], DistributionEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "block_number", nullable: true }),
    __metadata("design:type", Object)
], DistributionEntity.prototype, "blockNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "block_timestamp",
        precision: 3,
        nullable: true,
    }),
    __metadata("design:type", Object)
], DistributionEntity.prototype, "blockTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.Network,
        default: enums_1.Network.MAINNET,
        nullable: false,
    }),
    __metadata("design:type", String)
], DistributionEntity.prototype, "network", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "created_at",
        type: "timestamp",
        precision: 3,
    }),
    __metadata("design:type", Date)
], DistributionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb", { nullable: true }),
    __metadata("design:type", Object)
], DistributionEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DistributionEntity.prototype, "generateId", null);
exports.DistributionEntity = DistributionEntity = __decorate([
    (0, typeorm_1.Entity)("Distribution"),
    (0, typeorm_1.Index)("Distribution_created_at_idx", ["createdAt"]),
    (0, typeorm_1.Index)("Distribution_status_idx", ["status"]),
    (0, typeorm_1.Index)("Distribution_transaction_hash_idx", ["transactionHash"]),
    (0, typeorm_1.Index)("Distribution_user_address_idx", ["userAddress"])
], DistributionEntity);
exports.default = DistributionEntity;
