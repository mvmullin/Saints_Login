const models = require('../models');

const Display = models.Display;

const displayPage = (req, res) => {
  Display.DisplayModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), displays: docs });
  });
};

const updateScore = (req, res) => {
  Display.DisplayModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err || !docs) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    var newScore = parseInt(req.body.score);
    if(newScore > docs[0].score)
    {
      docs[0].score = parseInt(req.body.score);
    
      return docs[0].save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occurred' });
      }
      });
    }
    return res.json({ redirect: '/display' });
  });
};

const gamePage = (req, res) => {
  res.render('game', { csrfToken: req.csrfToken() });
};

const aboutPage = (req, res) => {
  res.render('about2', { csrfToken: req.csrfToken() });
};

const editDisplay= (req, res) => {
  Display.DisplayModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err || !docs || !req.body.name) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    else if(!docs[0])
    {
      const displayData = {
        name: req.body.name,
        message: req.body.message,
        color: req.body.color,
        owner: req.session.account._id,
      };

      const newDisplay = new Display.DisplayModel(displayData);

      return newDisplay.save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occurred' });
      }

      return res.json({ redirect: '/display' });
      });
    }
    
    else{
      docs[0].name = req.body.name;
      docs[0].message = req.body.message;
      docs[0].color = req.body.color;
      docs[0].owner = req.session.account._id;
    
      return docs[0].save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occurred' });
      }

      return res.json({ redirect: '/display' });
      });
    }
  });
};

module.exports.displayPage = displayPage;
module.exports.aboutPage = aboutPage;
module.exports.gamePage = gamePage;
module.exports.edit = editDisplay;
module.exports.updateScore = updateScore;