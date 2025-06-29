import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Unique, BeforeInsert } from "typeorm"
import { uuid } from "../../../utils"
import { Network } from "../../../types/enums"

@Entity("FeeConfig")
@Unique("unique_network_config", ["chainName", "network", "chainId"])
export class FeeConfigEntity {
  @PrimaryColumn("text")
  id: string

  @Column({
    type: "enum",
    enum: Network,
    nullable: false,
  })
  network: Network

  @Column("text", { name: "chain_id", nullable: false })
  chainId: string

  @Column("text", { name: "chain_name", nullable: false })
  chainName: string

  @Column("decimal", {
    precision: 65,
    scale: 30,
    nullable: false,
  })
  amount: string

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export default FeeConfigEntity
