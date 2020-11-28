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
$ yarn install
```

- Get API credentials and a phone number from https://www.twilio.com/

- Replace the contents of `config-example.ts` with your twilio credentials and 
rename it `config.ts`

- Replace the contents of `people-example.ts` with the folks in your secret santa
and rename it `people.ts`

- Run `yarn run santa-test` to do a dry run (i.e., no texts will be sent) of the 
generator to verify it's working. You'll see the assignments output. 

- Run `yarn run santa` to text the assignments to everyone in your group. You 
will not see the assignments. The assignments will be saved to a file, 
`secret-santa-assignments.txt` just in case you absolutely need it. But no 
peeking! ;p 
