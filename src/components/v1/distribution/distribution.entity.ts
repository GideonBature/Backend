import { Entity, Column, PrimaryColumn, CreateDateColumn, Index, BeforeInsert } from "typeorm"
import { uuid } from "../../../utils"
import { DistributionType, DistributionStatus, Network } from "../../../types/enums"

@Entity("Distribution")
@Index("Distribution_created_at_idx", ["createdAt"])
@Index("Distribution_status_idx", ["status"])
@Index("Distribution_transaction_hash_idx", ["transactionHash"])
@Index("Distribution_user_address_idx", ["userAddress"])
export class DistributionEntity {
  @PrimaryColumn("text")
  id: string

  @Column("text", { name: "user_address", nullable: false })
  userAddress: string

  @Column("text", { name: "transaction_hash", nullable: true })
  transactionHash: string | null

  @Column("text", { name: "token_address", nullable: false })
  tokenAddress: string

  @Column("text", { name: "token_symbol", nullable: false })
  tokenSymbol: string

  @Column("integer", { name: "token_decimals", nullable: false })
  tokenDecimals: number

  @Column("decimal", {
    name: "total_amount",
    precision: 65,
    scale: 30,
    nullable: false,
  })
  totalAmount: string

  @Column("decimal", {
    name: "fee_amount",
    precision: 65,
    scale: 30,
    nullable: false,
  })
  feeAmount: string

  @Column("decimal", {
    name: "usd_rate",
    precision: 65,
    scale: 30,
    default: "0",
  })
  usdRate: string

  @Column("decimal", {
    name: "total_usd_amount",
    precision: 65,
    scale: 30,
    default: "0",
  })
  totalUsdAmount: string

  @Column("integer", { name: "total_recipients", nullable: false })
  totalRecipients: number

  @Column({
    type: "enum",
    enum: DistributionType,
    name: "distribution_type",
    nullable: false,
  })
  distributionType: DistributionType

  @Column("text", { name: "chain_name", default: "" })
  chainName: string

  @Column({
    type: "enum",
    enum: DistributionStatus,
    default: DistributionStatus.PENDING,
    nullable: false,
  })
  status: DistributionStatus

  @Column("bigint", { name: "block_number", nullable: true })
  blockNumber: number | null

  @Column("timestamp", {
    name: "block_timestamp",
    precision: 3,
    nullable: true,
  })
  blockTimestamp: Date | null

  @Column({
    type: "enum",
    enum: Network,
    default: Network.MAINNET,
    nullable: false,
  })
  network: Network

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    precision: 3,
  })
  createdAt: Date

  @Column("jsonb", { nullable: true })
  metadata: Record<string, any> | null

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export default DistributionEntity
