import { Account, Client, Databases } from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // Your API Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!) // Your project ID
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!); // Your app platform

export const account = new Account(client);
export const database = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID;
export const HABITS_COLLECTION_ID = process.env.EXPO_PUBLIC_HABITS_COLLECTION;
export const COMPLETIONS_COLLECTION_ID=process.env.EXPO_PUBLIC_COMPLETIONS_COLLECTION_ID;

export interface RealTimeResponse {
  events: string[];
  payload: any;
}