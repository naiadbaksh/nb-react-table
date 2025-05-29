import { faker } from "@faker-js/faker";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  registeredDate: string;
};

export const generateFakeUsers = (count = 500): User[] =>
  Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    city: faker.location.city(),
    registeredDate: faker.date.past({ years: 3 }).toISOString(),
  }));
