async function booksRoute(fastify, options) {

  fastify.get('/', async (request, reply) => {
    const books = await fastify.prisma.book.findMany();
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
    const { id } = request.params;
    const book = await fastify.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      reply.code(404).send({ error: 'Book not found' });
      return;
    }
    return book;
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
    const { title, author } = request.body;

    const newBook = await fastify.prisma.book.create({
      data: { title, author },
    });

    reply.code(201).send(newBook);
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
    //  ⚙️🔥 write your code here ⚙️🔥
    reply.code(404).send({ error: 'Not implemented' });
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
    //  ⚙️🔥 write your code here ⚙️🔥
    reply.code(404).send({ error: 'Not implemented' });
  });
}

export default booksRoute;