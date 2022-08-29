// const fs = require('fs');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
//     );

// exports.checkID = (req, res, next, val) => {
//   //   console.log(`Tour id is ${val}`);
//   //   if (req.params.id * 1 > tours.length) {
//   //     return res.status(404).json({
//   //       status: 'fail',
//   //       message: 'invalid ID',
//   //     });
//   //   }
//   //   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    //   console.log(req.requestTime);

    res.status(200).json({
      status: 'success',
      // requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.fondOne({_id:req.params.id})

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  //   console.log(req.params);
  //   const id = req.params.id * 1;
  //   const tour = tours.find((el) => el.id === id);
  // if(id > tours.length) {
  /*if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'  
        });
    }*/
  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       tour,
  //     },
  //   });
};

exports.createTour = async (req, res) => {
  /*
  // console.log(req.body);
  //   const newId = tours[tours.length - 1].id + 1;
  //   const newTour = Object.assign({ id: newId }, req.body);
  //   tours.push(newTour);
  //   fs.writeFile(
  //     `${__dirname}/dev-data/data/tours-simple.json`,
  //     JSON.stringify(tours),
  //     (err) => {
  //       res.status(201).json({
  //         status: 'success',
  //         data: {
  //           tour: newTour,
  //         },
  //       });
  //     }
  //   );
  */

  try {
    // const newTour = newTour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  //   const id = req.params.id * 1;
  // if(id > tours.length)  {
  //     return res.status(404).json({
  //         status: 'fail',
  //         message: 'invalid ID'
  //     });
  // }
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.params.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  // const id = req.params.id * 1;
  // if(id > tours.length)  {
  //     return res.status(404).json({
  //         status: 'fail',
  //         message: 'invalid ID'
  //     });
  // }
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};