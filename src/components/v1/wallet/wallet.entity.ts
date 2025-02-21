import {
    Entity,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

// Wallet Entity
@Entity('wallet')
class WalletEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default WalletEntity;
