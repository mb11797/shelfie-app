import 'react-native-url-polyfill/auto';
import { Client, Account, Databases } from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint('https://syd.cloud.appwrite.io/v1')
  .setProject('6adf17c800002946f400')
  .setPlatform('hustler.manas.shelfie'); // must match the platform you registered

export const account = new Account(client);
export const databases = new Databases(client);