const _ = require('lodash');
const twilio = require('twilio');
const config = require('../config');
const peeps = require('../people');

const twilioClient = new twilio(config.twilio.accountSid, config.twilio.authToken);

const assignments = {};

function assign(name) {
    const exclusions = [name].concat(peeps[name].exclude, _.values(assignments));
    const assignmentOptions = _.difference(_.keys(peeps), exclusions);
    assignments[name] = _.shuffle(assignmentOptions).shift();
}

function generateAssignments() {
    _.forEach(peeps, (value, name) => {
        assign(name);
    });
}

function sendSms(name) {
    const message = `Hi there, ${_.capitalize(name)}! Your Secret Santa assignment is: ${_.capitalize(assignments[name])}! Please buy them an awesome gift worth up
    to $50! See you at Christmas!!! 🎁🎄❄️`;

    twilioClient.messages.create({
        body: message,
        to: `+${peeps[name].phone}`,
        from: config.twilio.phoneNumber,
    })
    .then((message) => console.log(message.sid));
}


while (_.isEmpty(assignments) || _.values(assignments).indexOf(undefined) >= 0) {
    generateAssignments();
}

_.forEach(assignments, (value, key) => {
    sendSms(key);
});

console.log(assignments);
