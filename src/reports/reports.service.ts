import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private readonly repo: Repository<Report>,
    ) {}

    createEstimate({ made, model, lng, lat, year, mileage }: GetEstimateDto) {
        return this.repo
            .createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('made = :made', { made })
            .andWhere('model = :model', { model })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
            .andWhere('year - :year BETWEEN -3 AND 3', { year })
            .andWhere('approved IS TRUE')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage })
            .limit(3)
            .getRawOne();
    }

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.findAndCheckExists(+id);
        report.approved = approved;
        return this.repo.save(report);
    }

    find({ limit, offset }: PaginationQueryDto) {
        return this.repo.find({
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: number) {
        if (!id) {
            return null;
        }
        const report = await this.findAndCheckExists(id, true);
        return report;
    }

    async remove(id: number) {
        const report = await this.findAndCheckExists(id);
        return this.repo.remove(report);
    }

    async findAndCheckExists(id: number, populate: boolean = false) {
        let report = null;
        if (populate) {
            report = await this.repo.findOne({
                where: { id },
                relations: ['user'],
            });
        } else {
            report = await this.repo.findOneBy({ id });
            if (!report) {
                throw new NotFoundException(`Report #${id} not found`);
            }
        }
        return report;
    }
}
