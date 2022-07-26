const express = require('express');
const router = express.Router();

// Connecting to the database
var Datastore = require('nedb');
var students = new Datastore ( {filename: 'database/students.db', autoload: true});

// GET all students data from the database
// Endpoint: /api/v1/students/

router.get('/', async(req, res)=>{

    try {
        await students.find({}).exec(function(err, data){
            if (err){
                return res.status(500).json({
                    message: "Error" + err
                })
            }
            res.send(data)
        })
    }
    catch(error){
        res.status(500).json({message: "Error in this function" + error})
    }
})

// POST student data to the database
// Endpoint: /api/v1/students;

router.post('/',async(req, res)=>{

    try {
        await students.insert(req.body, (err, addedData)=>{
            if (err){
                return res.status(500).json({
                    message: "Error" + err
                })
        }
        console.log('inserted record', addedData);
        return res.json({
            message: "Student added succesfully",
            studentId: addedData._id
        })
    })        
    }
    catch(error){
        res.status(500).json({message: "Error in this function" + error})
    }
}) 

// DELETE one student from database
// Endpoint: /api/v1/students/studentId

router.delete ('/:id', async(req,res)=>{

    try {
        await students.remove( {_id: req.params.id},(err, deletedData)=>{
            if (err){
                return res.status(500).json({
                    message: "Error" + err
                })
        }
        //console.log(deletedData) for getting 0,1 status code for del or not del
        if(deletedData){
        
            return res.json( {
                message: "Student removed succesfully"
            })
        }
        res.status(404).json({
            message: "Student with this Id does not exist"
        })
        })
    }
    catch(error){
        res.status(500).json({message: "Error in this function" + error})
    }
}) 

module.exports = router;