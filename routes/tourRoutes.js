const express = require('express');
// const {
//   getAllTours,
//   createTour,
//   getTour,
//   updateTour,
//   deleteTour /*,checkID, checkBody*/,
//   aliasTopTours,
//   getTourStatus,
//   getMonthlyPlan,
// } = require('../controllers/tourControllers');
const tc = require('../controllers/tourControllers');

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
//     );

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

const router = express.Router();

// router.param('id', tc.checkID);

router.route('/top-5-cheap').get(tc.aliasTopTours, tc.getAllTours);

router.route('/tour-stats').get(tc.getTourStatus);

router.route('/monthly-plan/:year').get(tc.getMonthlyPlan);

router.route('/').get(tc.getAllTours).post(tc.createTour);

router.route('/:id').get(tc.getTour).patch(tc.updateTour).delete(tc.deleteTour);

module.exports = router;
