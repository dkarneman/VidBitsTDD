const router = require('express').Router();

const Video = require('../models/video');

router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

router.get('/videos/create', (req, res, next) => {
  res.render('videos/create');
});

router.post('/videos/create', async (req, res, next) => {
  const {title, description, url} = req.body;
  const newVideo = new Video({title, description, url});
  newVideo.validateSync();
  if (newVideo.errors) {
    res.status(400).render('videos/create', {newVideo: newVideo});
  } else {
    await newVideo.save();
    res.redirect(`/videos/${newVideo._id}`);
    // res.redirect('/');
  }

});

router.get('/videos/:videoId', async (req, res, next) => {
  const video = await Video.findById(req.params.videoId);
  res.render('videos/show', {video});
});

// router.post('/videos/:videoId/delete', async (req, res, next) => {
//   const video = await Video.findById(req.params.videoId);
//   await video.remove()
//   res.redirect('/');
// });

// router.get('/videos/:videoId/update', async (req, res, next) => {
//   const video = await Video.findById(req.params.videoId);
//   res.render('update',{video: video});
// });

// router.post('/videos/:videoId/update', async (req, res, next) => {
//   const thisItem = await Video.findById(req.params.videoId);
//   await Video.update({_id: req.params.videoId}, //id to update
//       req.body, //new values
//       {runValidators: true}, //options
//       function(err){ //callback
//         if (err) {
//           return res.status(400).render(`update`, {errors: err.errors, video: thisItem});
//         } else {
//           return res.redirect(`/videos/${req.params.videoId}`)
//         }
//   });
// });

module.exports = router;