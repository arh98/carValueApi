import { IsBoolean } from '@nestjs/class-validator';

export class ApproveReportDto {
    @IsBoolean()
    approved: boolean;
}
