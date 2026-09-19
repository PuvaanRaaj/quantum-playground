import type { Topic } from "./types";

export const quantumTopics: Topic[] = [
  {
    slug: "interference",
    title: "Quantum interference",
    category: "Quantum mechanics",
    subtitle: "Why two possible paths can make an outcome disappear.",
    minutes: 12,
    level: "Start here",
    accent: "violet",
    intro:
      "Quantum mechanics predicts the results of experiments using probability amplitudes. Interference is what happens when amplitudes for indistinguishable alternatives combine: some outcomes become more likely and others become less likely.",
    why: "Interference is the first useful bridge from familiar waves to quantum physics. It explains why a superposition is more than ordinary uncertainty, and supplies the mechanism behind many quantum algorithms.",
    prerequisites: [
      "Probabilities run from 0 to 1.",
      "A wave has a size and a phase: where it is in its cycle.",
    ],
    terms: [
      {
        term: "Amplitude",
        definition:
          "A complex number used to calculate a measurement probability. It is not itself a probability.",
      },
      {
        term: "Phase",
        definition:
          "The angle of an amplitude, like the direction of an arrow in a plane. Relative phase can change interference.",
      },
      {
        term: "Superposition",
        definition:
          "A state expressed as a weighted sum of other states, with amplitudes that can interfere when measured appropriately.",
      },
      {
        term: "Coherence",
        definition:
          "A stable phase relationship between alternatives that allows interference to remain visible.",
      },
      {
        term: "Born rule",
        definition:
          "The rule that converts an amplitude into a probability by taking its squared magnitude.",
      },
    ],
    sections: [
      {
        title: "The problem that ordinary particles could not explain",
        paragraphs: [
          "Imagine throwing individual pebbles toward a wall with two openings. Count arrivals behind each opening separately, then open both. For ordinary independent pebbles, the two contributions simply add. Light does something more surprising: opening a second route can make certain locations darker. Thomas Young’s work helped establish the wave account of light. Later quantum experiments made the puzzle sharper: detections arrive as individual localized events, yet repeated events build an interference pattern. The challenge is to predict both the discrete detections and the organized pattern without pretending that an electron is a tiny water wave.",
          "Quantum theory developed through contributions from many people, including Planck, Einstein, de Broglie, Heisenberg, Schrödinger and Born. Einstein’s light-quantum proposal was important to its history; he was not simply an opponent of everything quantum. Born supplied the probabilistic interpretation of the wavefunction. The central practical move is to calculate amplitudes for experimental alternatives, combine them when those alternatives are indistinguishable, and only then calculate a detection probability. This reverses the ordinary habit of calculating separate probabilities first and adding them. The order matters because amplitudes possess phase, whereas probabilities do not.",
        ],
      },
      {
        title: "An arrow picture you can calculate with",
        paragraphs: [
          "Picture an amplitude as an arrow drawn on paper. Its length describes its magnitude; its direction describes its phase. Two arrows pointing the same way produce a longer arrow when added. Two equal arrows pointing in opposite directions cancel. Neither arrow has a negative probability: probability is calculated afterward from the length of their sum, squared. The cancellation means that a particular detector outcome has zero probability in that ideal arrangement. It does not mean the particle has been destroyed. In a complete lossless apparatus, probability is redistributed to other possible outcomes, and the probabilities still sum to one.",
          "A two-path interferometer turns this picture into an experiment. A first beam splitter prepares alternatives associated with two paths. One path accumulates a controllable phase relative to the other. A second beam splitter recombines them so each output can receive contributions from both paths. The detector probabilities then depend on the relative phase. If you remove the recombination step and simply measure the path, changing the phase alone does not change the path probabilities. This distinction is crucial: phase is not a hidden extra amount of particle. It matters through the way a later measurement combines alternatives.",
        ],
      },
      {
        title: "From one click to a trustworthy pattern",
        paragraphs: [
          "Set an ideal balanced interferometer to a relative phase of zero using this lab’s output convention. Detector zero is certain. At half a cycle, detector one is certain. At a quarter cycle, the detectors are equally likely. A single click cannot establish a fifty-fifty distribution; it is only one sample. Run a hundred trials and you might get 47 and 53 rather than exactly 50 and 50. Run more trials and the relative frequencies generally settle toward the predicted probabilities. This is sampling variation, not necessarily a fault in the theory or an unexpected interaction with the device.",
          "Now imagine the environment records which route was taken. A path can become correlated with a detector, a scattered photon, or some other physical degree of freedom. When those records make the routes distinguishable and we ignore the record, the original interference is reduced or lost. A human does not need to look at a screen. In this lab, coherence is summarized by one visibility parameter. Lowering it softens the contrast between bright and dark outputs. That parameter can represent several different practical effects; it does not identify the microscopic cause of decoherence in a particular experiment.",
        ],
      },
      {
        title: "What this model teaches—and what it leaves out",
        paragraphs: [
          "Interference has been observed with light and material particles. The agreement concerns statistics from specified experimental arrangements, rather than an animation of an objectively observed path between source and detector. Interpretations of quantum mechanics disagree about what deeper description, if any, should accompany those predictions. The calculation you learn here does not require choosing an interpretation. Be especially cautious with phrases such as “the particle knows both paths are open.” They replace a mathematical rule with an imagined intention. A better question is which alternatives the apparatus preserves coherently and which measurement it eventually performs.",
          "Our visualization is a balanced two-mode model, not a spatial solution for an actual double-slit screen. It omits diffraction envelopes, detailed optical components, detector efficiency, losses, and the full state of the environment. Animated dots illustrate trials; they are not reconstructed particle trajectories. Start by predicting an output before moving a control, then explain the result using amplitude addition. Once you can distinguish phase from probability and distinguish a coherent superposition from a random mixture, you have the foundation needed for more realistic wave mechanics, quantum circuits, and the question of why measuring a system can alter what happens next.",
        ],
      },
    ],
    equation: {
      expression: "P(0) = (1 + V cos φ) / 2;   P(1) = 1 − P(0)",
      symbols: [
        {
          symbol: "P(0)",
          meaning: "Probability of detector zero in this output convention.",
        },
        {
          symbol: "V",
          meaning:
            "Visibility from 0 to 1; 1 preserves full interference contrast.",
        },
        {
          symbol: "φ",
          meaning: "Relative phase between the two paths, in radians.",
        },
      ],
      explanation:
        "For balanced paths, amplitude addition produces a cosine dependence. The visibility factor reduces the interference term without changing the total probability.",
      example:
        "With V = 0.8 and φ = π/3, cos φ = 0.5, so P(0) = (1 + 0.4)/2 = 0.7. In 100 trials the expected count is 70 at detector zero, but the observed count can fluctuate.",
    },
    insight:
      "Add amplitudes before squaring when alternatives remain indistinguishable. Add probabilities for alternatives recorded as distinguishable.",
    misconceptions: [
      {
        myth: "Interference requires a conscious observer.",
        correction:
          "A physical interaction that records path information can change interference without anyone inspecting it.",
      },
      {
        myth: "A 70% probability guarantees exactly 70 clicks out of 100.",
        correction: "It gives an expected count. Finite samples fluctuate.",
      },
    ],
    check: {
      question:
        "The phase changes, but the paths are measured before recombination. What should you expect in this balanced model?",
      options: [
        "The path probabilities stay equal.",
        "All particles disappear.",
        "The most likely path must alternate.",
      ],
      answer: 0,
      explanation:
        "Relative phase becomes visible through interference in an appropriate measurement. Direct path measurement does not recombine the amplitudes.",
    },
    sources: [
      {
        title: "Feynman Lectures: Quantum Behavior",
        url: "https://www.feynmanlectures.caltech.edu/III_01.html",
      },
      {
        title: "Feynman Lectures: Probability Amplitudes",
        url: "https://www.feynmanlectures.caltech.edu/III_03.html",
      },
    ],
    visual: "interference",
  },
  {
    slug: "uncertainty",
    title: "The uncertainty principle",
    category: "Quantum mechanics",
    subtitle:
      "A limit on which sharp properties a quantum state can possess together.",
    minutes: 13,
    level: "Build intuition",
    accent: "violet",
    intro:
      "The position–momentum uncertainty relation says that a quantum state cannot have arbitrarily narrow distributions of both position and momentum. It is a structural property of the theory, not merely a complaint about imperfect instruments.",
    why: "It explains why confining a particle changes its possible motion and why an atomic electron cannot be described as a stationary dot at one precise location.",
    prerequisites: [
      "An average summarizes a distribution.",
      "Standard deviation describes how widely outcomes are spread.",
    ],
    terms: [
      {
        term: "Position",
        definition:
          "A coordinate specifying where a measurement detects a particle.",
      },
      {
        term: "Momentum",
        definition:
          "A quantity related to motion; at nonrelativistic speeds, momentum is mass times velocity.",
      },
      {
        term: "Standard deviation",
        definition:
          "The square root of the average squared distance from the mean; a measure of spread.",
      },
      {
        term: "Wave packet",
        definition:
          "A localized wavefunction made by combining waves with different spatial frequencies.",
      },
      {
        term: "ħ (h-bar)",
        definition:
          "Planck’s constant divided by 2π, about 1.055 × 10⁻³⁴ joule seconds.",
      },
    ],
    sections: [
      {
        title: "What Heisenberg’s question was really about",
        paragraphs: [
          "Classical mechanics encourages a simple picture: if you know an object’s exact location and momentum now, its equations determine the later motion. During the development of quantum mechanics, that familiar description stopped fitting the mathematical rules and experimental evidence. Werner Heisenberg explored the limits of simultaneously assigning quantities such as position and momentum in 1927. The precise standard-deviation relation commonly taught today was established in mathematical form by Earle Kennard, with broader operator relations developed by others. It is useful to separate the historical microscope thought experiment from the exact claim about the spreads in a prepared state.",
          "Suppose a laboratory prepares many particles in the same quantum state. Measure the position of some, and independently measure the momentum of others. Each collection produces a distribution. The uncertainty relation places a lower bound on the product of their standard deviations. It is not a rule saying that you must measure both quantities on every individual particle, nor that the experimentalist forgot to calibrate something. Better calibration can remove extra technical noise, but it cannot produce a state whose intrinsic distributions violate the position–momentum bound within ordinary quantum mechanics.",
        ],
      },
      {
        title: "Why localization requires a mixture of wavelengths",
        paragraphs: [
          "Consider a perfectly regular sine wave extending without end. Its spatial frequency is sharply specified, but nothing in it singles out one location. To build a localized bump, combine waves with different spatial frequencies. They reinforce near the center and cancel far away. A narrower bump requires a wider range of frequencies. This is a general Fourier relationship: similar tradeoffs appear between the duration of a sound and the sharpness of its frequency. Quantum mechanics connects that mathematical relationship to physical momentum through p = ħk, where k is the spatial angular frequency of the wave.",
          "The analogy with sound is helpful but has limits. A sound waveform describes a physical pressure variation. A quantum wavefunction supplies probability amplitudes, from which position and momentum distributions are calculated. The familiar wave tradeoff becomes a constraint on the statistics of physical measurements. A position wavefunction and a momentum wavefunction describe the same quantum state in different representations. They are not two independent lists that you can choose arbitrarily. Changing the state to narrow one distribution changes what is possible for the other. This is why the uncertainty relation concerns preparation as well as measurement.",
        ],
      },
      {
        title: "Understanding the inequality rather than memorizing it",
        paragraphs: [
          "The symbols Δx and Δp mean standard deviations, not the position and momentum themselves. A particle may have a very large average momentum with a small momentum spread. Likewise, shifting the center of a position distribution across the room does not change its width. The inequality says that the product of the widths cannot fall below ħ/2. It does not say that the product must always equal that value. Many states have a larger product. A specially prepared Gaussian state with suitable phase is an example that reaches the lower bound, making it useful for an introductory illustration.",
          "For a numerical example, choose a position standard deviation of one nanometer, or 10⁻⁹ meters. The momentum standard deviation must then be at least about 5.27 × 10⁻²⁶ kilogram meters per second. For an electron, dividing by its mass gives a velocity spread of about 57,900 meters per second in the nonrelativistic approximation. This is a spread, not a mandatory average speed in one direction. Repeating the estimate for a much larger mass produces a much smaller velocity spread. The very small value of Planck’s constant helps explain why the constraint is usually unobtrusive for everyday objects.",
        ],
      },
      {
        title: "How to read the visualization honestly",
        paragraphs: [
          "Use the width control to make the position distribution narrower and predict what happens to momentum before looking. In a minimum-uncertainty Gaussian illustration, the other distribution broadens in just the amount needed to keep the product fixed. That particular behavior comes from the chosen family of states. It is not proof that every quantum state is Gaussian or that every physical compression process preserves minimum uncertainty. A real trapping experiment involves forces, time evolution, interactions and measurement resolution. Those may increase either spread, introduce correlations, or create a very different shape from the clean curves shown here.",
          "Confinement and diffraction provide practical settings in which the tradeoff matters, but a cartoon is not an experiment. Our model displays distributions and an analytic relation; it does not track an electron’s unknowable precise trajectory or simulate a measuring microscope. It also does not establish the stronger slogan “nothing can ever be known.” Some observables can be sharply specified together, and repeated experiments can determine a distribution extremely accurately. The achievement of the principle is its precision: it tells us which pair of quantities is constrained, how spread is defined, and exactly where the lower bound lies.",
        ],
      },
    ],
    equation: {
      expression: "Δx · Δp ≥ ħ / 2",
      symbols: [
        {
          symbol: "Δx",
          meaning: "Standard deviation of the position distribution.",
        },
        {
          symbol: "Δp",
          meaning:
            "Standard deviation of the momentum distribution in the same direction.",
        },
        {
          symbol: "ħ",
          meaning: "Reduced Planck constant, approximately 1.055 × 10⁻³⁴ J s.",
        },
      ],
      explanation:
        "Position and momentum are connected by a Fourier transform and represented by noncommuting operators. Their distribution widths therefore obey this bound.",
      example:
        "If Δx = 1 × 10⁻⁹ m, then Δp ≥ 1.055 × 10⁻³⁴ / (2 × 10⁻⁹) ≈ 5.27 × 10⁻²⁶ kg m/s. Halving Δx doubles the minimum allowed Δp.",
    },
    insight:
      "Uncertainty is about the spread of outcomes in a state, not how confused the person doing the experiment feels.",
    misconceptions: [
      {
        myth: "Better instruments can remove all quantum uncertainty.",
        correction:
          "They can reduce instrumental noise, but not the state-preparation bound.",
      },
      {
        myth: "Position times momentum must equal ħ/2.",
        correction:
          "The relation uses standard deviations, and the product can be larger than its lower bound.",
      },
    ],
    check: {
      question:
        "In a minimum-uncertainty Gaussian state, halving the position spread does what to the momentum spread?",
      options: ["Halves it.", "Doubles it.", "Leaves it unchanged."],
      answer: 1,
      explanation:
        "For this family the product equals ħ/2. Reducing one factor by two requires increasing the other by two.",
    },
    sources: [
      {
        title: "Feynman Lectures: Wave and Particle Viewpoints",
        url: "https://www.feynmanlectures.caltech.edu/III_02.html",
      },
      {
        title: "Feynman Lectures: Amplitudes and Position",
        url: "https://www.feynmanlectures.caltech.edu/III_16.html",
      },
    ],
    visual: "uncertainty",
  },
  {
    slug: "entanglement",
    title: "Entanglement & Bell’s theorem",
    category: "Quantum mechanics",
    subtitle:
      "When the whole has a quantum description its parts cannot possess separately.",
    minutes: 14,
    level: "Go deeper",
    accent: "violet",
    intro:
      "Entanglement is a property of a joint quantum state: its predictions cannot be reproduced by assigning independent pure states to its parts. Bell’s theorem shows how certain entangled-state correlations differ from an important class of local hidden-variable explanations.",
    why: "This is where Einstein’s questions about reality became testable mathematics, and where quantum physics becomes a resource for information processing.",
    prerequisites: [
      "A qubit has two outcomes in a chosen measurement basis.",
      "Correlation means outcomes vary together; it does not automatically explain why.",
    ],
    terms: [
      {
        term: "Qubit",
        definition:
          "A quantum system with a two-dimensional state space, such as two selected energy levels.",
      },
      {
        term: "Entangled state",
        definition:
          "A joint state that cannot be written as a product state; for mixed states, as a probabilistic mixture of product states.",
      },
      {
        term: "Measurement basis",
        definition:
          "The set of distinguishable outcomes selected by a measurement, analogous to choosing an axis for spin.",
      },
      {
        term: "Correlation",
        definition: "A statistical relation between paired outcomes.",
      },
      {
        term: "Bell inequality",
        definition:
          "A bound on correlations implied by specified local hidden-variable assumptions.",
      },
    ],
    sections: [
      {
        title: "Einstein’s challenge was deeper than mysterious coincidence",
        paragraphs: [
          "In 1935, Albert Einstein, Boris Podolsky and Nathan Rosen argued that quantum mechanics might not provide a complete description of physical reality. Their argument concerned what could be predicted for one system by measuring another distant system, under assumptions about locality and reality. Erwin Schrödinger recognized the importance of the resulting joint-state structure and introduced the term entanglement. These were serious questions about what a physical theory describes, not objections based simply on finding something strange. The later story is also not accurately summarized as Einstein misunderstanding the theory he helped bring into existence.",
          "Ordinary correlated objects provide a useful starting comparison. Put one red card and one blue card into sealed envelopes and separate them. Opening one tells you the other color immediately, without sending a signal. That alone is unremarkable: the colors were assigned in advance. Likewise, seeing two quantum bits always agree in one chosen measurement basis does not by itself distinguish entanglement from a classical shared random bit. To find the specifically quantum difference, we need choices of measurement settings and a comparison of correlations across those choices, not just one impressive-looking sequence of matching outcomes.",
        ],
      },
      {
        title: "A joint state with no separate pure-state description",
        paragraphs: [
          "Consider the Bell state written (|00⟩ + |11⟩)/√2. The notation |00⟩ labels the outcome in which both qubits are zero in the computational basis, and |11⟩ labels both being one. The amplitudes have equal size, so measurement in that basis gives each matching pair with probability one half. The joint state cannot be expressed as one pure state for Alice’s qubit multiplied by another pure state for Bob’s. Knowing the complete joint state therefore does not give each person a separate definite outcome. Each local sequence looks random, while the pair has a precisely specified relationship.",
          "The plus sign also matters. This is a coherent quantum superposition of two joint alternatives, not merely a lottery selecting either pair before the measurement. If both sides change to a suitable different basis, interference between joint amplitudes affects the correlations. A classical mixture that matches the computational-basis statistics can fail in the other basis. For the Bell state named here, matching measurements along the Z and X axes give matching outcomes. Other states, including the singlet state often used in discussions of spin, have different correlation signs. Always specify the state and settings before saying the particles agree or disagree.",
        ],
      },
      {
        title: "Bell turned the argument into an experimental question",
        paragraphs: [
          "John Bell showed in 1964 that local hidden-variable models obey constraints that quantum predictions can violate. A widely used version is the CHSH inequality: Alice chooses one of two settings, Bob chooses one of two settings, and each measurement produces either +1 or −1. Average the products for each setting pair and combine four such correlations into a quantity S. Under the relevant locality and measurement-independence assumptions, its absolute value is at most two. Quantum mechanics permits a value as large as 2√2 for appropriate states and settings. The settings are essential: matching in one basis is insufficient.",
          "Experiments associated with John Clauser, Alain Aspect, Anton Zeilinger and many other researchers tested these predictions using entangled systems. Later experiments addressed major loopholes involving detection and separation of measurement events. The result constrains the family of explanations covered by the theorem. It does not justify every popular claim about consciousness, fate or instant communication. A simulation can calculate the ideal quantum value or sample artificial outcomes, but it cannot independently confirm nature’s behavior. Real tests require physical devices, independently chosen settings, statistical analysis and careful treatment of the assumptions needed to interpret the data.",
        ],
      },
      {
        title: "Why entanglement is not a faster-than-light messenger",
        paragraphs: [
          "Alice cannot choose whether her individual result will be zero or one. If Bob only examines his own measurements, his local outcome distribution does not reveal Alice’s chosen measurement or result. The interesting correlation becomes available when they compare their records through an ordinary communication channel. Quantum teleportation likewise needs classical communication in addition to entanglement. This is the operational reason that the phenomenon does not give us a faster-than-light messaging device. Updating a conditional prediction after learning a result should not be confused with observing a controllable signal travel instantaneously across space.",
          "Read the visualization as a model of a specified ideal joint state and measurement rule. If it displays paired coin-like outcomes, those represent samples, not tiny colored instructions traveling inside the particles. If it displays a correlation curve, that curve assumes ideal preparation and measurement; real noise generally reduces the observed contrast. A full Bell experiment needs four setting combinations and a statistical estimate, rather than one adjustable pair alone. Your first learning goal is to separate three claims: ordinary agreement can be classical, entanglement concerns the joint state, and Bell violation concerns correlations across carefully chosen measurements. Keeping those distinct makes the mystery more precise rather than less interesting.",
        ],
      },
    ],
    equation: {
      expression: "|Φ⁺⟩ = (|00⟩ + |11⟩) / √2;   |S| ≤ 2 (local models)",
      symbols: [
        {
          symbol: "|Φ⁺⟩",
          meaning: "One particular maximally entangled two-qubit Bell state.",
        },
        {
          symbol: "|00⟩, |11⟩",
          meaning: "Joint computational-basis states with matching outcomes.",
        },
        {
          symbol: "1/√2",
          meaning:
            "Each amplitude’s magnitude; squaring gives probability 1/2.",
        },
        {
          symbol: "S",
          meaning:
            "A signed combination of four correlations: E(a,b) + E(a,b′) + E(a′,b) − E(a′,b′).",
        },
      ],
      explanation:
        "The state predicts matching computational-basis outcomes. Testing a Bell inequality requires additional measurement choices. Appropriate ideal quantum settings achieve |S| = 2√2 ≈ 2.828.",
      example:
        "If the four correlations are 1/√2, 1/√2, 1/√2 and −1/√2 in the stated order, S = 4/√2 ≈ 2.828. This exceeds 2; it cannot arise from the class of local models satisfying the Bell-test assumptions.",
    },
    insight:
      "The surprising feature is not agreement at a distance. It is the pattern of correlations across different measurement choices.",
    misconceptions: [
      {
        myth: "Entanglement lets Alice send an instant message.",
        correction:
          "Bob’s local statistics do not reveal Alice’s choice. Comparing results still requires communication.",
      },
      {
        myth: "Matching outcomes in one basis prove entanglement.",
        correction:
          "A shared classical random bit can do that. Additional measurements are needed.",
      },
    ],
    check: {
      question:
        "What distinguishes a Bell test from merely checking whether two bits match?",
      options: [
        "Sending one bit very far away.",
        "Combining correlations from different measurement settings.",
        "Asking a human to watch both detectors.",
      ],
      answer: 1,
      explanation:
        "Bell inequalities constrain the joint pattern across measurement choices, under stated assumptions.",
    },
    sources: [
      {
        title: "Nobel Prize: Entanglement and Bell tests",
        url: "https://www.nobelprize.org/prizes/physics/2022/popular-information/",
      },
      {
        title: "IBM Quantum: Entanglement in Action",
        url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/entanglement-in-action/introduction",
      },
    ],
    visual: "entanglement",
  },
  {
    slug: "schrodinger",
    title: "The Schrödinger equation",
    category: "Quantum mechanics",
    subtitle:
      "The rule that turns a quantum state now into a quantum state later.",
    minutes: 14,
    level: "Go deeper",
    accent: "violet",
    intro:
      "The Schrödinger equation describes how a quantum state evolves in time when its Hamiltonian is specified. For a simple particle, it connects the changing wavefunction to kinetic and potential energy.",
    why: "It connects interference and probability to a predictive theory of motion, bound states, atomic energy levels and tunneling.",
    prerequisites: [
      "A derivative describes a rate of change.",
      "The squared magnitude of a wavefunction gives a probability density.",
    ],
    terms: [
      {
        term: "Wavefunction ψ",
        definition:
          "A complex-valued representation of the state; for one particle in one dimension it assigns an amplitude to each position.",
      },
      {
        term: "Hamiltonian Ĥ",
        definition: "The energy operator that generates time evolution.",
      },
      {
        term: "Potential energy V",
        definition:
          "Energy associated with the particle’s location or configuration in the specified model.",
      },
      {
        term: "Eigenstate",
        definition:
          "A state that an operator maps to a multiple of itself. An energy eigenstate has a definite energy.",
      },
      {
        term: "Probability density",
        definition:
          "Probability per unit length, area or volume. Integrating over a region gives its probability.",
      },
    ],
    sections: [
      {
        title: "From atomic puzzles to wave mechanics",
        paragraphs: [
          "Atoms emit and absorb particular colors instead of an arbitrary continuum. Early quantum models introduced discrete energies, but a more general framework was needed to predict them and to handle situations beyond the simplest atom. Building on the emerging idea of matter waves, Erwin Schrödinger developed wave mechanics in 1926. Werner Heisenberg had developed a different mathematical formulation, and the approaches were shown to be connected. Max Born’s probabilistic interpretation clarified how the wavefunction relates to observed outcomes. No single equation appeared in isolation: the modern framework grew from several contributions, competing pictures, and detailed comparison with experiments.",
          "The equation’s task is easier to understand if you separate preparation, evolution and measurement. First describe an initial state. Next specify the Hamiltonian, which encodes the model’s energy and interactions. The Schrödinger equation predicts the later state. Finally use the measurement rules to calculate outcome probabilities. For an isolated system with a specified Hamiltonian, state evolution is deterministic: the same initial state produces the same later state. That does not imply that every individual measurement result is predetermined by the state. Deterministic evolution of amplitudes and probabilistic measurement predictions coexist in the same framework.",
        ],
      },
      {
        title: "Reading the equation one piece at a time",
        paragraphs: [
          "In compact form, iħ ∂ψ/∂t = Ĥψ. The derivative on the left describes the rate at which the state changes. The Hamiltonian on the right acts on that state. The imaginary unit i is not decorative: complex phases are essential to the evolution and its interference effects. For a single nonrelativistic particle in one spatial dimension, the Hamiltonian can be written as a term involving the second spatial derivative plus the potential V(x). The second derivative measures spatial curvature of the wavefunction. This kinetic-energy term is why differently shaped wavefunctions can evolve differently even in empty space.",
          "The wavefunction itself is not a graph of a particle’s material height. Its real and imaginary parts are components of a probability amplitude. The squared magnitude |ψ(x,t)|² is a probability density. To find the probability of detection between two positions, integrate that density over the interval. At one exact mathematical point the probability is normally zero for a smooth continuous distribution; a detector measures a finite region. Normalization requires the total probability over all positions to be one. When the Hamiltonian has the required mathematical properties, the equation preserves that normalization during the ideal closed-system evolution.",
        ],
      },
      {
        title: "Why a box has discrete energy levels",
        paragraphs: [
          "Place an ideal particle in a one-dimensional box with infinitely high walls. The allowed stationary wavefunctions vanish at the boundaries. Like standing waves on a string fixed at both ends, only certain spatial patterns fit: one half-wave, two half-waves, and so on. Each corresponds to a different energy. The analogy is mathematical, not a claim that an electron is a vibrating string. In this ideal model the energy grows as the square of the mode number. The lowest allowed energy is not zero because a completely flat, nonzero wavefunction cannot satisfy both the boundary conditions and normalization.",
          "For an electron in a box one nanometer wide, the lowest energy is about 0.376 electronvolts. The second level is four times as large, about 1.504 electronvolts. Their difference is about 1.128 electronvolts. These values follow from the ideal boundaries, the electron’s mass and Planck’s constant; changing the width changes the spectrum. Doubling the width divides every level’s energy by four. This gives you a useful prediction to make before adjusting a control. Real atoms have different potentials and three spatial dimensions, so these box numbers are not a hydrogen spectrum.",
        ],
      },
      {
        title: "Stationary does not mean the mathematics stops",
        paragraphs: [
          "An energy eigenstate gains a time-dependent overall phase, while its probability density stays unchanged. This is why it is called stationary: measurable position statistics can remain fixed even though the complex wavefunction evolves. A superposition of different energies acquires changing relative phases, so its probability density can change with time. If an animation shows a real-part wave oscillating, do not automatically interpret those oscillations as probability moving back and forth. Compare the density as well. Distinguishing an overall phase from relative phase connects this lesson directly to what you learned about interference in the two-path experiment.",
          "The visual model should be read as a small selection of analytic states in an ideal potential, not a general solver for arbitrary chemistry. Infinite walls are an approximation; finite barriers allow tails and sometimes tunneling. The simple nonrelativistic equation omits relativistic corrections, particle creation and a full description of quantum fields. Interactions with an environment also require more than isolated pure-state evolution if you only track the subsystem. The equation does not by itself settle the interpretation of measurement. Its success is practical and precise: within its domain, an initial state and an energy model yield testable predictions that connect a mathematical wavefunction to laboratory statistics.",
        ],
      },
    ],
    equation: {
      expression: "iħ ∂ψ/∂t = Ĥψ;   Eₙ = n²π²ħ² / (2mL²)",
      symbols: [
        { symbol: "ψ", meaning: "The quantum state’s wavefunction." },
        { symbol: "i", meaning: "The imaginary unit, with i² = −1." },
        { symbol: "Ĥ", meaning: "The Hamiltonian energy operator." },
        {
          symbol: "Eₙ",
          meaning: "Energy of mode n in the ideal infinite box.",
        },
        { symbol: "n", meaning: "A positive integer: 1, 2, 3 and so on." },
        { symbol: "m, L", meaning: "Particle mass and box width." },
        { symbol: "ħ", meaning: "Reduced Planck constant." },
      ],
      explanation:
        "The first equation governs state evolution generally. The second is one solution for the allowed energies in a one-dimensional infinite square well, not a universal energy formula.",
      example:
        "For an electron and L = 1 nm, E₁ ≈ 0.376 eV and E₂ = 4E₁ ≈ 1.504 eV. Doubling L gives E₁ ≈ 0.094 eV because energy scales as 1/L².",
    },
    insight:
      "A stationary probability density can hide a changing phase. Different energy components become visible through their changing relative phases.",
    misconceptions: [
      {
        myth: "The wavefunction is the physical outline of an electron.",
        correction:
          "It represents probability amplitudes. Its interpretation is not the same as a material wave height.",
      },
      {
        myth: "A stationary state has no time dependence at all.",
        correction:
          "Its overall phase evolves while its probability density remains fixed.",
      },
    ],
    check: {
      question:
        "If the ideal box width doubles, what happens to its ground-state energy?",
      options: [
        "It doubles.",
        "It becomes one quarter as large.",
        "It stays the same.",
      ],
      answer: 1,
      explanation:
        "The ideal-box spectrum is proportional to 1/L². Doubling L multiplies the energy by 1/4.",
    },
    sources: [
      {
        title: "Feynman Lectures: Amplitudes and Position",
        url: "https://www.feynmanlectures.caltech.edu/III_16.html",
      },
      {
        title: "Schrödinger’s Nobel Lecture",
        url: "https://www.nobelprize.org/uploads/2017/07/schrodinger-lecture.pdf",
      },
      {
        title: "Feynman Lectures: The Hydrogen Atom",
        url: "https://www.feynmanlectures.caltech.edu/III_19.html",
      },
    ],
    visual: "schrodinger",
  },
];
