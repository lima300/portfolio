import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { BeforeAfterSlider } from "@/components/features/before-after";
import { LiveEmbed } from "@/components/features/live-embed";

beforeAll(() => {
  // jsdom has no matchMedia; the slider reads prefers-reduced-motion.
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
});

const labels = { before: "Before", after: "After", slider: "Compare" };

function renderSlider() {
  return render(
    <BeforeAfterSlider
      locale="en"
      caption="Indexed: before = 100."
      labels={labels}
      rows={[
        { label: "Load time", before: 100, after: 20 },
        { label: "Conversions", before: 100, after: 140, better: "higher" },
      ]}
    />,
  );
}

describe("BeforeAfterSlider", () => {
  it("states both endpoints and the change as text", () => {
    renderSlider();

    expect(screen.getByText("100 → 20")).toBeInTheDocument();
    expect(screen.getByText("-80%")).toBeInTheDocument();
    expect(screen.getByText("+40%")).toBeInTheDocument();
    expect(screen.getByText("Indexed: before = 100.")).toBeInTheDocument();
  });

  it("is a labelled native slider that announces every value", () => {
    renderSlider();
    const slider = screen.getByRole("slider", { name: "Compare" });

    expect(slider).toHaveAttribute(
      "aria-valuetext",
      "Load time: 100, Conversions: 100",
    );

    fireEvent.change(slider, { target: { value: "50" } });
    expect(slider).toHaveAttribute(
      "aria-valuetext",
      "Load time: 60, Conversions: 120",
    );
  });

  it("jumps to either end from its labels", () => {
    renderSlider();
    const slider = screen.getByRole("slider", { name: "Compare" });

    fireEvent.click(screen.getByRole("button", { name: "After" }));
    expect(slider).toHaveValue("100");
    expect(screen.getByRole("button", { name: "After" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Before" }));
    expect(slider).toHaveValue("0");
  });
});

describe("LiveEmbed", () => {
  it("loads nothing until asked, then a titled, sandboxed frame", () => {
    const { container } = render(
      <LiveEmbed
        src="https://demo.example"
        title="Zeno's Paradox"
        labels={{ load: "Run the live demo" }}
      />,
    );

    expect(container.querySelector("iframe")).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: "Run the live demo: Zeno's Paradox" }),
    );

    const frame = screen.getByTitle("Zeno's Paradox");
    expect(frame.tagName).toBe("IFRAME");
    expect(frame).toHaveAttribute("src", "https://demo.example");
    expect(frame).toHaveAttribute("sandbox", "allow-scripts allow-same-origin");
  });
});
