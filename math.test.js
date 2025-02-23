describe("Simple Test", () => {
  test("should add two numbers correctly", () => {
    const sum = 1 + 2;
    expect(sum).toBe(3);
  });

  test("should check if string matches", () => {
    const greeting = "Hello, World!";
    expect(greeting).toBe("Hello, World!");
  });
});
