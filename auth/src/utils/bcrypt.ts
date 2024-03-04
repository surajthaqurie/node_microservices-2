import bcrypt from "bcrypt";

export class BcryptHelper {
  async generateHashPassword(plainPassword: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      return bcrypt.hash(plainPassword, salt);
    } catch (err) {
      throw err;
    }
  }

  verifyPassword(plainPassword: string, hashPassword: string): Promise<boolean> {
    try {
      return bcrypt.compare(plainPassword, hashPassword);
    } catch (err) {
      throw err;
    }
  }
}
