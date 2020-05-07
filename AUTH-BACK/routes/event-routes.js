const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isLoggedIn = require("../helpers/middlewares");
const Event = require("../models/Event");
const User = require("../models/user");

router.get("/events", (req, res, next) => {
  Event.find()
    .then((allTheEvents) => {
      res.json(allTheEvents);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/events/create", async (req, res, next) => {
  const userId = req.session.currentUser._id;
  console.log(userId, "test");
  try {
    const newEvent = await Event.create(req.body);
    res.status(200).json(newEvent);

    await User.findByIdAndUpdate(userId, {
      $push: { myAccions: newEvent._id },
    });
  } catch (err) {
    console.log(err);
  }
});
//JOIN
router.post("/events", async (req, res, next) => {
  //  console.log(req.body, "object")
  console.log("responseeeeee currentUser", req.session.currentUser);
  const eventId = req.body.eventId; //evento id
  const userId = req.body.userId;
  console.log(userId);
  try {
    await Event.updateOne({ _id: eventId }, { $push: { members: userId } });

    await User.updateOne({ _id: userId }, { $push: { joinAccions: eventId } });
    res.status(200).json("joined to joinAccions");
  } catch (err) {
    console.log(err);
  }
});
router.post("/events/remove-member", async (req, res, next) => {
  //console.log('responseeeeee currentUser', req.session.currentUser)
  const eventId = req.body.eventId; //evento id
  const userId = req.body.userId;
  console.log(userId);
  try {
    await Event.updateOne({ _id: eventId }, { $pull: { members: userId } });

    await User.updateOne({ _id: userId }, { $pull: { joinAccions: eventId } });
    res.status(200).json("deleted from joinAccions");
  } catch (err) {
    console.log(err);
  }
});
router.put("/events/message", async (req, res, next) => {
  const message = req.body.notifications;
  const members = req.body.members;
  const eventId = req.body.eventId;
  const creatorId = req.body.creator;
  const notificationsId = { message, eventId, creatorId };

  //   console.log(message)
  // console.log(members, "holaaaa");
  console.log(notificationsId, "el Member");
  try {
    await members.map(async (member) => {
      const oneMember = member._id;
      console.log(message);
      await User.findByIdAndUpdate(oneMember, {
        $push: { notifications: notificationsId },
      });
    });
    res.status(200).json("sended to members");
  } catch (err) {
    console.log(err);
  }
});
router.get("/events/message", async (req, res, next) => {
  try {
    let userId = req.session.currentUser._id;
    eventInfo = await User.findById(userId)
      .populate("notifications.eventId")
      .populate("notifications.creatorId");
    console.log(eventInfo);
    res.json(eventInfo);
  } catch (err) {
    res.json(err);
  }
});

router.post("/delete-event", async (req, res, next) => {
  const userId = req.body.userId;
  const eventId = req.body.eventId;
  console.log(req.body, "user");
  await User.findByIdAndUpdate(userId, {
    $pull: { myAccions: eventId },
  });
});

router.post("/delete-notification", async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const notiId = req.body.notiId;
    console.log(notiId, "NOTIFICATIONS");

    return User.findByIdAndUpdate(userId, {
      $pull: {
        notifications: {_id: notiId}
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/events/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Event.findById(req.params.id)
    .populate("creator")
    .populate("members")

    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/events/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `events with ${req.params.id} is updated successfully.`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/events/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `events with ${req.params.id} is removed successfully.`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});



module.exports = router;
