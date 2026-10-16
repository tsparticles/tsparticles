import { describe, it, expect } from "vitest";
import { camelize, capitalize, dash } from "../src";

describe("capitalize", () => {
  describe("empty string", () => {
    it("should successfully compare empty strings", () => {
      expect(capitalize("")).toBe("");
    });
  });

  describe("lowercase string", () => {
    it("should return capitalized string", () => {
      expect(capitalize("test")).toBe("Test");
    });
  });

  describe("capitalized string", () => {
    it("should return capitalized string", () => {
      expect(capitalize("Test")).toBe("Test");
    });
  });

  describe("multiple lowercase words string", () => {
    it("should return capitalized string, no split", () => {
      expect(capitalize("test test")).toBe("Test test");
    });

    it("should return capitalized string, split", () => {
      expect(capitalize("test test", " ")).toBe("TestTest");
    });

    it("should return capitalized string, wrong split", () => {
      expect(capitalize("test test", ";")).toBe("Test test");
    });
  });

  describe("multiple uppercase words string", () => {
    it("should return capitalized string, no split", () => {
      expect(capitalize("Test Test")).toBe("Test Test");
    });

    it("should return capitalized string, split", () => {
      expect(capitalize("Test Test", " ")).toBe("TestTest");
    });

    it("should return capitalized string, wrong split", () => {
      expect(capitalize("Test Test", ";")).toBe("Test Test");
    });
  });
});

describe("camelize", () => {
  describe("empty string", () => {
    it("should successfully compare empty strings", () => {
      expect(camelize("")).toBe("");
    });
  });

  describe("lowercase string", () => {
    it("should return camelized string", () => {
      expect(camelize("test")).toBe("test");
    });
  });

  describe("uppercase string", () => {
    it("should return camelized string", () => {
      expect(camelize("Test")).toBe("test");
    });
  });

  describe("multiple lowercase words string", () => {
    it("should return camelized string, no split", () => {
      expect(camelize("test test")).toBe("test test");
    });

    it("should return camelized string, split", () => {
      expect(camelize("test test", " ")).toBe("testTest");
    });

    it("should return camelized string, wrong split", () => {
      expect(camelize("test test", ";")).toBe("test test");
    });
  });

  describe("multiple uppercase words string", () => {
    it("should return camelized string, no split", () => {
      expect(camelize("Test Test")).toBe("test Test");
    });

    it("should return camelized string, split", () => {
      expect(camelize("Test Test", " ")).toBe("testTest");
    });

    it("should return camelized string, wrong split", () => {
      expect(camelize("Test Test", ";")).toBe("test Test");
    });
  });
});

describe("dash", () => {
  describe("empty string", () => {
    it("should successfully compare empty strings", () => {
      expect(dash("")).toBe("");
    });
  });

  describe("lowercase string", () => {
    it("should return dashed string", () => {
      expect(dash("test")).toBe("test");
    });
  });

  describe("uppercase string", () => {
    it("should return dashed string", () => {
      expect(dash("Test")).toBe("test");
    });
  });

  describe("capitalized word string", () => {
    it("should return dashed string", () => {
      expect(dash("TestTest")).toBe("test-test");
    });
  });

  describe("camelized word string", () => {
    it("should return dashed string", () => {
      expect(dash("testTest")).toBe("test-test");
    });
  });
});
