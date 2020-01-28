const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
  console.log('Database is connected.')
}).catch(() => {
  console.log('Error connecting to the database.')
});
