import devConfig from './dev.config';
import testConfig from './test.config';
import prodConfig from './prod.config';
import { NODE_ENV } from './variate';
import { normal } from '@lib/logger';
const logger = normal();

class GlobalConfig {
  config = {
    db: devConfig.db,
    isDev: NODE_ENV === 'development' || NODE_ENV === 'testing'
  };

  constructor() {
    this.getConfig();
  }

  getConfig() {
    switch (NODE_ENV) {
      case 'development': this.config = Object.assign(this.config, devConfig);
        break;
      case 'testing': this.config = Object.assign(this.config, testConfig);
        break;
      case 'production': this.config = Object.assign(this.config, prodConfig);
        break;
      default: this.config = Object.assign(this.config, devConfig);
    }
    return this.config;
  }
}

const globalConfig = new GlobalConfig();
if (!globalConfig.config.db.password) {
  logger.error('process.env.DB_PASSWORD is undefined. please see src/app/config/variate.ts.');
  throw new Error('process.env.DB_PASSWORD is undefined. please see src/app/config/variate.ts.');
}
// logger.info(globalConfig.config);

const GLOBAL_CONFIG = globalConfig.config;
export default GLOBAL_CONFIG;
