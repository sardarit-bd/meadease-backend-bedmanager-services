import { createClient } from 'redis';

export const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

export const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log("Redis is connected!")
    }
}

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar
