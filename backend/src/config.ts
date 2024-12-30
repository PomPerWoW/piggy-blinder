import dotenv from 'dotenv';

dotenv.config({});

export class Config {
  public SERVER_PORT: string | undefined;

  constructor() {
    this.SERVER_PORT = process.env.SERVER_PORT || '';
  }
}

const config = new Config();

export default config;
