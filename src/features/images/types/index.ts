import { BaseEntity } from '@/types';

export type Image = {
  title: string;
  body: string;
  teamId: string;
} & BaseEntity;
