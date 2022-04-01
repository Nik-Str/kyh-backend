module.exports = async function getBody(req) {
  const buffers = await getBuffers();

  try {
    return JSON.parse(Buffer.concat(buffers));
  } catch (error) {
    console.log(error);
    return null;
  }

  async function getBuffers() {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    return buffers;
  }
};
