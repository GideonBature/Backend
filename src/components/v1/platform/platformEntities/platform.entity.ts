import {
    Entity,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import appConfigs from '../../../../config';
import { supportedCountryType } from '../../../../types/global';
import platformConstants from '../../../../config/platformConstants';

// Platform Entity
@Entity('platform')
class PlatformEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 255,
        default: appConfigs.platformConfig.name,
    })
    name: string;

    @Column({ type: 'varchar', nullable: true, length: 255 })
    version: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    url: string;

    @Column({ type: 'simple-array', default: platformConstants.userTypes })
    userTypes: (typeof platformConstants.userTypes)[number][];

    @Column({
        type: 'simple-array',
        default: platformConstants.supportedCountries,
    })
    supportedCountries: supportedCountryType[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default PlatformEntity;
