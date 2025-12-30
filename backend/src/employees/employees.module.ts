import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { FirebaseService } from '../config/firebase.config';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, FirebaseService],
})
export class EmployeesModule {}
