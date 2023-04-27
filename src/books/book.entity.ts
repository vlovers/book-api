import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  date_written: Date;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  date_added: Date;

  @ApiProperty()
  @Column()
  author: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rating: number;
}
