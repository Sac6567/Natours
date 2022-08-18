const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1)  MIDDLEWARE
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

/*
app.use((req,res,next) => {
    //console.log('Hello from middleware !!');
    next();
});*/

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// app.get('/', (req,res) => {
//     res
//     .status(200)
//     .json({ message: 'Hello from Server !!', app: 'Natours'});
// });

// app.post('/', (req,res) => {
//     res.send('It is a post...');
// });

/*
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
    );
*/

// 2)  ROUTE HANDLERS

// const getAllTours = (req,res) =>{
//     console.log(req.requestTime);
//     res.status(200).json({
//         status:'success',
//         requestedAt: req.requestTime,
//         results: tours.length,
//         data: {
//             tours: tours
//         }
//     });
// };

// const getTour = (req,res) =>{
//     console.log(req.params);

//     const id = req.params.id * 1;
//     const tour = tours.find(el =>el.id === id)

//     // if(id > tours.length) {
//     if(!tour) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'invalid ID'  
//         });
//     }
    

//     res.status(200).json({
//         status:'success',
//         data: {
//             tour
//         }
//     });
// };

// const createTour = (req, res) => {
//     // console.log(req.body);

//     const newId = tours[tours.length-1].id+1;
//     const newTour = Object.assign({id: newId}, req.body);

//     tours.push(newTour);

//     fs.writeFile(
//         `${__dirname}/dev-data/data/tours-simple.json`, 
//         JSON.stringify(tours), 
//         err =>{
//         res.status(201).json({
//             status: 'success',
//             data : {
//                 tour: newTour
//             }
//         });
//     });

//     // res.send('Done');
// };

// const updateTour = (req, res) => {

//     const id = req.params.id * 1;
//     if(id > tours.length)  {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'invalid ID'  
//         });
//     }

//     res.status(201).json({
//         status: 'success',
//         data: {
//             tour: '<Updated tour here...>'
//         }
//     });
// };

// const deleteTour = (req, res) => {

//     const id = req.params.id * 1;
//     if(id > tours.length)  {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'invalid ID'  
//         });
//     }

//     res.status(204).json({
//         status: 'success',
//         data: null
//     });
// };

// const getAllUsers = (req,res) =>{
//     res.status(500).json({
//         status: 'error',
//         message: 'Route not yet defined'
//     });
// };

// const createUser = (req,res) =>{
//     res.status(500).json({
//         status: 'error',
//         message: 'Route not yet defined'
//     });
// };

// const getUser = (req,res) =>{
//     res.status(500).json({
//         status: 'error',
//         message: 'Route not yet defined'
//     });
// };

// const updateUser = (req,res) =>{
//     res.status(500).json({
//         status: 'error',
//         message: 'Route not yet defined'
//     });
// };

// const deleteUser = (req,res) =>{
//     res.status(500).json({
//         status: 'error',
//         message: 'Route not yet defined'
//     });
// };

/*
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
*/

// 3)  ROUTES

// const tourRouter = express.Router();
// const userRouter = express.Router();

// tourRouter
//     .route('/')
//     .get(getAllTours)
//     .post(createTour);

// tourRouter
//     .route('/:id')
//     .get(getTour)
//     .patch(updateTour)
//     .delete(deleteTour);

// userRouter
//     .route('/')
//     .get(getAllUsers)
//     .post(createUser);

// userRouter
//     .route('/:id')
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4)  START SERVER

// const port = 3000;
// app.listen(port, () => {
//     console.log(`App running on port: ${port}...`);
// });

module.exports = app;