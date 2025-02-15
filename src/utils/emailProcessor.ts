import { emailNotification } from './email-template';
import { myQueue } from './emailQueue';





myQueue.process('sendEmail', async (job) => {
  const { email, message, subject } = job.data;
  
  
  emailNotification(email, message, subject);
  console.log(`Processing job: ${job.id}, Data: ${JSON.stringify(job.data)}`);
});


myQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed!`);
});

myQueue.on('failed', (job, err) => {
  console.log(`Job ${job?.id} failed with error: ${err.message}`);
});

console.log('Email processor is running...');
