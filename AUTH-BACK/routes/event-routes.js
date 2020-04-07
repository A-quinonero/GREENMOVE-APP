const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Event = require("../models/Event");



router.get("/events", (req, res, next) => {
  Event.find()
    .then(allTheEvents => {
      res.json(allTheEvents);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/events/create', (req, res, next) => {
  console.log(req.body, 'test')
  Event.create(req.body)
  .then( aNewThing => {
      res.status(200).json(aNewThing);
  })
  .catch( err => next(err) )
})


router.get('/events/:id', (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    Event.findById(req.params.id) 
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.json(err);
      })
  })
  
  
  router.put('/events/:id', (req, res, next)=>{
  
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Event.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({ message: `events with ${req.params.id} is updated successfully.` });
      })
      .catch(err => {
        res.json(err);
      })
  })
  
  router.delete('/events/:id', (req, res, next)=>{
  
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Event.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: `events with ${req.params.id} is removed successfully.` });
      })
      .catch( err => {
        res.json(err);
      })
  })

module.exports = router;
