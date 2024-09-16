import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Like {
  @PrimaryColumn()
  cat_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: string;
}
