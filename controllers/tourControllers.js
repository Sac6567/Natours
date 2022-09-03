// const fs = require('fs');
const Tour = require('../models/tourModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,-difficulty';
  next();
};

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // adv filter
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(10);

    return this;
  }
}

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
    // // console.log(req.query, queryObj);
    // /*build query */
    // //filtering
    // /*
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // // adv filter
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // Regular expression

    // //{ difficulty: 'easy', duration: { $gte: 5 } }
    // //{ difficulty: 'easy', duration: { gte: '5' } }
    // // gte, gt, lte, lt

    // let query = Tour.find(JSON.parse(queryStr));
    // */

    // /*Sorting*/
    // // if (req.query.sort) {
    // //   const sortBy = req.query.sort.split(',').join(' ');
    // //   query = query.sort(sortBy);
    // //   // sort('price ratingsAverage')
    // // } else {
    // //   query = query.sort('-createdAt');
    // // }

    // /*Field limiting */
    // // if (req.query.fields) {
    // //   const fields = req.query.fields.split(',').join(' ');
    // //   query = query.select(fields);
    // // } else {
    // //   query = query.select('-__v');
    // // }

    // /*pagination*/
    // // const page = req.query.page * 1 || 1;
    // // const limit = req.query.limit * 1 || 100;
    // // const skip = (page - 1) * limit;
    // // query = query.skip(skip).limit(10);

    // // if (req.query.page) {
    // //   const numTours = await Tour.countDocuments();
    // //   if (skip >= numTours) throw new Error('This page doesnot exhist');
    // // }

    /*Execute query */
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // const query = await Tour.find()
    //   .wher('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    /*send response */
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

exports.getTourStatus = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRating: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
