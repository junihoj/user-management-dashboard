import { faker } from "@faker-js/faker";
import { UserRoleEnum, UserStatusEnum } from "./enums";

export const dummyUsers = faker.helpers.multiple(
  () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.person.firstName() + faker.person.lastName(),
    email: faker.internet.email(),
    profilePhoto: faker.image.avatar(),
    role: faker.helpers.enumValue(UserRoleEnum),
    status: faker.helpers.enumValue(UserStatusEnum),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  }),
  { count: { min: 4, max: 50 } }
);
