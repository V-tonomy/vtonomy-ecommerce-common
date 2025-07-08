import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PagingRequestDTO {
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @Min(1)
    limit: number = 10;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @Min(1)
    page: number = 1;
}

export class PagingResponseDTO<T> {
    data: T[];
    total: number;

    constructor(data: T[], total: number) {
        this.data = data;
        this.total = total;
    }
}

export class ResponseDTO<T> {
    success: boolean;
    data: T;

    constructor(data: T) {
        this.success = true;
        this.data = data;
    }
}

export class MessageResponseDTO {
    success: boolean;
    message: string;

    constructor(message: string) {
        this.success = true;
        this.message = message;
    }
}
