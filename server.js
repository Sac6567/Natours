const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = require('./z').z;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successfu!!');
  });

// console.log(process.env);

// Testing data entry
// const testTour = new Tour({
//   name: 'The Hiking',
//   rating: 4.7,
//   price: 497,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error 💥', err);
//   });

const port = /*process.env.PORT ||*/ 3000;
app.listen(() => {
  console.log(`App running on port: ${port}...`);
});

// alt + shift + F
//  npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev
