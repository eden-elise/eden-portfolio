/* Add new entries here. The renderer sorts by date (newest first) automatically.
   Each entry:
     id    — used as the URL fragment anchor (building_pc.html#your-id)
     date  — ISO 8601 string (YYYY-MM-DD)
     label — short phase tag shown above the title
     title — entry heading
     body  — HTML string; may include <p>, <ul>, <img>, <a>, etc.
*/
export const entries = [
  {
    id: "research-phase",
    date: "2026-05-01",
    label: "Research",
    title: "Where Do I Even Start?",
    body: `
      <p>I've never built a PC before, so the first thing I did was spend an embarrassing
      number of hours on r/buildapc and watching YouTube comparisons. The sheer number of
      choices — socket types, RAM speeds, PCIe generations — is a lot to absorb all at once.</p>
      <p>My main constraints: a student budget, I want it to handle programming workloads and
      maybe some light gaming, and I'd like it to last a few years without feeling obsolete.
      I started a parts list on PCPartPicker to keep track of what I'm considering.</p>
    `
  },
  {
    id: "parts-list",
    date: "2026-05-15",
    label: "Planning",
    title: "Settling on a Parts List",
    body: `
      <p>After way too much deliberation, I landed on a parts list I'm happy with. The hardest
      decision was the CPU — I went back and forth several times before committing. Ultimately
      I prioritized single-core performance since most of the software I use is single-threaded.</p>
      <p>Still waiting for a sale on the GPU before I pull the trigger on the full order.
      Everything else is either already purchased or sitting in my cart.</p>
    `
  }
];
