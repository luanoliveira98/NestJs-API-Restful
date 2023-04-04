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
  IsUUID,
  IsOptional,
} from 'class-validator';

class CharacteristicProductDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;
}

class ImageProductDTO {
  @IsUrl()
  @IsOptional()
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;
}

export class UpdateProductDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsOptional()
  value: number;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @IsOptional()
  description: string;

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(3)
  @Type(() => CharacteristicProductDTO)
  @IsOptional()
  characteristics: CharacteristicProductDTO[];

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => ImageProductDTO)
  @IsOptional()
  images: ImageProductDTO[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category: string;

  @IsUUID()
  userId: string;
}
