import { faker } from "@faker-js/faker";

export const firstName = faker.person.firstName();
export const lastName = faker.person.lastName();
export const generatedEmail = faker.internet.email();
export const generatedPassword = faker.internet.password();
export const phoneNumber = faker.phone.number();
