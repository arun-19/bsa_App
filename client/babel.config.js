module.exports = {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin','transform-remove-console'].filter(Boolean),
  };