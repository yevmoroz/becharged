## BeCharged

Imagine the world where EV chargin is done seamlessly

## How to use

The app is published to Expo and can be used via Expo Go app. You may need to have Expo Go installed on [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/ca/app/expo-go/id982107779). When it's done, go ahead and scan with the phone QR code to run the app through Expo Go or :

![](https://qr.expo.dev/eas-update?appScheme=exp&projectId=a60c64b6-a70c-4666-9a7c-19b64e7aa208&channel=master&runtimeVersion=1.0.0&host=u.expo.dev)

### Development

Install dependencies with `npm install`. Start developement by running regular `npm start`. Follow on screen prompt to setup expo on iOS/Android device.

### Considerations

Following are consideraitons that can be made for an app that helps with EV charging. What is currently unmarked will be implemented as iteration

- [x] get list of charging stations from https://openchargemap.org/ API
- [x] show surrounding charging stations
  - [x] based on device location
  - [x] as a list
  - [ ] based on given location (via mapbox.places API call)
  - [x] on a map (via gmaps)
- [x] call maps app to get directions
- [x] start charging for select station
- [x] refresh list of charging stations on pull-down
- [x] user-friendly API handling
- [ ] consider key storage for list of charging stations if list gets too big
- [ ] more unit testing for utils and components
- [ ] consider react-navigation to better structure moving around
- [x] work on unnecessary re-renders of map component
- [x] consider memoization of expensive calculations

### References
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Feature based archtecture](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Node.js](https://nodejs.org/)
