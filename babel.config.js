module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Include reanimated plugin
    ['module:react-native-dotenv', {
      moduleName: '@env', // Alias to import environment variables
      path: '.env',       // Path to your .env file
    }],
  ],
};
