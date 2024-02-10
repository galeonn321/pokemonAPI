import {
    logger,
    consoleTransport,
    fileAsyncTransport,
  } from "react-native-logs";
  
  const config = {
    transport: __DEV__ ? consoleTransport : fileAsyncTransport,
    severity: __DEV__ ? "debug" : "error",
    transportOptions: {
      colors: {
        debug: "greenBright",
        info: "blueBright",
        warn: "yellowBright",
        error: "redBright",
      },
    },
    dateFormat: (date) => date.toLocaleTimeString() + " ",
  };
  
  const LOG = logger.createLogger(config);
  
  export { LOG };
  

  //This is just to have a beautiful and colorful console.log