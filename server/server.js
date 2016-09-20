import app from './config/express';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import config from './config/env';

// promisify mongoose
Promise.promisifyAll(mongoose);
// mongoose.Promise = Promise;
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1} } });
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${config.db}`);
});

// starting the server
if(!module.parent) {
  app.listen(config.port, () => {
    console.log(`Server starting on port ${config.port} (${config.env})`);
  });
}

export default app;
