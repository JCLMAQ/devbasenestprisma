import { PartialType } from '@nestjs/mapped-types';
import { CreateEmaildomainDto } from './create-emaildomain.dto';

export class UpdateEmaildomainDto extends PartialType(CreateEmaildomainDto) {}
