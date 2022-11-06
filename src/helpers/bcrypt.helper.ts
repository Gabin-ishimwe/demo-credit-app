import { genSaltSync, hashSync, compareSync } from "bcrypt";

export function hashPassword(pass: string | Buffer) {
  const salt = genSaltSync(10, "b");

  return hashSync(pass, salt);
}

export function comparePassword(
  plainPassword: string | Buffer,
  hashedPassword: string
) {
  const compare = compareSync(plainPassword, hashedPassword);
  return compare;
}
