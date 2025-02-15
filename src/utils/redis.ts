import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
});

// const redis = new Redis();


const redisSet = async ( email: string, token: string ) => {
    try{
        await redis.set( token, email);
    } catch (err: any) {
        throw new Error(err);
    }
}

const redisValidate = async (token: string ) => {
    try {
        const val = await redis.get(token)
        if(!!val){
            await redis.del( token );
            return val;
        }
        return false;
    } catch (err: any) {
        throw new Error(err);
    }
}


export { redisSet, redisValidate, redis };