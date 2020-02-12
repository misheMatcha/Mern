const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../../models/Event');
const passport = require('passport');
const validateEventInput = require('../../validation/event');

router.get("/test", (req, res) => res.json({ msg: "This is the events route" }));

router.get("/", (req, res) => {
  Event.findById(req.body)
    .then(events => res.json(events))
    .catch(err => res.status(404).json({ noeventsfound: "No events found" }))
});

router.post("/create",
passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newEvent = new Event({
      title: req.body.title,
      desc: req.body.desc,
      location: req.body.location,
      group_id: req.body.group_id,
      event_date: req.body.event_date,
      start_time: req.body.start_time,
      end_time: req.body.end_time
    });

    newEvent.save().then(event => res.json(event));
  });

module.exports = router;