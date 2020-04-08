import { AppServer } from '../src/app/app';

const appServer = new AppServer();

export default function () {
  return appServer.listen();
}
