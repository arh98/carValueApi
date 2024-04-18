import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { ReportsService } from './reports.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private readonly service: ReportsService) {}

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.service.createEstimate(query);
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.service.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    async changeApproval(
        @Param('id') id: string,
        @Body() body: ApproveReportDto,
    ) {
        return this.service.changeApproval(id, body.approved);
    }

    @Get('/all')
    @UseGuards(AdminGuard)
    getReports(@Query() query?: PaginationQueryDto) {
        return this.service.find(query);
    }

    @Get('/:id')
    @UseGuards(AdminGuard)
    getReport(@Param('id') id: string) {
        return this.service.findOne(+id);
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteReport(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
