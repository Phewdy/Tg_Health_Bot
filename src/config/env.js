import {config} from 'dotenv';
import process from 'node:process';

config({path: `.env.${process.env.BOT_KEY}.local`})
export const {BOT_KEY} = process.env;