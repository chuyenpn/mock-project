export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Image = {
  id: number;
  largeImageURL: string;
  views: number;
  user: string;
  tags: string;
};

export enum OrderBy {
  popular = 'popular',
  latest = 'latest',
}
