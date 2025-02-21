import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import platformConstants from '../../../../config/platformConstants';

@Entity('permissions')
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    name: string;

    @Column({ type: 'jsonb', nullable: false })
    values: { value: string; description: string }[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'enum', enum: platformConstants.userTypes })
    userType: (typeof platformConstants.userTypes)[number];

    @Column({ type: 'jsonb', default: [] })
    permissions: {
        id: number;
        value: string;
        description: string;
    }[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
