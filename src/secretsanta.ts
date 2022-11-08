import twilio from 'twilio';
import config from './config';
import peeps from './people';

const isTestRun = process.argv.includes('--test');
const twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);
const assignments: { [key: string]: string } = {};

/**
 * Utility function to capitalize a string.
 */
const capitalize = (s: string) => {
  if (!s) return '';
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
};

/**
 * Create a specific secret santa assignment for the given name.
 */
const assign = (name: string) => {
  // Determine exclusions: the person's exclude key + all those already assigned
  const exclusions = [name].concat(
    peeps[name].exclude,
    Object.values(assignments)
  );
  // The assignment options are everyone not excluded.
  const assignmentOptions = Object.keys(peeps).filter(
    (name) => !exclusions.includes(name)
  );

  // If there are no assignment options left, then we need to bail.
  if (assignmentOptions.length === 0) {
    throw new Error(`No one is left for ${capitalize(name)}! 🙀`);
  }

  // Pick an assignment at random.
  assignments[name] =
    assignmentOptions[Math.floor(Math.random() * assignmentOptions.length)];
};

/**
 * Generate all the secret santa assignments.
 */
const generateAssignments = () => {
  Object.keys(peeps).forEach((name) => {
    assign(name);
  });
};

/**
 * Send a text with the secret santa assignment.
 */
const sendSms = (name: string) => {
  const message = `Hi there, ${capitalize(
    name
  )}! Your ${new Date().getFullYear()} Secret Santa assignment is: ${capitalize(
    assignments[name]
  )}! Please buy them an awesome gift worth up
    to $50. Merry Christmas!!! 🎁🎄❄️`;

  twilioClient.messages
    .create({
      body: message,
      to: `${peeps[name].phone}`,
      from: config.twilio.phoneNumber,
    })
    .then((m: any) => console.log(m.sid));
};

// Generate the assignments
generateAssignments();

// If it's not a test run, then actually send the assignments out via sms.
if (!isTestRun) {
  Object.keys(assignments).forEach((key) => {
    sendSms(key);
    console.log(`sent sms to ${key}`);
  });
}

// Print out the assignments
if (isTestRun) {
  console.log('Test run assignments:');
}
console.log(assignments);
