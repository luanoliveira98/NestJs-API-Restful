import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsString,
  IsUrl,
  IsNumber,
  ArrayMinSize,
  MaxLength,
} from 'class-validator';

class CharacteristicProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

class ImageProductDTO {
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  value: number;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(3)
  @Type(() => CharacteristicProductDTO)
  characteristics: CharacteristicProductDTO[];

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => ImageProductDTO)
  images: ImageProductDTO[];

  @IsString()
  @IsNotEmpty()
  category: string;
}
