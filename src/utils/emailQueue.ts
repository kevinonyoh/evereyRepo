import { Queue } from 'bullmq';

const myQueue = new Queue('myQueue', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

 export const addJob = async (email: string, message: string, subject: string) => {
  await myQueue.add('sendEmail', 
  { email, message, subject },
  { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
  );
  console.log('Job added!');
}



