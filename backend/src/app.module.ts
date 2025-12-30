import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { FirebaseService } from './config/firebase.config';

@Module({
  imports: [EmployeesModule],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
