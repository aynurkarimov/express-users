const isValidId = (id) => id && !isNaN(Number(id));
const isValidBody = (body) => body && Object.keys(body).length;

module.exports = {
  isValidId,
  isValidBody
}