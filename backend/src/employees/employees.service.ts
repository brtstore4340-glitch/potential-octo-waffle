import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class EmployeesService {
  // REMOVED THE LINE THAT WAS CAUSING THE ERROR
  // No 'private db' here!

  async syncEmployees(employees: any[], mode: 'upsert' | 'insert_only') {
    // We connect to Firestore HERE, inside the function
    const db = admin.firestore();

    const batchArray: Promise<any>[] = [];
    let batch = db.batch();
    let operationCount = 0;
    const BATCH_LIMIT = 450; 

    for (const emp of employees) {
      const empRef = db.collection('employees').doc(emp.employeeId || emp.email);
      
      const docData = {
        ...emp,
        updatedAt: new Date(),
      };

      batch.set(empRef, docData, { merge: true });

      operationCount++;

      if (operationCount >= BATCH_LIMIT) {
        batchArray.push(batch.commit());
        batch = db.batch();
        operationCount = 0;
      }
    }

    if (operationCount > 0) {
      batchArray.push(batch.commit());
    }

    await Promise.all(batchArray);
    return { success: true, count: employees.length };
  }
}
