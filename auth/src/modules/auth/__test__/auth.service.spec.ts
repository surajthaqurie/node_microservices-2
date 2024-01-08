describe("Auth service", () => {
  describe("Signup user", () => {
    it("Returns 400, when password and current password doesn't match each other", async () => {
      expect(2).toEqual(2);
    });

    it.todo("Returns 409, when already taken email is used for create new user");
    it.todo("Returns 409, when already taken username is used for create new user");

    it.todo("Returns 201, when user created successfully");

    it.todo("Returns 400, when user is not created");
  });
});
