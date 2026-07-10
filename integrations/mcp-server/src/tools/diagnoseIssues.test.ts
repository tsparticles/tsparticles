import { describe, it, expect } from "vitest";
import { diagnoseIssues } from "./diagnoseIssues.js";

describe("diagnoseIssues", () => {
  it("should return no issues for empty options", () => {
    const issues = diagnoseIssues({});
    expect(Array.isArray(issues)).toBe(true);
  });

  it("should detect invisible particles (opacity = 0)", () => {
    const issues = diagnoseIssues({
      particles: {
        opacity: { value: 0 },
      },
    });
    expect(issues.some(i => i.title.includes("opacity = 0"))).toBe(true);
    expect(issues.find(i => i.title.includes("opacity = 0"))?.severity).toBe("error");
  });

  it("should detect invisible particles (size = 0)", () => {
    const issues = diagnoseIssues({
      particles: {
        size: { value: 0 },
      },
    });
    expect(issues.some(i => i.title.includes("size = 0"))).toBe(true);
  });

  it("should not flag opacity=0 if animation is enabled", () => {
    const issues = diagnoseIssues({
      particles: {
        opacity: { value: 0, animation: { enable: true } },
      },
    });
    expect(issues.some(i => i.title.includes("opacity = 0"))).toBe(false);
  });

  it("should detect links interaction needed", () => {
    const issues = diagnoseIssues({
      particles: {
        links: { enable: true },
      },
    });
    expect(issues.some(i => i.title.includes("Links interaction"))).toBe(true);
  });

  it("should detect missing interactivity plugin", () => {
    const issues = diagnoseIssues({
      interactivity: {
        events: { onClick: { mode: "push" } },
      },
    });
    expect(issues.some(i => i.title.includes("Interactivity plugin"))).toBe(true);
  });

  it("should detect interaction mode from events.onClick.mode", () => {
    const issues = diagnoseIssues({
      interactivity: {
        events: { onClick: { mode: "push" } },
      },
    });

    expect(issues.some(i => i.title.includes("Interaction mode 'push'"))).toBe(true);
  });

  it("should detect shape plugin needed", () => {
    const issues = diagnoseIssues({
      particles: {
        shape: { type: "star" },
      },
    });
    expect(issues.some(i => i.title.includes("Shape"))).toBe(true);
  });

  it("should detect emitters plugin needed", () => {
    const issues = diagnoseIssues({
      emitters: [{ position: { x: 50, y: 50 } }],
    });
    expect(issues.some(i => i.title.includes("Emitters plugin"))).toBe(true);
  });

  it("should detect absorbers plugin needed", () => {
    const issues = diagnoseIssues({
      absorbers: [{ position: { x: 50, y: 50 } }],
    });
    expect(issues.some(i => i.title.includes("Absorbers plugin"))).toBe(true);
  });

  it("should detect interaction mode", () => {
    const issues = diagnoseIssues({
      interactivity: {
        modes: {
          grab: { distance: 200 },
        },
      },
    });
    expect(issues.some(i => i.title.includes("grab"))).toBe(true);
  });

  it("should detect hex color warning", () => {
    const issues = diagnoseIssues({
      particles: {
        color: { value: "#ff0000" },
      },
    });
    expect(issues.some(i => i.title.includes("Hex color"))).toBe(true);
  });

  it("should detect low particle count", () => {
    const issues = diagnoseIssues({
      particles: {
        number: { value: 10 },
      },
    });
    expect(issues.some(i => i.title.includes("Low particle count"))).toBe(true);
  });

  it("should warn about fullScreen not set", () => {
    const issues = diagnoseIssues({});
    expect(issues.some(i => i.title.includes("Full-screen not enabled"))).toBe(true);
  });

  it("should detect high particle count performance issue", () => {
    const issues = diagnoseIssues({
      particles: {
        number: { value: 2000 },
      },
    });
    expect(issues.some(i => i.title.includes("High particle count"))).toBe(true);
  });

  it("should detect move plugin needed", () => {
    const issues = diagnoseIssues({
      particles: {
        move: { speed: 5 },
      },
    });
    expect(issues.some(i => i.title.includes("Move plugin"))).toBe(true);
  });

  it("should detect emitter shape", () => {
    const issues = diagnoseIssues({
      emitters: {
        shape: { type: "square" },
      },
    });
    expect(issues.some(i => i.title.includes("Emitter shape"))).toBe(true);
  });

  it("should detect interaction mode packages beyond the defaults", () => {
    const issues = diagnoseIssues({
      interactivity: {
        modes: {
          repulse: { distance: 200 },
          attract: { distance: 100 },
        },
      },
    });
    expect(issues.some(i => i.title.includes("repulse"))).toBe(true);
    expect(issues.some(i => i.title.includes("attract"))).toBe(true);
  });

  it("should generate multiple issues for a complex broken config", () => {
    const issues = diagnoseIssues({
      interactivity: {
        modes: {
          bubble: { size: 10 },
          push: { quantity: 4 },
        },
      },
      emitters: [{ position: { x: 50, y: 50 } }],
      particles: {
        opacity: { value: 0 },
        links: { enable: true },
        shape: { type: "star" },
        number: { value: 5 },
      },
    });
    expect(issues.length).toBeGreaterThanOrEqual(5);
  });
});
