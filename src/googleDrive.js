// src/google-drive.js
import { GoogleAuth, drive_v3 } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const CLIENT_ID = '188124134082-mrlo7diuq7jveikp32ietkpp3avm7818.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000'; // Update with your redirect URI

const auth = new GoogleAuth({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
  scopes: SCOPES,
});

const drive = drive_v3.drive({ version: 'v3', auth });

export { drive, auth };
