# Secret Santa Assignment Generator 🎅 🎄 🎁

I couldn't find an SMS-based secret santa assignment generator that let you
specify exclusion rules (i.e., who shouldn't get who), so I made a simple one!

## Usage

- Clone the repo
```
$ git clone https://github.com/heylookltsme/secretsanta.git
$ cd secretsanta
```

- Install dependencies
```
$ npm install # or yarn, whatever.
```

- Get API credentials and a phone number from https://www.twilio.com/

- Replace the contents of `config-example.js` with your twilio credentials

- Replace the contents of `people-example.js` with the folks in your secret santa

- Run `node src/secretsanta.js > secret-santa-assignments.txt`. Et viola!

That will generate and text the assignments to everyone. You'll also have a backup list in `secret-santa-assignments.txt` in case you absolutely need it. But no peeking!!
