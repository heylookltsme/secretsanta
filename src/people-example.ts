/**
 * Replace with all the folks in your Secret Santa and rename the file people.js
 *
 * Phone numbers include the country code and no dashes or spaces, eg.,
 * 15559998888.
 *
 * Each person object has an `exclude` key where you can list people this person
 * should _not_ be assigned. (e.g., people who would be buying gifts for each
 * other anyway, etc.)
 */

interface Person {
  phone: string;
  address?: string;
  exclude: Array<string>;
}

interface People {
  [key: string]: Person;
}

const people: People = {
  blanche: {
    phone: '1555999888',
    exclude: [],
  },
  dorothy: {
    phone: '1555999888',
    exclude: ['stan'],
  },
  rose: {
    phone: '1555999888',
    exclude: ['miles'],
  },
  sophia: {
    phone: '1555999888',
    exclude: [],
  },
  stan: {
    phone: '1555999888',
    exclude: [],
  },
  miles: {
    phone: '1555999888',
    exclude: ['rose'],
  },
};

export default people;
