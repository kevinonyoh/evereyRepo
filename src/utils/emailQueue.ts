import Queue from 'bull';


export const myQueue = new Queue('myQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  },
});


export const addJob = async (email: string, message: string, subject: string) => {
  await myQueue.add(
    'sendEmail', 
    { email, message, subject },
    { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
  );
  console.log('Job added!');
};
