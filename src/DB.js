const mongoose = require('mongoose');
const dbPass = process.env.DB_PASSWORD;

module.exports = {
  async connectDB() {
    try {
      await mongoose.connect(`mongodb+srv://Zhenya:${dbPass}@ecodev.hmydf.mongodb.net/Za?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await console.log('DataBase connected');
    } catch (e) {
      console.log('e', e);
    }
  },
};
