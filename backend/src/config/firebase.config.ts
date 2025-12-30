import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    if (!admin.apps.length) {
      // NOTE: This assumes you have the GOOGLE_APPLICATION_CREDENTIALS environment variable set.
      // If you are testing locally without env vars, you might need to point to a key file here.
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
      console.log('?? Firebase Admin Initialized');
    }
  }
}
