// controllers/dataController.js

const getData = (req, res) => {
    console.log(req.method);
    console.log('Hello How Are You');
    res.send('Hello How Are You');
  };
  
  module.exports = { getData };
  