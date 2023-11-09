const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const port = 3000;
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id;

  if (id > tours.length || id < 0) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID!',
    });
  } else {
    return res.status(200).json({
      status: 'success',
      data: {
        tour: tours[id],
      },
    });
  }
};

const createTour = (req, res) => {
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

const modifyTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length || id < 0) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID!',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour...>',
    },
  });
};

const deleteTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length || id < 0) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID!',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not yet implemented!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not yet implemented!',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not yet implemented!',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not yet implemented!',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'Not yet implemented!',
  });
};

const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id?').get(getTour).patch(modifyTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);


app.listen(port, () => {
  console.log('Go go go');
});
