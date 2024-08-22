import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

const server: FastifyInstance = Fastify({ logger: true });

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
};

server.get('/ping', opts, async (request, reply) => {
  reply.code(200);
  return { pong: 'it worked!' };
});

const start = async () => {
  try {
    await server.listen({ port: Number(env.SERVER_PORT) || 5000 });

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;

  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

console.log('test');

start();