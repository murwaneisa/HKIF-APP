module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "react" }],
      "nativewind/babel",
    ],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': '.',
            '@screens': './Screens',
            '@components': './Components',
            '@utils': './Utilities',
            '@assets': './Assets',
          },
        },
      ],
    ],
  }
}
