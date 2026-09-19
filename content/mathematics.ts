import type { Topic } from "./types";

export const mathematicsTopics: Topic[] = [
  {
    slug: "pythagoras",
    title: "Pythagoras & the geometry of distance",
    category: "Mathematics",
    subtitle: "Why two perpendicular journeys determine one diagonal.",
    minutes: 12,
    level: "Start here",
    accent: "amber",
    intro:
      "The Pythagorean theorem says that, in a flat plane, a right triangle has a precise relationship between its three side lengths: the square of the longest side equals the sum of the squares of the other two. It is a statement about areas that also becomes a machine for calculating distances. Understanding its proof is a first experience of something central to mathematics: a convincing pattern can be replaced by an argument that covers every allowed case.",
    why: "This relationship connects a drawing on paper to computer graphics, navigation, vectors, and the geometry underlying physical models. You will learn both how to use it and how to recognize when its assumptions are missing.",
    prerequisites: [
      "Multiplication and square roots",
      "Area of a square and a triangle",
      "A right angle is 90 degrees",
    ],
    terms: [
      {
        term: "Right triangle",
        definition: "A triangle with one angle exactly equal to 90 degrees.",
      },
      {
        term: "Hypotenuse",
        definition:
          "The side opposite the right angle; it is the longest side.",
      },
      {
        term: "Legs",
        definition: "The two sides that meet at the right angle.",
      },
      {
        term: "Theorem",
        definition:
          "A mathematical statement established by a logical proof from stated assumptions.",
      },
      {
        term: "Euclidean plane",
        definition:
          "The ordinary flat geometry in which straight lines and distances behave as they do on an ideal sheet of paper.",
      },
    ],
    sections: [
      {
        title: "The idea before the symbols",
        paragraphs: [
          "Imagine walking east and then north. The total length of your walk is the sum of the two segments. But a straight path from your starting point to your destination is shorter. The theorem calculates that straight distance because east and north are perpendicular. It does not say that distances add as squares in every situation: the right angle is doing essential work.",
          "Draw a square outward from each side of a right triangle. If the legs have lengths a and b, their square areas are a² and b². If the diagonal has length c, its square has area c². The claim is that the two smaller areas together exactly fill an area equal to the larger square. Notice the units: metres become square metres when squared, then taking a square root returns a length.",
        ],
      },
      {
        title: "A name with a much longer history",
        paragraphs: [
          "The theorem carries the name of Pythagoras, the ancient Greek thinker, but the relationship was known in Babylonian mathematics long before his lifetime. Surviving tablets show sophisticated work with right-triangle relationships. Historical evidence does not justify a simple story in which one person suddenly invented the entire idea. Euclid later presented a proof in his Elements, within a systematic framework of geometry.",
          "There is an important distinction between knowing particular numerical examples, possessing a useful computational rule, and presenting a general proof. A list of successful triangles is evidence of a pattern, but it cannot establish what happens for every positive length. This lesson uses a rearrangement argument; it is a modern teaching route, not a claim to reconstruct exactly what Pythagoras personally did.",
        ],
      },
      {
        title: "A proof by keeping track of area",
        paragraphs: [
          "Step 1: take any right triangle with positive legs a and b and hypotenuse c. Make four identical copies. Arrange them inside a square of side a + b, placing their right angles at the four outer corners and their hypotenuses around an empty central region. Each outer edge is divided into segments of lengths a and b, so the proposed outer square really has the claimed side length.",
          "Step 2: establish what the central region is. Its four edges are copies of the hypotenuse, so all have length c. At each central corner the adjacent acute triangle angles add to 90 degrees, because the two acute angles of a right triangle sum to 90 degrees. The remaining central angle is therefore 180 − 90 = 90 degrees. Equal edges and right angles make the central region a square, not merely a shape that looks like one.",
          "Step 3: count the outer area in two ways. Directly, it is (a + b)². By its pieces, it is four triangle areas plus the central square: 4(ab/2) + c². Thus a² + 2ab + b² = 2ab + c². Subtract the common 2ab from both sides and obtain a² + b² = c². The lengths were arbitrary, which is why this proves a general theorem instead of one diagram.",
        ],
      },
      {
        title: "Calculate, interpret, and check",
        paragraphs: [
          "Suppose a rectangular garden is 8 metres wide and 15 metres long. Its diagonal splits it into two right triangles. Compute c² = 8² + 15² = 64 + 225 = 289, then c = 17 metres. We take the positive square root because c denotes a length. A quick sanity check helps: 17 is longer than either side, but shorter than walking along both edges, which would take 23 metres.",
          "You can also work backward. If a 13-unit hypotenuse belongs to a right triangle with one 5-unit leg, the other leg satisfies b² = 169 − 25 = 144, so b = 12. In coordinates, the legs become horizontal and vertical differences: between (2, 1) and (10, 16), those differences are 8 and 15. The same computation gives 17. Repeating the idea with a third perpendicular direction gives the familiar three-dimensional distance formula.",
        ],
      },
      {
        title: "Where the theorem stops",
        paragraphs: [
          "A triangle with an angle of 60 degrees between two sides needs a different relationship, the law of cosines. A large triangle drawn on the curved surface of Earth also requires care: distances along its surface are not straight distances through a flat plane. And the spacetime interval of relativity uses a different geometric structure, including a sign difference between time and space terms. Recognizing these boundaries makes the theorem more useful, not less.",
          "In the interactive diagram, change both legs and compare the three square areas. The picture helps you see what the equation describes. Floating-point calculations and a finite number of slider positions cannot themselves prove the theorem; the area argument above supplies the general reason. Try explaining why the central shape is a square without pointing at the screen. That is the moment the animation becomes understanding.",
        ],
      },
    ],
    equation: {
      expression: "a² + b² = c²",
      symbols: [
        {
          symbol: "a, b",
          meaning: "Perpendicular leg lengths, in the same units",
        },
        { symbol: "c", meaning: "Hypotenuse length" },
      ],
      explanation:
        "The areas of the two leg squares add to the area of the hypotenuse square, assuming Euclidean geometry and a right angle.",
      example: "For legs 8 and 15: c = √(64 + 225) = √289 = 17.",
    },
    insight:
      "A proof explains why every allowed triangle works; a visualization makes the relationship easier to notice.",
    misconceptions: [
      {
        myth: "The formula applies to any triangle.",
        correction:
          "The two legs must meet at a right angle in Euclidean geometry.",
      },
      {
        myth: "Pythagoras was certainly the first person to know it.",
        correction:
          "Babylonian evidence predates him; the familiar name does not settle historical priority.",
      },
    ],
    check: {
      question: "A right triangle has legs 6 and 8. What is its hypotenuse?",
      options: ["14", "10", "100"],
      answer: 1,
      explanation:
        "6² + 8² = 36 + 64 = 100. The hypotenuse is √100 = 10, not the squared length 100.",
    },
    sources: [
      {
        title: "University of St Andrews: Babylonian Pythagoras",
        url: "https://mathshistory.st-andrews.ac.uk/HistTopics/Babylonian_Pythagoras/",
      },
      {
        title: "Wolfram MathWorld: Pythagorean theorem and proofs",
        url: "https://mathworld.wolfram.com/PythagoreanTheorem.html",
      },
    ],
    visual: "pythagoras",
  },
  {
    slug: "calculus",
    title: "Calculus: change & accumulation",
    category: "Mathematics",
    subtitle: "The surprising bridge between a speedometer and an odometer.",
    minutes: 14,
    level: "Build intuition",
    accent: "amber",
    intro:
      "Calculus studies two questions: how quickly is a quantity changing right now, and how much has accumulated over an interval? Differentiation answers the first; integration answers the second. Their relationship is the fundamental theorem of calculus. This is not a list of formulas to memorize. It is a language for connecting local behavior, such as your velocity at one moment, to global behavior, such as your total change in position.",
    why: "Physics describes motion and fields through rates of change. Quantum mechanics uses differential equations for state evolution. Learning this bridge makes many intimidating equations feel like statements about change and totals.",
    prerequisites: [
      "Basic algebra and functions",
      "Slope as rise divided by run",
      "Area of a rectangle",
    ],
    terms: [
      {
        term: "Function",
        definition: "A rule assigning an output to each permitted input.",
      },
      {
        term: "Limit",
        definition:
          "A precise description of what values approach as the input approaches a chosen value.",
      },
      {
        term: "Derivative",
        definition:
          "The limiting rate of change of a function, where that limit exists.",
      },
      {
        term: "Definite integral",
        definition:
          "A signed accumulation over an interval, defined here through a limit of sums.",
      },
      {
        term: "Antiderivative",
        definition:
          "A function whose derivative equals the function you started with.",
      },
    ],
    sections: [
      {
        title: "Why a single instant is a problem",
        paragraphs: [
          "If a cyclist moves 20 metres in 4 seconds, the average velocity is 5 metres per second. That does not tell us whether the cyclist accelerated, stopped, or changed direction. To ask about velocity at a particular time, compare positions over a shorter interval around it. The quotient still needs two different times. Calculus asks whether those average velocities approach one stable value as the interval shrinks toward zero.",
          "We never divide by a time interval equal to zero. Instead, we calculate with nonzero intervals and examine their limiting behavior. This distinction matters: replacing a small number by zero too early produces an undefined fraction. A derivative is not a rough measurement over a very small interval; it is an exact limit when the mathematical model has that limit.",
        ],
      },
      {
        title: "The people behind the language",
        paragraphs: [
          "Isaac Newton and Gottfried Wilhelm Leibniz developed powerful forms of calculus in the seventeenth century, drawing on a much longer history of area, tangent, and motion problems. Newton emphasized changing quantities and motion; Leibniz developed notation whose descendants remain standard. Earlier contributors included Fermat, Cavalieri, and Barrow. Later mathematicians refined the foundations using precise definitions of limits.",
          "This history is useful because the subject did not begin as symbol manipulation. People wanted to calculate tangents, areas, and moving trajectories. The notation became a compact way to preserve those ideas. When an expression looks intimidating, translate it back into a question: am I asking for a rate at a point, or a total across an interval?",
        ],
      },
      {
        title: "Derive one derivative yourself",
        paragraphs: [
          "Let f(x) = x². Step 1: compare the outputs at x and x + h, where h is nonzero. The average slope is [f(x + h) − f(x)]/h. Step 2: expand the square to obtain [(x² + 2xh + h²) − x²]/h. The x² terms cancel, leaving (2xh + h²)/h = 2x + h.",
          "Step 3: let h approach zero. The remaining expression approaches 2x, so f′(x) = 2x. At x = 3, the instantaneous slope is 6. This does not mean f(3) is 6: its value is 9. A function value and its derivative answer different questions. With physical units, the difference is even clearer: position might be measured in metres while its time derivative is measured in metres per second.",
        ],
      },
      {
        title: "Build an integral from small pieces",
        paragraphs: [
          "Suppose water enters a tank at a changing rate r(t). Divide the time interval into short pieces. For each piece, multiply a sampled flow rate by the duration. Add those approximate volumes. As the maximum piece width tends to zero, a continuous rate function produces a definite integral. This construction explains both the multiplication inside each contribution and the addition across contributions.",
          "An integral is signed accumulation. If r(t) becomes negative, water is leaving, and that contribution reduces the total change. Similarly, integrating velocity gives displacement, not automatically total distance traveled. For distance, integrate speed, the magnitude of velocity. Areas below a horizontal axis count negatively in a signed integral, even though ordinary geometric area is never negative.",
        ],
      },
      {
        title: "Why the two operations undo each other",
        paragraphs: [
          "Assume f is continuous on an interval and define A(x) as its integral from a fixed starting point a to x. Step 1: A(x + h) − A(x) is precisely the accumulation over the short interval from x to x + h. Step 2: dividing that accumulation by h gives the average value of f over that interval. Step 3: continuity means nearby values approach f(x), so their average also approaches f(x). Therefore A′(x) = f(x) at interior points.",
          "Now let F be any antiderivative of f. Since both F and A have derivative f, their difference has derivative zero. By the mean value theorem that difference is constant on the interval. Evaluating at the endpoints gives ∫ₐᵇ f(x) dx = F(b) − F(a). This is the bridge: an accumulation defined by many tiny contributions can be computed using an antiderivative and two endpoint values.",
        ],
      },
      {
        title: "A worked example and practical boundaries",
        paragraphs: [
          "Take the flow rate r(t) = 2t litres per second, with t measured numerically in seconds, from t = 0 to t = 3. An antiderivative is t² with the corresponding volume units. The accumulated volume is 3² − 0² = 9 litres. A graph gives the same answer: the region is a triangle of base 3 seconds and height 6 litres per second. Its area is one half times 3 times 6, again 9 litres.",
          "Our continuity assumptions are sufficient for this version of the theorem; more advanced versions allow broader cases. Corners can prevent a derivative from existing, and sampled data introduces approximation and noise. In the visualization, compare a smooth curve with its local slope or rectangle approximation. Increasing resolution can improve an estimate, but a computer plot does not replace checking the mathematical conditions or the physical model.",
        ],
      },
    ],
    equation: {
      expression: "f′(x) = limₕ→₀ [f(x + h) − f(x)] / h",
      symbols: [
        { symbol: "f′(x)", meaning: "Instantaneous rate of change at x" },
        { symbol: "h", meaning: "A nonzero input change that approaches zero" },
      ],
      explanation:
        "Average changes become a derivative if their limit exists. The fundamental theorem connects this local operation to integration.",
      example:
        "For f(x) = x², the quotient simplifies to 2x + h, whose limit is 2x.",
    },
    insight:
      "Differentiation reads a local rate; integration gathers rates into a total change.",
    misconceptions: [
      {
        myth: "An integral always gives positive area.",
        correction:
          "A definite integral gives signed accumulation; contributions can cancel.",
      },
      {
        myth: "A derivative means divide by zero.",
        correction:
          "The difference quotient uses nonzero increments; only afterward do we take a limit.",
      },
    ],
    check: {
      question:
        "If position is s(t) = t² metres, what is velocity at t = 3 seconds?",
      options: [
        "9 metres per second",
        "6 metres per second",
        "3 metres per second",
      ],
      answer: 1,
      explanation:
        "The derivative of t² is 2t, so the instantaneous velocity is 6 metres per second.",
    },
    sources: [
      {
        title: "University of St Andrews: the rise of calculus",
        url: "https://mathshistory.st-andrews.ac.uk/HistTopics/The_rise_of_calculus/",
      },
      {
        title: "UBC CLP textbook: the fundamental theorem",
        url: "https://math.libretexts.org/Bookshelves/Calculus/CLP-2_Integral_Calculus_%28Feldman_Rechnitzer_and_Yeager%29/01%3A_Integration/1.03%3A_The_Fundamental_Theorem_of_Calculus",
      },
      {
        title: "OpenStax: Calculus Volume 1",
        url: "https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume1-OP.pdf",
      },
    ],
    visual: "calculus",
  },
  {
    slug: "euler",
    title: "Euler’s formula & complex numbers",
    category: "Mathematics",
    subtitle: "How an imaginary exponent becomes a real rotation.",
    minutes: 14,
    level: "Go deeper",
    accent: "amber",
    intro:
      "Euler’s formula, e^(iθ) = cos θ + i sin θ, connects exponential functions to circular motion. Its famous special case is e^(iπ) + 1 = 0. The formula is beautiful because it makes several branches of mathematics speak the same language. To understand it, we first need to understand what a complex number represents and what exponentiation means when the exponent is not an ordinary counting number.",
    why: "Complex numbers describe phase in quantum amplitudes, oscillations in electrical circuits, and frequency components in sound. This formula makes changing phase behave like moving a point around a circle.",
    prerequisites: [
      "Squares and basic algebra",
      "Sine and cosine as coordinates on a circle",
      "Helpful: the idea of an infinite convergent sum",
    ],
    terms: [
      {
        term: "Imaginary unit i",
        definition:
          "A number defined by i² = −1; it extends the real number system.",
      },
      {
        term: "Complex number",
        definition:
          "A number a + ib, represented by the point (a, b) in a plane.",
      },
      {
        term: "Modulus",
        definition:
          "The distance √(a² + b²) of a complex number from the origin.",
      },
      {
        term: "Radian",
        definition:
          "An angle measure equal to arc length divided by circle radius; one full turn is 2π radians.",
      },
      {
        term: "Power series",
        definition:
          "An infinite sum of powers with specified coefficients; its use requires convergence.",
      },
      {
        term: "Factorial n!",
        definition: "The product 1 × 2 × … × n, with 0! defined as 1.",
      },
    ],
    sections: [
      {
        title: "Make room for a new direction",
        paragraphs: [
          "On the real number line, squaring any number gives a nonnegative result, so x² = −1 has no real solution. Introduce i with i² = −1 and allow numbers a + ib. This does not make ordinary arithmetic disappear. Addition works component by component, and multiplication uses distributivity together with the rule i² = −1. The word imaginary is a historical label, not a verdict that these numbers are useless or fictitious.",
          "Represent a + ib as a point with horizontal coordinate a and vertical coordinate b. Multiply it by i: i(a + ib) = −b + ia. The point (a, b) becomes (−b, a), a counterclockwise quarter turn. Multiplying by i twice makes a half turn, so i² = −1 now has a geometric interpretation. Negative multiplication reverses direction; imaginary multiplication adds the possibility of rotation.",
        ],
      },
      {
        title: "What Euler connected",
        paragraphs: [
          "Leonhard Euler’s name is attached to the connection between exponentials and trigonometric functions. The surrounding ideas emerged through a broader development of complex numbers, series, and trigonometry. It is more helpful to see the formula as a bridge between these established structures than as a mysterious coincidence involving five famous constants.",
          "For real inputs, exponential growth changes magnitude. For a purely imaginary input iθ, the complex exponential has magnitude one and changes direction. A general exponent a + ib combines the two behaviors: e^(a + ib) = e^a(cos b + i sin b). The real part of the exponent scales the distance from the origin; the imaginary part sets the angle. This is why complex exponentials can model both oscillation and decay.",
        ],
      },
      {
        title: "A derivation with an explicit foundation",
        paragraphs: [
          "We take the power-series definition exp(z) = 1 + z + z²/2! + z³/3! + … for complex z, together with the usual sine and cosine series in radians. These are standard analytic constructions. For any fixed z, the ratio of successive absolute term sizes is |z|/(n + 1), which tends to zero. Thus the exponential series converges absolutely for every complex input. Absolute convergence permits the separation into odd and even terms used below.",
          "Step 1: substitute z = iθ, with θ real. Step 2: use the repeating powers i, −1, −i, 1 to simplify. The even-power terms become 1 − θ²/2! + θ⁴/4! − … . The odd-power terms become i times [θ − θ³/3! + θ⁵/5! − …]. Step 3: recognize the first bracket as cos θ and the second as sin θ. Therefore e^(iθ) = cos θ + i sin θ.",
          "This derivation relies on the established series representations of sine and cosine, not merely on a few matching terms. Proving those representations from their geometric definitions is an additional calculus result. Infinite expressions demand that care: similar-looking initial terms do not guarantee equal functions. Here the complete convergent series supply the equality for every real θ.",
        ],
      },
      {
        title: "Recover the famous identity",
        paragraphs: [
          "Set θ = π, which is a half turn. On the unit circle, the horizontal coordinate is −1 and the vertical coordinate is 0. Euler’s formula therefore gives e^(iπ) = −1 + i·0 = −1. Move the −1 to the other side to get e^(iπ) + 1 = 0. The identity is one particular angle in a formula describing every angle.",
          "As a more general worked example, choose θ = π/3, or 60 degrees. Then e^(iπ/3) = 1/2 + i√3/2. Its squared modulus is 1/4 + 3/4 = 1, so it lies on the unit circle. Multiplying it by itself adds the two angles, giving e^(2iπ/3) = −1/2 + i√3/2. You can confirm that result with ordinary algebra using i² = −1.",
        ],
      },
      {
        title: "Why physics keeps using it",
        paragraphs: [
          "Think of a rotating pointer and watch its horizontal shadow. The pointer rotates steadily, while the shadow oscillates as a cosine. A complex exponential keeps both perpendicular components together, which makes adding and transforming oscillations convenient. In quantum mechanics a state amplitude can carry a complex phase; relative phases help determine interference when amplitudes combine. Probabilities come from squared magnitudes, not from reading the imaginary coordinate as a probability.",
          "The circular picture is an interpretation of the formula, not a physical claim that every quantum state is a literal spinning object. Likewise, a single global phase does not change ordinary measurement probabilities, while relative phase between components can matter. In the visualization, follow the point and its projections, then predict the result after a quarter, half, or full turn before moving the control.",
        ],
      },
      {
        title: "Keep the units and the logic straight",
        paragraphs: [
          "The exponent in this formula uses radians. Entering 180 as though it means half a turn produces the wrong answer unless you convert degrees to radians first. The formula is periodic for real θ: adding 2π changes the angle by a full rotation and leaves the point unchanged. None of this implies that every complex exponential has magnitude one; a nonzero real part in the exponent changes the magnitude.",
          "A rotating display gives intuition and numerical checks. It cannot establish an identity at infinitely many angles by drawing enough frames. Keep three layers separate: arithmetic defines the number system, analysis justifies the convergent series, and geometry helps interpret the result. Together they turn the famous equation from something to admire into something you can actually use.",
        ],
      },
    ],
    equation: {
      expression: "e^(iθ) = cos θ + i sin θ",
      symbols: [
        {
          symbol: "e",
          meaning: "The base of the natural exponential, approximately 2.71828",
        },
        { symbol: "i", meaning: "The imaginary unit with i² = −1" },
        { symbol: "θ", meaning: "A real angle measured in radians" },
      ],
      explanation:
        "A purely imaginary exponential gives the complex point on the unit circle at angle θ.",
      example: "At θ = π/2, cosine is 0 and sine is 1, so e^(iπ/2) = i.",
    },
    insight:
      "Complex exponentials package rotation and oscillation into one algebraic object.",
    misconceptions: [
      {
        myth: "Imaginary numbers cannot describe real phenomena.",
        correction:
          "They are a consistent mathematical language for components, rotations, and phase; predictions remain testable.",
      },
      {
        myth: "The animated circle proves the formula.",
        correction:
          "The visualization illustrates it; a proof needs justified mathematical steps such as the convergent-series argument.",
      },
    ],
    check: {
      question: "Where does e^(iπ) sit on the complex plane?",
      options: [
        "At i, one quarter turn",
        "At −1, one half turn",
        "At 1, no turn",
      ],
      answer: 1,
      explanation: "π radians is a half turn. cos π = −1 and sin π = 0.",
    },
    sources: [
      {
        title: "MIT OpenCourseWare: power series and Euler’s formula",
        url: "https://ocw.mit.edu/courses/res-18-005-highlights-of-calculus-spring-2010/ae6e5ed1d5d607fce5bcd59fd2c589a5_MITRES18_05S10_Power_Series_Eulers_Formula.pdf",
      },
      {
        title: "Jeremy Orloff: Euler’s formula",
        url: "https://math.libretexts.org/Bookshelves/Analysis/Complex_Variables_with_Applications_%28Orloff%29/01%3A_Complex_Algebra_and_the_Complex_Plane/1.06%3A_Euler%27s_Formula",
      },
      {
        title: "AudioLabs: the complex exponential function",
        url: "https://www.audiolabs-erlangen.de/resources/MIR/FMP/C2/C2_ExponentialFunction.html",
      },
    ],
    visual: "euler",
  },
  {
    slug: "bayes",
    title: "Bayes’ theorem & learning from evidence",
    category: "Mathematics",
    subtitle:
      "Why a convincing signal is not the same as a certain conclusion.",
    minutes: 13,
    level: "Build intuition",
    accent: "amber",
    intro:
      "Bayes’ theorem is a rule for updating probabilities when evidence arrives. It relates the probability of evidence under a hypothesis to the probability of the hypothesis given that evidence. Those sound similar, but they answer different questions. Once you learn to separate them, you can reason more clearly about noisy sensors, scientific observations, classification systems, and everyday uncertainty.",
    why: "Scientific learning combines existing information with new observations. Bayes’ theorem makes that bookkeeping explicit, while also exposing the assumptions and base rates that an impressive-sounding accuracy number can hide.",
    prerequisites: [
      "Fractions and percentages",
      "Probability as a number between zero and one",
      "Multiplication and addition",
    ],
    terms: [
      {
        term: "Prior",
        definition:
          "The probability assigned to a hypothesis before incorporating the evidence currently under discussion.",
      },
      {
        term: "Likelihood",
        definition:
          "The probability of the observed evidence if a particular hypothesis is true.",
      },
      {
        term: "Posterior",
        definition:
          "The updated probability of the hypothesis after conditioning on the evidence.",
      },
      {
        term: "Conditional probability",
        definition:
          "Probability evaluated within the cases where another event holds.",
      },
      {
        term: "Base rate",
        definition:
          "The overall frequency or probability of a condition before selecting cases by a signal.",
      },
      {
        term: "False positive",
        definition:
          "A positive signal when the condition it is supposed to indicate is absent.",
      },
    ],
    sections: [
      {
        title: "Two questions that are easy to confuse",
        paragraphs: [
          "Imagine a fictional factory sensor checking whether a ceramic tile has a crack. One question asks: among cracked tiles, how often does the sensor raise an alert? Another asks: among alerted tiles, how many are cracked? The first starts by selecting cracked tiles; the second starts by selecting alerts. Since those are different groups, their fractions need not agree.",
          "This is the reason conditional probability uses an ordering. P(A | B) means the probability of A given B, with B specifying the restricted group. The vertical bar can be read as “among cases where.” That reading is often more useful than treating the notation as an opaque formula. An alert changes which group we are looking at; it does not magically remove mistakes made by the sensor.",
        ],
      },
      {
        title: "The historical idea",
        paragraphs: [
          "Thomas Bayes studied an inverse probability problem: reasoning from observed outcomes toward an unknown underlying probability. His work was published after his death through Richard Price in 1763. Pierre-Simon Laplace subsequently made major contributions to the broader development of inverse probability. Modern Bayesian statistics extends these ideas into a large framework, rather than being identical to one historical essay.",
          "The theorem itself follows from the basic rules of probability. Using it in a real problem requires more than substituting numbers: you need a justified model for the prior and the likelihood. Different modeling choices can produce different answers even when everybody performs the arithmetic correctly. Making those choices visible is part of the method.",
        ],
      },
      {
        title: "Derive it by counting the same overlap twice",
        paragraphs: [
          "Let H denote a hypothesis and E an evidence event. Assume P(H) > 0 and P(E) > 0 so the conditional probabilities in this derivation are defined. By definition, P(H | E) = P(H and E)/P(E). This says that within the evidence group, the proportion also satisfying the hypothesis is the overlap divided by the whole evidence group.",
          "We can count the same overlap in the other direction: P(E | H) = P(H and E)/P(H). Multiply by P(H) to obtain P(H and E) = P(E | H)P(H). Substitute into the first expression. The result is Bayes’ theorem: P(H | E) = P(E | H)P(H)/P(E). No assumption of independence between H and E was used.",
          "For a binary hypothesis, the evidence can arise either with H or without H. These cases are disjoint and exhaustive, so P(E) = P(E | H)P(H) + P(E | not H)P(not H). This denominator matters. It counts every route to the observed evidence, including false alarms, and normalizes the hypothesis weight into a probability.",
        ],
      },
      {
        title: "Work through a fictional factory",
        paragraphs: [
          "Suppose exactly 2% of tiles in our illustrative model are cracked. The sensor alerts on 90% of cracked tiles and also on 5% of intact tiles. Consider an imagined batch of 10,000 tiles at those proportions. There are 200 cracked tiles and 9,800 intact ones. Of the cracked tiles, 180 trigger an alert; of the intact tiles, 490 trigger an alert. Altogether there are 670 alerts.",
          "Select a tile from the alert group. Only 180 of those 670 are cracked, so the updated probability is 180/670, approximately 26.9%. Algebra gives the same result: (0.90 × 0.02)/[(0.90 × 0.02) + (0.05 × 0.98)]. The alert is useful: it raises the probability from 2% to about 27%. But useful evidence is not certainty, and the 90% detection rate is not the answer to the reversed question.",
          "These counts are an illustrative expected-frequency construction, not a report of a measured factory. In a random real batch, the observed counts would fluctuate. The probability model describes those uncertainties; it does not promise that every batch contains precisely the expected number of cracked tiles or sensor mistakes.",
        ],
      },
      {
        title: "How evidence changes belief",
        paragraphs: [
          "Here an alert is 18 times as likely under the cracked hypothesis as under the intact hypothesis, because 0.90/0.05 = 18. This likelihood ratio multiplies the prior odds. Before the alert the odds are 2 to 98; afterward they become 36 to 98, equivalent to 180 to 490. Converting odds back to probability means dividing the hypothesis weight by the total weight, not simply multiplying the prior probability by 18.",
          "Changing the base rate changes the answer even if the sensor stays identical. In a batch from a damaged production line, cracks might be more common; the same alert would then be stronger grounds for expecting a crack. In the visualization, keep detection and false-alarm rates fixed while changing the prior. Watch how the composition of the alerted group changes. That group, rather than the sensor’s marketing headline, is the answer you need.",
        ],
      },
      {
        title: "Applications and limits",
        paragraphs: [
          "Astronomers compare models of observations, classifiers combine evidence about categories, and engineers interpret unreliable measurements. In each case the quality of the result depends on the model and data. A prior is not automatically an arbitrary guess: it can come from previous measurements, a population frequency, or a stated modeling assumption. Sensitivity analysis asks whether reasonable alternative priors materially change the conclusion.",
          "Be careful when updating repeatedly. Two copies of the same alert are not two independent pieces of evidence. To multiply likelihoods as separate contributions, you need the relevant conditional-independence assumption, or a joint model that accounts for dependence. Bayes’ theorem also does not establish causation by itself. It organizes uncertainty within assumptions; it cannot rescue inaccurate rates, omitted hypotheses, or biased observations.",
        ],
      },
    ],
    equation: {
      expression: "P(H | E) = P(E | H) P(H) / P(E)",
      symbols: [
        { symbol: "H", meaning: "A hypothesis, such as a tile being cracked" },
        { symbol: "E", meaning: "Observed evidence, such as a sensor alert" },
        { symbol: "P(H)", meaning: "Prior probability before this evidence" },
        {
          symbol: "P(E | H)",
          meaning: "Likelihood of the evidence under the hypothesis",
        },
        {
          symbol: "P(H | E)",
          meaning: "Posterior probability after the evidence",
        },
      ],
      explanation:
        "Weight the hypothesis by how well it predicts the evidence, then divide by the total probability of that evidence. P(E) must be positive.",
      example:
        "With a 2% crack rate, 90% detection, and 5% false alerts, P(crack | alert) = 0.018/0.067 ≈ 26.9%.",
    },
    insight:
      "Ask what fraction of the evidence group supports the hypothesis, not just how often the hypothesis produces the evidence.",
    misconceptions: [
      {
        myth: "90% detection means an alert is 90% likely to be correct.",
        correction:
          "That reverses the conditional. The posterior also depends on the base rate and false-positive rate.",
      },
      {
        myth: "Repeated identical evidence always multiplies confidence.",
        correction:
          "Correlated or duplicated evidence requires a joint model; independence cannot be assumed automatically.",
      },
    ],
    check: {
      question:
        "If cracks become rarer while sensor behavior stays the same, what happens to P(crack | alert)?",
      options: [
        "It increases",
        "It stays fixed at the detection rate",
        "It decreases",
      ],
      answer: 2,
      explanation:
        "With fewer actual cracks, a larger fraction of alerts come from intact tiles. The posterior falls even though detection performance is unchanged.",
    },
    sources: [
      {
        title: "UC Berkeley: conditional probability and Bayes’ rule",
        url: "https://www.stat.berkeley.edu/pub/users/stark/SticiGui/Text/probabilityAxioms.htm",
      },
      {
        title: "University of St Andrews: Thomas Bayes",
        url: "https://mathshistory.st-andrews.ac.uk/Biographies/Bayes/",
      },
    ],
    visual: "bayes",
  },
];
