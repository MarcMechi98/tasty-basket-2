export class Food {
  id!: string;
  name!: string;
  price!: number;
  tags?: string[];
  stars!: number;
  isFavorite?: boolean;
  imageUrl!: string;
  origins!: string[];
  cookingTime!: string;
}
