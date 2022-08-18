const express = require('express');
const userControllers = require('./../controllers/userControllers')

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

const router = express.Router();

router
    .route('/')
    .get(userControllers.getAllUsers)
    .post(userControllers.createUser);

router
    .route('/:id')
    .get(userControllers.getUser)
    .patch(userControllers.updateUser)
    .delete(userControllers.deleteUser);

module.exports = router;