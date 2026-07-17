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
    id: "picking-parts",
    date: "2026-07-17",
    label: "Planning",
    title: "Deciding What Actually Goes Into This Thing",
    body: `
      <p>Okay, I finally sat down and worked through what parts I actually want, instead of just
      saving money into a vague "PC fund." I want this thing to handle school work, Hogwarts Legacy,
      CS:GO, and a lot of modded Minecraft — and I want it to last a long time, not just feel fast
      for a year and then get replaced.</p>

      <p>The first thing I learned is that those games stress totally different parts of a computer.
      CS:GO barely needs anything. Hogwarts Legacy is all about the graphics card, especially with
      ray tracing on, since I want it to actually look beautiful. And modded Minecraft is the sneaky
      one — it leans hard on the CPU and RAM, because every mod adds more logic the processor has to
      chew through each frame. Once that clicked, picking parts stopped feeling random.</p>

      <p>Budget-wise, I set $2,000 total and split it: roughly $1,700–1,750 for the actual PC, and
      the rest for a mouse and headphones (I've already got a keyboard and a monitor, so those got
      set aside for now).</p>

      <p>My last PC was AMD and it lasted me seven years, so I wanted to stick with that. Turns out
      AMD actually makes two different product lines — Ryzen CPUs and Radeon GPUs — so "staying AMD"
      wasn't as simple as I thought. I ended up going Ryzen for the CPU, since it's currently the
      strongest option for gaming and its cache design specifically helps with CPU-heavy stuff like
      modded Minecraft. For the graphics card, I went with NVIDIA instead, because ray tracing and
      upscaling tech is where NVIDIA still leads — and that's exactly what I need for Hogwarts Legacy
      to look the way I want.</p>

      <p>Current draft build:</p>
      <ul>
        <li>Ryzen 7 9800X3D (CPU)</li>
        <li>RTX 5070 (GPU)</li>
        <li>32GB DDR5 RAM</li>
        <li>1TB NVMe SSD</li>
        <li>AM5 motherboard</li>
        <li>750W 80+ Gold PSU</li>
        <li>Airflow-focused case + aftermarket CPU cooler</li>
      </ul>

      <p>The part I care about most, though, is longevity. The graphics card will probably be the
      first thing that feels dated, since game visuals get more demanding every year — but that's
      actually good news, because it means I likely won't need to replace the whole PC, just that one
      part. I specifically picked an AM5 motherboard for this reason too: AMD tends to keep the same
      CPU socket alive across multiple generations, so years from now I should be able to drop in a
      newer Ryzen chip on the same board instead of rebuilding everything from scratch. Same story
      with RAM and storage — both are easy, cheap add-ons later if I ever need more.</p>

      <p>So the plan going forward isn't "buy it all new again in five years," it's "upgrade the one
      piece that's actually behind, when it's actually behind." Building day is still a couple months
      out — parts and prices might shift a bit before then, but I've got a real direction now instead
      of just a list of unfamiliar acronyms. - Eden</p>
    `
  },
  {
    id: "research-phase",
    date: "2026-05-18",
    label: "Research",
    title: "Where Do I Even Start?",
    body: `
      <p>I've never built a PC before, so the first thing I did was ask my friends about what pieces 
      I should be looking into to.  I talked to them about what games I would be hoping to run/play 
      to gather a list of pieces that would be a good fit.  Right now I am creating a document of 
      possibilities.  I haven't done much more than that yet, the next most important thing to do is 
      start saving money! - Eden </p>
    `
  }
];