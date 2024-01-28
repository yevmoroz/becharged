## BeCharged

Imagine the world where EV chargin is done seamlessly

### Development

Install dependencies with `npm install`. Start developement by running regular `npm start`. Follow on screen prompt to setup expo on iOS/Android device.

### Considerations

Following are consideraitons that can be made for an app that helps with EV charging. What is currently unmarked will be implemented as iteration

- [x] get list of charging stations from https://openchargemap.org/ API
- [x] show surrounding charging stations
-- [x] based on device location
-- [x] as a list
-- [ ] based on given location (via mapbox.places API call)
-- [ ] on a map (via RNMapBox)
- [ ] call maps app to get directions
- [x] start charging for select station
- [x] refresh list on pull-down
- [ ] user-friendly API handling

### References
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Feature based archtecture](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Node.js](https://nodejs.org/)
