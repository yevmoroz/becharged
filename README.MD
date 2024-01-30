## BeCharged

Imagine the world where EV chargin is done seamlessly

## How to use

Scan with the phone QR code to run the app through Expo Go:

### For Android:
![](docs/eas-update-android.svg)

### For iOS
![](docs/eas-update-ios.svg)

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
