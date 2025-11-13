const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({ error: 'Validation Error', messages });
  }

  // Handle 'Todo not found' custom error
  if (err.message === 'TodoNotFound') {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Default server error
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;