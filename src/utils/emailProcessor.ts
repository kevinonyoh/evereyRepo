import { Worker } from 'bullmq';
import { emailNotification } from './email-template';

const worker = new Worker(
  'myQueue',
  async (job) => {
    
    const {email, message, subject} = job.data;

    emailNotification(email, message,  subject)

    console.log(`Processing job: ${job.id}, Data:`);

  },
  {
    connection: {
      host: 'localhost',
      port: 6379,
    },
  }
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job?.id} failed with error: ${err.message}`);
});
