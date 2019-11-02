import * as _ from 'lodash';
import Twilio from 'twilio';
import config from '../config';
import peeps from '../people';

const isTestRun = process.argv.includes('--test');

const twilioClient = new Twilio(
  config.twilio.accountSid,
  config.twilio.authToken,
);

const assignments = {};

/**
 * Create a specific secret santa assignment for the given name.
 *
 * @param {string} name - The person to be assigned.
 */
const assign = (name) => {
  // Determine exclusions: the person's exclude key + all those already assigned
  const exclusions = [name].concat(peeps[name].exclude, _.values(assignments));
  // The assignment options are everyone not excluded.
  const assignmentOptions = _.difference(_.keys(peeps), exclusions);
  // Pick an assignment at random.
  assignments[name] = _.shuffle(assignmentOptions).shift();
};

/**
 * Generate all the secret santa assignments.
 */
const generateAssignments = () => {
  _.forEach(peeps, (value, name) => {
    assign(name);
  });
};

/**
 * Send a text with the secret santa assignment.
 *
 * @param {string} name - The person to text.
 */
const sendSms = (name) => {
  const message = `Hi there, ${_.capitalize(
    name,
  )}! Your 2019 Secret Santa assignment is: ${_.capitalize(
    assignments[name],
  )}! Please buy them an awesome gift worth up
    to $50! See you at Christmas!!! 🎁🎄❄️`;

  twilioClient.messages
    .create({
      body: message,
      to: `+${peeps[name].phone}`,
      from: config.twilio.phoneNumber,
    })
    .then((m) => console.log(m.sid));
};

// Generate the assignments
while (
  _.isEmpty(assignments)
  || _.values(assignments).indexOf(undefined) >= 0
) {
  generateAssignments();
}

// If executed with --send-sms, then actually send the assignments out via sms.
if (!isTestRun) {
  _.forEach(assignments, (value, key) => {
    sendSms(key);
    console.log(`sent sms to ${key}`);
  });
}

// Print out the assignments
if (isTestRun) {
  console.log('Test run assignments:');
}
console.log(assignments);
