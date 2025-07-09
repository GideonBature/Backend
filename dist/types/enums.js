"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = exports.DistributionStatus = exports.DistributionType = void 0;
var DistributionType;
(function (DistributionType) {
    DistributionType["BULK_TRANSFER"] = "bulk_transfer";
    DistributionType["AIRDROP"] = "airdrop";
    DistributionType["PAYMENT"] = "payment";
    DistributionType["REWARD"] = "reward";
})(DistributionType || (exports.DistributionType = DistributionType = {}));
var DistributionStatus;
(function (DistributionStatus) {
    DistributionStatus["PENDING"] = "pending";
    DistributionStatus["PROCESSING"] = "processing";
    DistributionStatus["COMPLETED"] = "completed";
    DistributionStatus["FAILED"] = "failed";
    DistributionStatus["CANCELLED"] = "cancelled";
})(DistributionStatus || (exports.DistributionStatus = DistributionStatus = {}));
var Network;
(function (Network) {
    Network["MAINNET"] = "mainnet";
    Network["TESTNET"] = "testnet";
    Network["POLYGON"] = "polygon";
    Network["BSC"] = "bsc";
    Network["ARBITRUM"] = "arbitrum";
    Network["OPTIMISM"] = "optimism";
})(Network || (exports.Network = Network = {}));
