import { Injectable } from '@nestjs/common';
import { UserRepository } from './../user.repository';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(
    value: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const emailAlreadyExists = await this.userRepository.emailAlreadyExists(
      value,
    );

    return !emailAlreadyExists;
  }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, prop: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
