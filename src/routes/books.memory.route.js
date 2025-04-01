
const books = [];

async function booksMemoryRoute(fastify, options) {

  fastify.get('/', async (request, reply) => {
    return books;
    
  });

  const getBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };

  fastify.get('/:id', { schema: getBookSchema }, async (request, reply) => {
    var { id } = request.params;
    if (isNaN(id) || id < 0 ||books.length<=id) {
      reply.code(400);
      console.log(id)
      return { error: "book doesn't exist" };
    };
    reply.code(200).send(books[id]);
  });

  const createBookSchema = {
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.post('/', { schema: createBookSchema }, async (request, reply) => {
    books.push(request.body)
    reply.code(200).send(request.body);
  });

  const updateBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.put('/:id', { schema: updateBookSchema }, async (request, reply) => {
    var { id } = request.params;
    if (isNaN(id) || id < 0 ||books.length<=id) {
      reply.code(400);
      console.log(id)
      return { error: "book doesn't exist" };
    };
    books[id] = request.body
    reply.code(200).send( books[id] );
  });

  const deleteBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };
  fastify.delete('/:id', { schema: deleteBookSchema }, async (request, reply) => {
    var { id } = request.params;
    if (isNaN(id) || id < 0 ||books.length<=id) {
      reply.code(400);
      console.log(id)
      return { error: "book doesn't exist" };
    };
    books.splice(id,1)
    reply.code(200).send('Exterminated');
  });
}

export default booksMemoryRoute;