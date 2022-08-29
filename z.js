const PASSWORD = 1234;
const DATABASE = `mongodb+srv://root:${PASSWORD}@cluster0.cgyf6ab.mongodb.net/?retryWrites=true&w=majority`;
// console.log(DATABASE);

module.exports = {
  z: DATABASE,
};
