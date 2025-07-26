import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
const PORT = config.port || 3000;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log('DB Connected Successfully..!!');

    app.listen(PORT, () => {
      console.log(
        `OAuth2 Server Is Listening On Port: http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error('Failed To Connect With DB..!!', error);
  }
}

main();
