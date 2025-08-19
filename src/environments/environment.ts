export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'MediQ Healthcare Management System',
  version: '1.0.0',
  encryptionKey: 'your-development-encryption-key',
  tokenExpiry: 3600, // 1 hour in seconds
  refreshTokenExpiry: 86400, // 24 hours in seconds
  enableLogging: true,
  enableServiceWorker: false,
  openaiApiKey: 'your-openai-api-key',
  speechRecognitionLang: 'en-US',
  aiFeatures: {
    symptomChecker: true,
    voiceNotes: true,
    smartScheduling: true
  }
};

