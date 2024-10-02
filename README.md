This is a new [**React Native**](https://reactnative.dev) project for React Native E-commerce Product Configurator Exercise, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Project Setup

## Step 1: Installation and Setup
Clone the repository from GitHub using

```bash
git clone git@github.com:devbabs/react-native-product-configurator-excercise.git
```

## Step 2: Navigate to the project folder and install dependencies

```bash
# Navigate to project folder
cd react-native-product-configurator-excercise
# Using npm
npm i
# Install all Pod dependencies for iOS
cd ios && pod install && cd ..
```

### Extra Setup Steps (Android)
Ensure you have a _android/local.properties_ file with the following content:
```bash
# sdk.dir must contain the absolute path to your local sdk for android
sdk.dir=/Users/$(whoami)/Library/Android/sdk
```

## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```

## Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```

If everything is set up _correctly_, you should see the app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

## Assesment Challenges
Due to the short time constraint for the assessment, a few of the technical requirements were not completed:
- Implementaton of the `useConfigValidator` custom hook
- Writing of unit tests for critical components and state management logic
- Showing recommended configuration based on selected `baseModel`

## Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

#### Built with ❤️ by [Babs](https://github.com/devbabs) 🥂