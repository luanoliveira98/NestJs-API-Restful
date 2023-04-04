class CharacteristicProductEntity {
  name: string;
  description: string;
}

class ImageProductEntity {
  url: string;
  description: string;
}

export class ProductEntity {
  id: string;
  name: string;
  value: number;
  quantity: number;
  description: string;
  characteristics: CharacteristicProductEntity[];
  images: ImageProductEntity[];
  category: string;
  userId: string;
}
