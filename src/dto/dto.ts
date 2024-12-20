import { IsOptional, IsString, ValidateNested, IsObject, IsUrl, IsNotEmpty, IsEmail, IsArray, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { AcademicRole, Gender } from '../interfaces/model.interface';


export class updateInstitutionDto {
 
  @IsOptional()
  @IsUrl() 
  iconUrl?: string;

}

export class UpdateUserDto {
  
  @IsOptional()
  @IsString() 
  phoneNumber?: string;

  @IsOptional()
  @IsUrl() 
  profileUrl?: string;
 
  @IsOptional()
  @IsEnum(Gender) 
  gender?: Gender;

  @IsOptional()
  @IsString() 
  organisation?: string;
 
  @IsOptional()
  @IsString() 
  department?: string;

  @IsOptional()
  @IsString() 
  level?: string;

  @IsOptional()
  @IsString() 
  cv?: string;

  @IsOptional()
  @IsString() 
  language?: string;

  @IsOptional()
  @IsString() 
  purposeOfResearch?: string;

  @IsOptional()
  @IsUrl() 
  linkedinUrl?: string;

  @IsOptional()
  @IsUrl() 
  researchGateUrl?: string;

}

class CreateBulkUserDto{
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsEnum(AcademicRole)
  @IsNotEmpty()
  academicRole!: AcademicRole;
}

export class CreateUserByInstitutionDto{

  @ValidateNested()
  @IsArray()
  @Type(() => CreateBulkUserDto)
  users!: CreateBulkUserDto;

}

export class CreateResearcherDto{
 
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

}

export class CreateInstitutionDto{

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

}

export class ResendOtpDto{
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class LoginDto{
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class VerifyLoginDto{
  @IsString()
  @IsNotEmpty()
  token!: string;
}