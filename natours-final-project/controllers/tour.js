const fs = require("fs");

const tours = JSON.parse(fs.readFileSync("dev-data/data/tours-simple.json"));

module.exports.checkId = (req, res, next, val) => {
  if (+val > tours.length || +val < 0) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID!',
    });
  }
  next();
}

module.exports.checkBody = (req, res, next) => {
  if(req.body.name.length < 1 || req.body.price === undefined) {
    return res.status(400).json({
      status: 'failure',
      message: 'You have name or price missing!',
    })
  }

  next();
}

module.exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

module.exports.getTour = (req, res) => {
  const id = +req.params.id;

    return res.status(200).json({
      status: 'success',
      data: {
        tour: tours[id],
      },
    });
};

module.exports.createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id }, req.body);
  tours.push(newTour);
  const toursToAdd = JSON.stringify(tours);

  fs.writeFile('./dev-data/data/tours-simple.json', toursToAdd, (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

module.exports.modifyTour = (req, res) => {
  const id = +req.params.id;

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour...>',
    },
  });
};

module.exports.deleteTour = (req, res) => {
  const id = +req.params.id; 

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
