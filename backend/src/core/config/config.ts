import dotenv from 'dotenv';

dotenv.config({});

export class Config {
  public NODE_ENV: string | undefined;
  public SERVER_PORT: string | undefined;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SERVER_PORT = process.env.SERVER_PORT || '';
  }
}

const config: Config = new Config();

export default config;
