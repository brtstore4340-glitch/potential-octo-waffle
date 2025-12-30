import { Body, Controller, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('sync')
  async syncEmployees(@Body() body: { employees: any[]; mode: 'upsert' | 'insert_only' }) {
    console.log('Received sync request for', body.employees.length, 'employees');
    return this.employeesService.syncEmployees(body.employees, body.mode);
  }
}
