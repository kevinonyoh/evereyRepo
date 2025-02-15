import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { publicationType, researchCategory, statusPublish } from "../interfaces/model.interface";

export class CreateDraftArticle{

    @IsString()
    @IsNotEmpty()
    title!: string;
    
    @IsString()
    @IsNotEmpty()
    abstract!: string;

    @IsString()
    @IsNotEmpty()
    publicationName!: string;

    @IsString()
    @IsNotEmpty()
    doiNumber!: string;

    @IsString()
    @IsNotEmpty()
    author!: string;

    @IsEnum(researchCategory)
    @IsNotEmpty()
    category!: researchCategory;

    @IsString()
    @IsNotEmpty()
    subCategory!: string;

    @IsEnum(publicationType)
    @IsNotEmpty()
    publicationType!: publicationType;
    
}


export class UpdateDraftArticle{
    @IsString()
    @IsOptional()
    title?: string;
    
    @IsString()
    @IsOptional()
    abstract?: string;

    @IsString()
    @IsOptional()
    publicationName?: string;

    @IsString()
    @IsOptional()
    doiNumber?: string;

    @IsString()
    @IsOptional()
    author?: string;
}


export class ArticleByStatus {

    @IsEnum(statusPublish)
    @IsNotEmpty()
    status!: statusPublish;
    
}

export class ArticleByDate {
    @IsString()
    @IsOptional()
    filter?: string;

    @IsString()
    @IsOptional()
    year?: string;

    @IsString()
    @IsOptional()
    startYear?: string;

    @IsString()
    @IsOptional()
    endYear?: string;

    @IsString()
    @IsOptional()
    quarter?: string;

    @IsString()
    @IsOptional()
    startDate?: string;

    @IsString()
    @IsOptional()
    endDate?: string;

    @IsString()
    @IsOptional()
    decadeStartYear?: string;
}

export class ArticleByPublicationType{
    
    @IsEnum(publicationType)
    @IsNotEmpty()
    publicationType!: publicationType;

}