import type { Topic } from "./types";

export const relativityTopics: Topic[] = [
  {
    slug: "special-relativity",
    title: "Special relativity",
    category: "Space & relativity",
    subtitle:
      "Why different observers disagree about time—and still agree about physics.",
    minutes: 12,
    level: "Start here",
    accent: "blue",
    visual: "relativity",
    intro:
      "Special relativity is Einstein’s 1905 account of space and time when gravity can be neglected. Its surprising claim is precise: observers moving uniformly relative to each other can measure different durations and lengths, while the laws of physics and the locally measured speed of light in vacuum agree. This is not a claim that truth is subjective. It is a set of rules for translating measurements between observers.",
    why: "Understanding time dilation opens the door to spacetime, particle physics, and eventually gravity. You can derive the central result with a triangle rather than advanced calculus.",
    prerequisites: [
      "Speed means distance divided by time.",
      "The Pythagorean theorem relates the sides of a right triangle.",
    ],
    terms: [
      {
        term: "Inertial frame",
        definition:
          "A coordinate system associated with an observer moving without acceleration, with synchronized clocks and rulers.",
      },
      {
        term: "Event",
        definition:
          "Something that happens at a particular place and time, such as a flash emitted by a lamp.",
      },
      {
        term: "Proper time",
        definition:
          "The elapsed time measured by a clock along its own path through spacetime.",
      },
      {
        term: "Lorentz factor",
        definition:
          "The dimensionless factor γ that relates selected measurements between relatively moving inertial frames.",
      },
    ],
    sections: [
      {
        title: "The puzzle Einstein resolved",
        paragraphs: [
          "Imagine overtaking a slow bicycle. Relative to you, it can become stationary or move backward. Nineteenth-century electromagnetism presented an awkward contrast: Maxwell’s equations describe electromagnetic waves with a particular vacuum speed. If you chased a light beam, would its waves slow down the same way? The familiar rules for adding velocities did not fit comfortably with the structure of electromagnetism.",
          "Einstein took two principles seriously: the laws of physics have the same form in every inertial frame, and each inertial observer measures the same vacuum light speed. He changed the assumptions about time and simultaneity rather than inventing a privileged observer. Lorentz and Poincaré made important related contributions; later Minkowski expressed the theory in four-dimensional spacetime geometry. Einstein’s achievement belongs in this larger scientific history.",
        ],
      },
      {
        title: "Build a clock out of light",
        paragraphs: [
          "Picture two mirrors facing each other inside a spacecraft. A light pulse bounces between them. One complete return is one tick. For an astronaut beside the mirrors, the pulse travels vertically. For someone watching the spacecraft pass, the upper mirror moves sideways while the pulse is in flight, so the same pulse follows a diagonal path. Both observers assign light the same speed, but the second observer assigns it a longer distance.",
          "A longer journey at the same speed takes longer. The observer outside therefore assigns more time to each tick of the moving clock. This argument is about measurements in frames after accounting for signal travel time, not just what an eye or camera happens to see. Ordinary mechanical and atomic clocks must obey the same relationship: otherwise comparing them with the light clock would reveal a preferred state of uniform motion.",
        ],
      },
      {
        title: "Where the square root comes from",
        paragraphs: [
          "Consider half a tick. Call the mirror separation L, the spacecraft speed v, and the outside observer’s elapsed time t. The diagonal light path has length ct, while the spacecraft moves vt sideways. Pythagoras gives (ct)² = L² + (vt)². Rearranging gives t = L / √(c² − v²). The astronaut measures a half-tick lasting L/c. Dividing the first duration by the second gives γ = 1 / √(1 − v²/c²).",
          "At everyday speeds, v²/c² is extremely small, so γ is almost one. That explains why ordinary experience did not force people to discover relativity much earlier. At 60 percent of light speed, the factor becomes 1.25. A process lasting four seconds on the spacecraft takes five seconds in the laboratory frame. Nothing feels slow to the astronaut: their heartbeat, watch, and local experiments remain ordinary.",
        ],
      },
      {
        title: "How can both clocks be slower?",
        paragraphs: [
          "Each inertial observer can describe the other’s moving clock as ticking more slowly. The missing ingredient is simultaneity. To compare a distant moving clock with your own frame, you need clocks at different locations and a rule for synchronizing them. Different moving frames disagree about which distant events happen at the same time. They are not making two incompatible claims about an identical pair of local comparisons.",
          "For a reunion experiment, the paths matter. A traveler who leaves Earth, turns around, and returns does not remain in one inertial frame throughout. The elapsed time along each entire path can be computed, and both observers agree on the readings when the clocks reunite. Acceleration identifies a difference in the histories, but simply saying acceleration damages the clock is wrong. Proper time is a geometric property of the path, not a mechanical malfunction.",
        ],
      },
      {
        title: "Evidence, boundaries, and your experiment",
        paragraphs: [
          "Fast unstable particles provide a particularly clear test: their lifetimes measured in the laboratory depend on speed as relativity predicts. Precision clock experiments also test relativistic time differences. Satellite navigation must account for both motion and gravitational effects; special relativity alone is not the whole navigation calculation. Agreement across different kinds of clocks is part of what makes the theory compelling.",
          "Use the visualization to predict the clock ratio before moving the speed control. Try zero speed, then 0.6c, then a speed close to c. Notice that the ratio changes gently at first and sharply near the limit. The display compares idealized inertial clocks; it does not simulate an engine, a round trip, or gravitational fields. A massive object cannot reach c through finite acceleration energy, and substituting a faster-than-light speed into this formula does not create a valid spacecraft model.",
        ],
      },
    ],
    equation: {
      expression: "γ = 1 / √(1 − v²/c²); Δt = γ Δτ",
      symbols: [
        { symbol: "v", meaning: "Relative speed of the moving clock." },
        {
          symbol: "c",
          meaning: "Vacuum light speed, exactly 299,792,458 m/s.",
        },
        { symbol: "Δτ", meaning: "Time measured on the moving clock itself." },
        {
          symbol: "Δt",
          meaning: "Elapsed time assigned by the laboratory inertial frame.",
        },
      ],
      explanation:
        "For two events at the moving clock’s location, the laboratory duration exceeds its proper duration by γ.",
      example:
        "For v = 0.6c, γ = 1/√0.64 = 1.25. If Δτ = 4 seconds, Δt = 5 seconds.",
    },
    insight:
      "Relativity preserves agreement about physical events by changing how observers translate space and time measurements.",
    misconceptions: [
      {
        myth: "Time dilation is just an optical illusion.",
        correction:
          "Signal delays can change appearances, but time dilation remains after those delays are accounted for and can be tested with clocks.",
      },
      {
        myth: "Everything is relative, including the laws of physics.",
        correction:
          "The same laws and invariant spacetime relationships are central to the theory.",
      },
    ],
    check: {
      question:
        "A clock moves at 0.6c and records 8 seconds. What duration does the laboratory frame assign?",
      options: ["6.4 seconds", "8 seconds", "10 seconds"],
      answer: 2,
      explanation:
        "The Lorentz factor is 1.25, so the laboratory interval is 1.25 × 8 = 10 seconds.",
    },
    sources: [
      {
        title: "Einstein Online: light clocks and time dilation",
        url: "https://www.einstein-online.info/en/spotlight/light-clocks-time-dilation/",
      },
      {
        title: "Einstein Online: the relativity of space and time",
        url: "https://www.einstein-online.info/en/relativity_space_time/",
      },
    ],
  },
  {
    slug: "general-relativity",
    title: "General relativity",
    category: "Space & relativity",
    subtitle:
      "Einstein’s discovery that gravity is a relationship between matter and spacetime geometry.",
    minutes: 13,
    level: "Build intuition",
    accent: "blue",
    visual: "gravity",
    intro:
      "General relativity, completed by Einstein in 1915, is a theory of gravity. It describes how matter, radiation, pressure, and energy flow relate to the geometry of spacetime, and how freely falling objects travel through that geometry. Space and time become part of the physical system, rather than a fixed stage on which everything else happens.",
    why: "This is the conceptual foundation of black holes, gravitational waves, and modern cosmology. The first step is understanding why free fall is special.",
    prerequisites: [
      "Read special relativity for the meaning of proper time.",
      "An acceleration is a change in velocity.",
    ],
    terms: [
      {
        term: "Spacetime",
        definition:
          "The combined description of events using three spatial coordinates and one time coordinate.",
      },
      {
        term: "Geodesic",
        definition:
          "The locally straightest path in curved spacetime, followed by a freely falling test object.",
      },
      {
        term: "Curvature",
        definition:
          "A geometric property revealed by effects such as relative acceleration between nearby freely falling objects.",
      },
      {
        term: "Metric",
        definition:
          "The mathematical rule for calculating spacetime intervals, including clock readings and spatial distances.",
      },
    ],
    sections: [
      {
        title: "What changed from Newton?",
        paragraphs: [
          "Newton’s theory describes a gravitational force between masses, and remains extraordinarily useful when speeds and gravitational fields are modest. Einstein did not make bridge calculations or planetary approximations obsolete. He provided a deeper framework that recovers Newton’s predictions in their successful regime and makes additional predictions where higher precision or stronger gravity matters.",
          "A conceptual difficulty was that Newtonian gravity used a universal time and instantaneous gravitational influence, while special relativity had removed universal simultaneity. Einstein needed more than a small correction to a force formula. With help from mathematical developments and collaborators including Marcel Grossmann, he pursued a description that could express physical laws in general coordinates and account for gravity through geometry.",
        ],
      },
      {
        title: "The falling elevator",
        paragraphs: [
          "Imagine a sealed elevator with a person and a floating ball inside. If the elevator, person, and ball are all freely falling together, the person does not feel the usual support force from the floor. Over a sufficiently small region and brief interval, local experiments resemble those in an unaccelerated laboratory far from gravitating bodies. Conversely, a rocket accelerating through empty space presses its floor against its passengers, producing a sensation like weight.",
          "This is the starting intuition of the equivalence principle. The qualification local is essential. Two balls dropped on opposite sides of a large falling laboratory can approach each other because both are falling toward Earth’s center. Those tidal differences distinguish an extended gravitational field from an ideal uniformly accelerating room. You can remove the apparent gravitational force locally by choosing free-fall coordinates, but you cannot remove spacetime curvature throughout a finite region that way.",
        ],
      },
      {
        title: "What it means to fall along geometry",
        paragraphs: [
          "On a globe, two people walking north from different points on the equator eventually meet, even if each follows a straightest available surface path. Their changing separation reflects the surface geometry. Spacetime geometry is more subtle because time has a different role from spatial directions, but the analogy explains why changing separation need not imply a conventional force pushing each traveler sideways.",
          "An orbiting satellite continually falls along a spacetime geodesic. A person standing on Earth is prevented from doing so by the ground. That support force is what a scale measures. The familiar rubber-sheet picture can hint at curvature, but its downward sag relies on an external gravity and an extra visual dimension. Real spacetime does not require a hidden room into which it bends, and the picture leaves out the crucial role of time.",
        ],
      },
      {
        title: "Reading Einstein’s equation without solving it",
        paragraphs: [
          "The field equation is Gμν + Λgμν = (8πG/c⁴)Tμν. The left side describes aspects of spacetime geometry; the right side describes energy, momentum, and stresses. The Greek subscripts label components of mathematical objects called tensors. This compact notation represents a coupled system of equations, not a single arithmetic instruction. The cosmological constant Λ is an allowed term that also matters in cosmology.",
          "To make a prediction, specify a physical situation, choose appropriate assumptions and boundary conditions, and solve for the metric. Then calculate how clocks, light, or freely falling objects behave. The simulator below does not perform that general calculation. It uses one established consequence of the Schwarzschild solution: the clock rate outside an isolated, spherical, nonrotating, uncharged mass. That restriction lets us explore one effect accurately without pretending to solve arbitrary spacetime.",
        ],
      },
      {
        title: "A worked comparison of clocks",
        paragraphs: [
          "For a clock held stationary at radius r outside that idealized body, its rate relative to a reference clock infinitely far away is √(1 − rs/r), where rs = 2GM/c². At r = 4rs, the factor is √0.75, about 0.866. When the distant reference advances by 100 seconds, the stationary nearby clock advances by about 86.6 seconds. Each observer still experiences their own local seconds normally.",
          "The stationary condition matters: a freely falling or orbiting clock also has motion to consider. The formula applies only outside the body in the Schwarzschild exterior and above r = rs; a massive observer cannot hover on the horizon. For an ordinary star, being outside the horizon is insufficient if the selected radius is inside the star. Treat the control as an exterior compact-object thought experiment, not a model of Earth’s interior.",
        ],
      },
      {
        title: "Evidence and open questions",
        paragraphs: [
          "Relativity accounts for the extra precession of Mercury’s orbit and predicts light deflection, gravitational frequency shifts, and propagating gravitational waves. These are different observational consequences, tested in different settings. A successful illustration is not itself evidence: the illustration was programmed from the equations. Evidence comes from comparing quantitative predictions with independent measurements and their uncertainties.",
          "General relativity is a classical theory. It does not by itself provide a quantum description of spacetime or resolve the extreme conditions suggested by singularities. You can admire Einstein’s achievement while recognizing those limits. Before using the controls, ask what the two clocks measure, which one is held fixed, and which comparison is being made. Those questions prevent the misleading claim that time simply stops everywhere near a massive object.",
        ],
      },
    ],
    equation: {
      expression: "Gμν + Λgμν = (8πG/c⁴)Tμν; dτ/dt = √(1 − rs/r)",
      symbols: [
        {
          symbol: "Gμν",
          meaning: "Einstein tensor describing aspects of spacetime curvature.",
        },
        {
          symbol: "Tμν",
          meaning:
            "Stress-energy tensor describing energy, momentum, and stresses.",
        },
        {
          symbol: "Λgμν",
          meaning: "Cosmological-constant contribution to the field equation.",
        },
        { symbol: "rs", meaning: "Schwarzschild radius 2GM/c²." },
        {
          symbol: "dτ/dt",
          meaning:
            "Stationary exterior clock rate relative to time at infinity, in the Schwarzschild model.",
        },
      ],
      explanation:
        "The first equation is the theory’s field equation. The second is a restricted consequence used by this visualization, not a general solution engine.",
      example:
        "At r = 4rs, dτ/dt = √(3/4) ≈ 0.866. A 100-second distant interval corresponds to 86.6 seconds locally.",
    },
    insight:
      "Gravity changes the geometry used to compare clocks and trajectories; it is not merely a force added to otherwise fixed spacetime.",
    misconceptions: [
      {
        myth: "A rubber sheet is literally what spacetime looks like.",
        correction:
          "It is a limited analogy, with misleading external gravity and missing time geometry.",
      },
      {
        myth: "An astronaut in orbit is beyond Earth’s gravity.",
        correction:
          "The astronaut and spacecraft are freely falling together; gravity is what sustains the orbit.",
      },
    ],
    check: {
      question: "What does the clock visualization calculate?",
      options: [
        "Every possible solution of Einstein’s equations",
        "A stationary clock comparison in the ideal Schwarzschild exterior",
        "The quantum structure inside a black hole",
      ],
      answer: 1,
      explanation:
        "It uses a known special-case expression for static exterior clocks. Rotation, interior structure, and quantum effects are excluded.",
    },
    sources: [
      {
        title: "Einstein Online: equivalence principle",
        url: "https://www.einstein-online.info/en/explandict/equivalence-principle/",
      },
      {
        title: "Einstein Online: foundations of general relativity",
        url: "https://www.einstein-online.info/en/spotlights/gr/gr-sub01/",
      },
    ],
  },
  {
    slug: "black-holes",
    title: "Black holes",
    category: "Space & relativity",
    subtitle: "A boundary in spacetime—not a cosmic vacuum cleaner.",
    minutes: 12,
    level: "Build intuition",
    accent: "blue",
    visual: "blackhole",
    intro:
      "A black hole is a region of spacetime from which no future-directed light signal can escape to faraway observers. Its boundary is the event horizon. This definition is about which events can communicate with which other events, rather than about a dark material surface. General relativity predicts such regions, and astronomical observations provide strong evidence for objects with their expected properties.",
    why: "Black holes connect the geometry of relativity with questions about stars, information, quantum theory, and what counts as scientific evidence when an object cannot emit light directly.",
    prerequisites: [
      "General relativity introduces spacetime and geodesics.",
      "Mass measures how much matter-energy an object contains; radius measures a size.",
    ],
    terms: [
      {
        term: "Event horizon",
        definition:
          "The causal boundary separating events that can send signals to faraway observers from events that cannot.",
      },
      {
        term: "Schwarzschild radius",
        definition:
          "The horizon radius 2GM/c² for an ideal nonrotating, uncharged black hole.",
      },
      {
        term: "Accretion disk",
        definition:
          "Hot orbiting material outside a compact object that loses energy and can spiral inward.",
      },
      {
        term: "Tidal force",
        definition:
          "A difference in gravitational acceleration across an extended object, capable of stretching or compressing it.",
      },
    ],
    sections: [
      {
        title: "From Einstein’s equations to collapsed stars",
        paragraphs: [
          "Einstein supplied general relativity, but the story of black holes was a collective discovery. Karl Schwarzschild found an exact spherical vacuum solution in 1916. Later work on stellar structure, collapse, and the global geometry of spacetime established the physical meaning of black holes. Einstein himself was not the enthusiastic discoverer of the modern astrophysical picture; admiring his theory does not require assigning every consequence of it to him personally.",
          "A massive star can resist compression while pressure supports it against gravity. When the relevant support becomes insufficient, some stellar cores collapse into black holes. Other remnants become neutron stars or white dwarfs, depending on their histories and masses. Supermassive black holes in galactic centers require an additional growth story involving early seeds, accretion, and mergers. Their detailed formation history is an active research problem, not a single settled recipe.",
        ],
      },
      {
        title: "Why light cannot escape",
        paragraphs: [
          "A familiar introduction says that escape velocity exceeds light speed. This gives the correct Schwarzschild radius when used as a heuristic, but it is not the full relativistic explanation. Light does not struggle uphill, become tired, and fall back because its local speed decreases. Every local freely falling observer still measures light moving at c. The issue is the arrangement of possible future paths in spacetime.",
          "Inside an ideal black-hole horizon, future-directed light paths cannot reach the distant exterior. Pointing a rocket outward does not restore an escape route. Thinking of the horizon as a one-way causal boundary is more reliable than thinking of an especially sticky surface. The horizon need not be a place of large local curvature for a sufficiently massive black hole, although surviving the full journey is a different matter.",
        ],
      },
      {
        title: "Size is not the same as mass",
        paragraphs: [
          "For the simple Schwarzschild model, the radius grows linearly with mass. One solar mass corresponds to roughly 2.95 kilometers of horizon radius. Ten solar masses therefore gives about 29.5 kilometers. A million solar masses gives about 2.95 million kilometers. These are radii, so diameters are twice as large. The calculation does not tell you that all the matter sits uniformly distributed in a sphere of that size.",
          "Imagine replacing the Sun with a black hole of exactly the same mass, without imparting a disturbance to Earth. Far outside it, the gravitational influence would remain approximately the same, so Earth would not suddenly be sucked inward. Losing sunlight would be catastrophic for entirely different reasons. This thought experiment separates compactness from mass: compressing an object changes what happens nearby without multiplying its distant gravitational influence.",
        ],
      },
      {
        title: "What would different observers report?",
        paragraphs: [
          "An infalling clock emits signals toward a distant observer. Those signals become increasingly delayed and redshifted near the horizon, and their received intensity fades. The distant observer’s usual coordinate description assigns an ever-later time to crossing. The falling observer can cross in a finite amount of their own proper time. These statements use different measurements and are not a contradiction.",
          "Tidal effects depend on the black hole’s mass and your location. Across a human-sized object at the horizon, they can be far stronger for a small black hole than for a supermassive one. A smaller horizon puts you closer to a concentrated mass in a way that produces a steeper gravitational gradient. Nevertheless, radiation from surrounding matter can be dangerous, and classical interior predictions eventually reach regimes where our theories are incomplete.",
        ],
      },
      {
        title: "How we investigate something dark",
        paragraphs: [
          "Astronomers infer compact masses from the orbits of nearby stars and gas. Hot accreting material can radiate before crossing the horizon. Gravitational waves carry information about merging compact objects and the remnant’s oscillations. Horizon-scale radio images show emission surrounding a dark central region shaped by light propagation. None of these methods is simply taking a photograph of a solid black surface.",
          "The value of multiple methods is that they constrain different aspects of the same physical picture. Orbital measurements establish mass within a region; waveforms probe strong gravitational dynamics; images test surrounding emission and geometry. Each has models and uncertainties. A bright ring can be larger than the event horizon because bent light changes its apparent size, so the ring’s angular radius must not be casually equated with the physical horizon radius.",
        ],
      },
      {
        title: "What the model cannot settle",
        paragraphs: [
          "The classical singularity indicates a failure of the spacetime description under extreme conditions; it is not an experimentally photographed infinitely dense bead. Hawking radiation is a theoretical quantum effect with deep consequences, but radiation from astrophysical black holes has not been directly detected. Questions about information and quantum gravity remain research topics rather than features a simple animation can answer.",
          "Use the mass control to test the proportionality of horizon size. Double the mass and predict the radius before looking. The graphic is a size illustration for an uncharged, nonrotating black hole, not a numerical collapse simulation, a view inside the horizon, or a ray-traced telescope image. Real rotating black holes require a different spacetime model. Learning exactly what a visualization leaves out is part of learning to use it scientifically.",
        ],
      },
    ],
    equation: {
      expression: "rs = 2GM/c² ≈ 2.95 km × (M/M☉)",
      symbols: [
        { symbol: "rs", meaning: "Schwarzschild horizon radius." },
        { symbol: "G", meaning: "Newton’s gravitational constant." },
        { symbol: "M", meaning: "Black-hole mass." },
        {
          symbol: "M☉",
          meaning: "One solar mass, approximately 1.99 × 10³⁰ kilograms.",
        },
      ],
      explanation:
        "For a nonrotating, uncharged black hole, horizon radius is directly proportional to mass. This relation does not specify an internal material density profile.",
      example:
        "At ten solar masses, rs ≈ 29.5 kilometers. Doubling the mass to twenty solar masses doubles rs to about 59 kilometers.",
    },
    insight:
      "An event horizon is a limit on causal communication; darkness is a consequence, not the definition.",
    misconceptions: [
      {
        myth: "Black holes pull harder than anything with the same mass at the same large distance.",
        correction:
          "Their exceptional nearby effects come from compactness. The distant gravitational field primarily depends on mass and other relevant properties.",
      },
      {
        myth: "The glowing ring is the event horizon.",
        correction:
          "It is light from surrounding matter, distorted by spacetime. Its apparent size is not the horizon radius.",
      },
    ],
    check: {
      question:
        "In the Schwarzschild model, what happens to horizon radius when mass triples?",
      options: ["It triples", "It increases ninefold", "It remains fixed"],
      answer: 0,
      explanation: "The formula is linear in mass: rs = 2GM/c².",
    },
    sources: [
      {
        title: "NASA: what are black holes?",
        url: "https://www.nasa.gov/universe/what-are-black-holes/",
      },
      {
        title: "NASA: ten questions about black holes",
        url: "https://science.nasa.gov/universe/10-questions-you-might-have-about-black-holes/",
      },
      {
        title: "NASA: how do we know there are black holes?",
        url: "https://science.nasa.gov/mission/webb/science-overview/science-explainers/how-do-we-know-there-are-black-holes/",
      },
    ],
  },
  {
    slug: "expanding-universe",
    title: "The expanding universe",
    category: "Space & relativity",
    subtitle: "Why distant galaxies separate without Earth being the center.",
    minutes: 12,
    level: "Build intuition",
    accent: "blue",
    visual: "expansion",
    intro:
      "Cosmic expansion describes the changing large-scale distances between locations carried with the cosmic flow. In a simple homogeneous cosmological model, one time-dependent scale factor multiplies those distances. It does not mean every atom, person, solar system, or galaxy stretches at the same rate. Understanding that distinction makes the Big Bang much less like an ordinary explosion.",
    why: "This connects Einstein’s spacetime geometry with observations of galaxies and the history of the universe, while showing how scientists distinguish a mathematical model from its evidence.",
    prerequisites: [
      "Ratios compare one size with another.",
      "A light spectrum contains wavelengths that can be measured.",
    ],
    terms: [
      {
        term: "Scale factor",
        definition:
          "A dimensionless quantity a(t) describing relative changes in large-scale cosmic distances; its present value is often set to one.",
      },
      {
        term: "Comoving coordinate",
        definition:
          "A position label that stays fixed for an ideal observer following the smooth cosmic flow.",
      },
      {
        term: "Redshift",
        definition:
          "The fractional increase of an observed wavelength relative to its emitted wavelength.",
      },
      {
        term: "Hubble parameter",
        definition:
          "The fractional expansion rate H = ȧ/a at a particular cosmic time.",
      },
    ],
    sections: [
      {
        title: "A discovery with many authors",
        paragraphs: [
          "General relativity made it possible to model the universe as a dynamical spacetime. Einstein initially favored a static cosmological model. Alexander Friedmann found evolving solutions, and Georges Lemaître connected expansion with astronomical observations. Observational work by Vesto Slipher, Edwin Hubble, Henrietta Leavitt, and others helped establish the velocities and distance measurements needed for the emerging picture. This history is richer than a single person looking through a telescope and announcing everything.",
          "The modern Big Bang model describes an earlier hot, dense phase followed by expansion and cooling. It is not, by itself, a complete account of why anything exists or what happened at an absolute first instant. Extrapolating equations beyond the regime where their physics is reliable does not transform that extrapolation into an observation. A useful learning habit is to separate well-tested thermal history from unresolved questions about the earliest conditions.",
        ],
      },
      {
        title: "An experiment with dots",
        paragraphs: [
          "Place several dots on an imaginary transparent coordinate sheet. Increase every separation by the same factor. A dot initially two units from your chosen origin moves to four units when the scale doubles; one initially five units away moves to ten. The more distant dot gains more distance during the same interval, even though the same scaling rule applies everywhere.",
          "Now choose a different dot as the origin and measure all separations again. The same pattern holds. This is why observing distant galaxies receding does not select Earth as a cosmic center. The drawing’s outer boundary is an artifact of the page, not evidence for a wall around the universe. A two-dimensional display also cannot decide whether the actual universe is spatially finite or infinite.",
        ],
      },
      {
        title: "From a picture to an equation",
        paragraphs: [
          "Write a physical distance as D(t) = a(t)χ, where χ is a fixed comoving separation. Differentiate with respect to time: dD/dt = ȧχ. Substitute χ = D/a to obtain dD/dt = (ȧ/a)D = HD. This simple derivation explains the proportional relationship between recession rate and distance in a homogeneous expanding model. The units work: an inverse time multiplied by distance gives speed.",
          "For an illustrative H value of 70 kilometers per second per megaparsec, a separation of 10 megaparsecs corresponds to 700 kilometers per second of recession in the simple relation. At 20 megaparsecs it corresponds to 1,400 kilometers per second. This is a teaching value, not a claim to settle current measurements of the expansion rate. Actual galaxies also have local motions, and inferring distances from large redshifts needs the full expansion history.",
        ],
      },
      {
        title: "How expansion leaves a mark on light",
        paragraphs: [
          "Light emitted when the scale factor was smaller reaches us with a longer wavelength in the homogeneous cosmological model. The relation is 1 + z = a(now)/a(emission). If the universe’s scale has doubled during the journey, then z = 1. A spectral feature emitted at 500 nanometers would be received at 1,000 nanometers in this example. Matching recognizable spectral features lets astronomers measure redshift.",
          "Cosmological redshift is related to the changing geometry along the light’s journey. Treating every large redshift as a simple special-relativistic Doppler speed can mislead. Likewise, sufficiently distant comoving locations can have recession rates greater than c without an object locally overtaking a neighboring light beam. Special relativity’s local speed limit still holds. Comparing distant locations in curved spacetime requires stating which distance and time conventions are being used.",
        ],
      },
      {
        title: "Why galaxies and people do not swell",
        paragraphs: [
          "The smooth expansion model describes the universe after averaging over sufficiently large scales. Inside gravitationally bound systems, local dynamics matter. The Solar System does not steadily expand in proportion to the cosmic scale factor, and electromagnetic forces keep atoms and everyday objects bound. An animation that simply scales every drawn shape would therefore teach the wrong lesson. Separate dots can move apart while the symbolic galaxies themselves keep their size.",
          "A raisin-bread or balloon analogy helps with separation but introduces its own baggage. Bread has an oven outside it; a balloon has an obvious center in surrounding space. Neither feature is required by the cosmological model. Use an analogy only for the mathematical relationship it illustrates. Asking what the universe expands into assumes it behaves like an object growing inside a larger pre-existing container, which is not necessary in general relativity.",
        ],
      },
      {
        title: "Evidence, acceleration, and limits of this lab",
        paragraphs: [
          "The expansion picture is supported by galaxy observations together with the cosmic microwave background and primordial light-element abundances. These observations constrain more than a moving-dot animation can express. Measurements of distant supernovae and other probes support accelerated expansion at late times. Dark energy names the component used to describe that behavior in standard cosmological models; its underlying physical nature is not established merely by giving it a name.",
          "In this lab you choose the scale factor yourself. The visualization illustrates relative separations, not a forecast computed from matter density, radiation, curvature, and dark energy. Predict which pair of dots will gain the most separation, change the scale, and compare the ratios. Then choose another reference dot mentally. You have understood the core geometric idea when changing the observer does not create a privileged center, while doubling the scale doubles every comoving pair’s distance.",
        ],
      },
    ],
    equation: {
      expression: "D(t) = a(t)χ; H = ȧ/a; 1 + z = a(now)/a(emission)",
      symbols: [
        {
          symbol: "D(t)",
          meaning: "Proper separation on a chosen constant-cosmic-time slice.",
        },
        { symbol: "a(t)", meaning: "Dimensionless scale factor." },
        { symbol: "χ", meaning: "Fixed comoving separation." },
        { symbol: "H", meaning: "Fractional expansion rate at that time." },
        { symbol: "z", meaning: "Cosmological redshift." },
      ],
      explanation:
        "These relationships describe homogeneous expansion and wavelength stretching. They do not determine a(t); a physical cosmological model is needed for that.",
      example:
        "If a grows from 0.5 to 1, a fixed comoving pair doubles its proper separation, and light emitted at a = 0.5 has z = 1 when received at a = 1.",
    },
    insight:
      "Expansion can give every typical observer the same recession pattern without assigning anyone a special central position.",
    misconceptions: [
      {
        myth: "The Big Bang was an explosion from one point into empty space.",
        correction:
          "The hot Big Bang model describes an evolving universe; it does not require a central explosion site or surrounding empty container.",
      },
      {
        myth: "The scale slider predicts the future universe.",
        correction:
          "It demonstrates a geometric relationship. Predicting expansion requires dynamical equations and measured cosmological parameters.",
      },
    ],
    check: {
      question:
        "The scale factor increases from 1 to 1.5. Two comoving points began 8 units apart. What is their new separation?",
      options: ["8 units", "9.5 units", "12 units"],
      answer: 2,
      explanation:
        "Their comoving separation is fixed, so the proper separation is multiplied by 1.5: 8 × 1.5 = 12.",
    },
    sources: [
      {
        title: "NASA: the Big Bang with John Mather",
        url: "https://www.nasa.gov/universe/nasas-james-webb-space-telescope-and-the-big-bang-a-short-qa-with-nobel-laureate-dr-john-mather/",
      },
      {
        title: "NASA: universe overview",
        url: "https://science.nasa.gov/universe/overview/",
      },
      {
        title: "NASA: dark energy and accelerated expansion",
        url: "https://science.nasa.gov/dark-energy/",
      },
    ],
  },
];
