import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';
import { Injectable, createParamDecorator } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private readonly repo: Repository<Report>,
    ) {}

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }
    
    find() {}

    findOne() {}

    update() {}

    remove() {}
}
