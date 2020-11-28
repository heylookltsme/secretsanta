interface Config {
  twilio: TwilioConfig;
}

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

/**
 * Fill in this stuff with values from your account at twilio and rename
 * the file config.js
 */
const config: Config = {
  twilio: {
    accountSid: '',
    authToken: '',
    phoneNumber: '',
  },
};

export default config;
