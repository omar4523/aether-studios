export const pricingTiers = [
  {
    id: "student",
    name: "Student",
    priceMonthly: 69,
    priceOneTime: 89,
    subtitle: "Perfect for students & final-year projects",
    popular: false,
    badge: null,
    features: [
      "Source code (React, Python, AI/ML)",
      "35+ page formatted thesis/report",
      "Defense slides & viva prep guide",
      "48-hour express delivery option",
    ],
    buttonText: "Get Started →",
    buttonStyle: "secondary",
  },
  {
    id: "business",
    name: "Business",
    priceMonthly: 249,
    priceOneTime: 299,
    subtitle: "For small businesses & creators",
    popular: true,
    badge: "Most Popular",
    features: [
      "Full website or digital store",
      "Modern UI/UX with 3D product previews",
      "Stripe / Apple Pay & database setup",
      "Priority SLA & revision support",
    ],
    buttonText: "Get Started →",
    buttonStyle: "primary",
  },
  {
    id: "professional",
    name: "Professional",
    priceMonthly: 499,
    priceOneTime: 599,
    subtitle: "For startups & growing teams",
    popular: false,
    badge: null,
    features: [
      "Full-stack SaaS or mobile iOS/Android app",
      "Custom generative AI / LLM pipelines",
      "1-3 weeks delivery with staging portal",
      "100% intellectual property & code ownership",
    ],
    buttonText: "Get Started →",
    buttonStyle: "secondary",
  }
];

export const blogCategories = [
  { id: "all", label: "All" },
  { id: "tutorials", label: "Tutorials" },
  { id: "tips", label: "Tips" },
  { id: "case-studies", label: "Case Studies" },
  { id: "news", label: "News" },
];

export const blogPostsData = [
  {
    id: 0,
    title: "The Calorie Paradox: Why Your 1-Hour Workout Can't Undo 15 Hours of Stillness",
    subtitle: "Anthropologist Herman Pontzer's research on the Hadza reveals why continuous micro-movement matters far more than gym intensity.",
    category: "case-studies",
    categoryLabel: "Case Studies",
    date: "Sep 2026",
    publishDate: "September 22, 2026",
    image: "/blog_ai_tools.jpg",
    readTime: "5 min read",
    snippet: "Why hunter-gatherers burn the same daily calories as desk workers — and how 2-minute movement interruptions reboot metabolic health.",
    author: {
      name: "Dr. Herman Pontzer & Aether Research",
      role: "Evolutionary Biology & Physiology",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Synthesizing groundbreaking metabolic research, doubly labeled water trials, and modern longevity science."
    },
    tags: ["Metabolism", "Health", "Longevity", "Science"],
    content: [
      {
        type: "lead",
        text: "You finish your workout, towel around your neck, and feel like you've earned something. An hour of real effort. You did the hard part. So for the rest of the day, you sit — at your desk, in your car, on your couch — and you don't think twice about it, because you already paid for it this morning."
      },
      {
        type: "paragraph",
        text: "Now rewind 50,000 years. A man walks six hours across open ground, digging roots, tracking animals, carrying water. He has never once 'exercised' in his life. There is no separate hour for it, no towel, no reward feeling afterward. Moving is just what a day is."
      },
      {
        type: "callout",
        title: "The Core Question",
        text: "If this man moves for six hours and you move for one, why does the science say his body burns almost exactly the same total calories per day as yours? Where does all that extra effort go? And if the calories come out the same, why is his heart, his blood pressure, and his blood sugar so much healthier than yours?"
      },
      {
        type: "heading",
        title: "1. The Doubly Labeled Water Proof"
      },
      {
        type: "paragraph",
        text: "Your brain is already fighting this — more movement should mean more calories burned. That feels obvious. But the proof came from strapping isotopes onto actual hunter-gatherers and measuring exactly what their bodies did with every calorie for two weeks straight.\n\nIn 2012, anthropologist Herman Pontzer traveled to Tanzania to measure the Hadza using doubly labeled water, a technique that tracks total energy expenditure with precision. The Hadza were active for hours every day, far beyond a typical office worker. So guess: how much more did their bodies burn per day than sedentary adults in the US? Most assume dramatically higher. But it came back almost identical — Hadza men and women burned roughly the same total calories as adults who barely walk at all."
      },
      {
        type: "paragraph",
        text: "This wasn't a fluke. The Tsimane of Bolivia showed the same pattern, and by 2016 Pontzer had compiled data across a dozen populations. The number stayed flat no matter how active the group was. Somewhere inside the body, extra movement was being paid for by cutting spending elsewhere, not by burning more overall."
      },
      {
        type: "heading",
        title: "2. The Continuous Movement Rhythm"
      },
      {
        type: "paragraph",
        text: "So let me walk you through a day. You wake up and there's no decision about 'working out.' You squat to tend a fire, walk to water, crouch to dig roots, bend to check a snare. None of it is intense. None of it has a start and an end. It's continuous, low-effort motion — your body never sits still for more than twenty or thirty minutes at a stretch."
      },
      {
        type: "paragraph",
        text: "And here's the part nobody tells you: despite burning the same total energy, the Hadza showed far better blood pressure, cholesterol, and insulin sensitivity, the exact markers exercise programs try to improve. Same calories. Completely different results. So if it isn't the total number, something else is doing the work."
      },
      {
        type: "heading",
        title: "3. The Two-Minute Interruption Solution"
      },
      {
        type: "paragraph",
        text: "In 2012, physiologist David Dunstan asked a simple question: if you sit for hours, does it matter whether you interrupt it? His team had people sit for a long stretch, then repeated it broken up with just two minutes of light walking every twenty minutes, no extra total exercise added. Blood sugar and insulin response improved substantially in the interrupted condition. The problem was never just how much you moved — it was how long you sat without moving at all."
      },
      {
        type: "bullets",
        items: [
          "Set a timer for every 25 to 30 minutes and stand up for two minutes.",
          "Take one phone call a day on your feet instead of in a chair.",
          "Park at the far end of the lot instead of the closest spot.",
          "Swap one short elevator ride for the stairs."
        ]
      },
      {
        type: "paragraph",
        text: "None of it needs a membership, a schedule, or a towel — the two minutes matter more than you'd expect, because it's the interruption, not the intensity, your metabolism responds to.\n\nModern life didn't remove movement from your day by accident. Chairs, cars, and elevators each felt like progress, and each one quietly deleted the low-level motion your body ran on all day long. The hour you schedule at the gym genuinely helps, but it was never built to undo fifteen hours of stillness — the two-minute interruptions are what closes that other gap."
      },
      {
        type: "paragraph",
        text: "You sit for fifteen hours and call one workout balance. They never sat for fifteen minutes and never called any of it exercise. You chase a calorie count on a screen. They never counted a single one, and their blood pressure still beat yours. You earn your rest with a session at the gym. Their whole day already was motion, so rest, when it came, actually was rest.\n\nYou burn almost exactly the calories they did, and carry markers of health nowhere close to theirs. Two minutes every half hour won't make you a hunter-gatherer. But it's the one piece of their day you can actually put back into yours, starting with your next twenty-five minutes in that chair."
      }
    ],
    takeaways: [
      "Total daily energy expenditure is constrained; extra movement causes the body to reallocate energy rather than burn more total calories.",
      "Hunter-gatherers burn roughly the same calories as desk workers, but have superior cardiovascular and metabolic markers.",
      "Two minutes of light walking every 25–30 minutes substantially reboots insulin sensitivity and blunts glucose spikes.",
      "The goal is not higher gym intensity, but eliminating uninterrupted sedentary stillness."
    ]
  },
  {
    id: 1,
    title: "Getting Started with Next.js 15: The Complete Guide",
    subtitle: "A practical, production-tested roadmap for constructing blazingly fast full-stack web applications with React Server Components.",
    category: "tutorials",
    categoryLabel: "Tutorials",
    date: "Sep 2026",
    publishDate: "September 18, 2026",
    image: "/blog_nextjs_guide.jpg",
    readTime: "5 min read",
    snippet: "Master the fundamentals of Next.js 15 App Router, React Server Components, streaming SSR, and optimized asset delivery.",
    author: {
      name: "Alex Rivers",
      role: "Lead Systems Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      bio: "10+ years engineering high-throughput distributed web systems and React architectures."
    },
    tags: ["Next.js", "React 19", "Server Components", "Performance"],
    content: [
      {
        type: "lead",
        text: "Next.js 15 represents the biggest evolutionary leap in the React ecosystem since hooks. With asynchronous Request APIs, partial pre-rendering (PPR), and zero-overhead Server Components, web applications can now deliver native-level speeds with minimal client JavaScript payload."
      },
      {
        type: "heading",
        title: "1. The Server Component Paradigm"
      },
      {
        type: "paragraph",
        text: "Traditionally, React applications hydrated the entire document on the client. With Next.js 15, components render on the server by default, streaming HTML chunks down to the browser as data resolves. This reduces bundle size to almost zero for content-heavy pages."
      },
      {
        type: "code",
        language: "tsx",
        code: `// app/dashboard/page.tsx
import { Suspense } from 'react';
import { MetricsGrid, MetricsSkeleton } from '@/components/Metrics';

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics Overview</h1>
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsGrid />
      </Suspense>
    </div>
  );
}`
      },
      {
        type: "heading",
        title: "2. Turbocharged Turbopack & Fast Refresh"
      },
      {
        type: "paragraph",
        text: "Development builds in Next.js 15 now leverage Rust-based Turbopack as the default compiler. Cold server starts drop from seconds to milliseconds, and file updates hot-reload virtually instantly even in repos with tens of thousands of modules."
      },
      {
        type: "callout",
        title: "Pro Engineering Tip",
        text: "Never make an entire page a client component ('use client') just because one button requires interactive state. Isolate interactivity into leaf components to keep the parent tree rendered strictly on the edge server."
      },
      {
        type: "heading",
        title: "3. Summary & Next Steps"
      },
      {
        type: "bullets",
        items: [
          "Always colocate data fetching directly inside the Server Component that consumes it.",
          "Use React Suspense boundaries to prevent slow databases from blocking critical UI.",
          "Leverage image and font optimization APIs to score 99+ on Google Core Web Vitals.",
          "Test edge deployments on Vercel or Cloudflare Pages for ultra-low global latency."
        ]
      }
    ],
    takeaways: [
      "Server Components eliminate unnecessary client bundle bloat.",
      "Turbopack cuts compile and hot-reload times by over 75%.",
      "Partial Pre-Rendering provides the optimal blend of static speed and dynamic personalization."
    ]
  },
  {
    id: 2,
    title: "10 AI Tools to 10x Your Engineering Productivity",
    subtitle: "Beyond ChatGPT: Discover the specialized AI pipelines top engineering teams deploy to write cleaner code and ship 3x faster.",
    category: "tips",
    categoryLabel: "Tips",
    date: "Sep 2026",
    publishDate: "September 15, 2026",
    image: "/blog_ai_tools.jpg",
    readTime: "4 min read",
    snippet: "Discover modern generative AI agents, neural linters, and synthetic test generators that streamline development workflows.",
    author: {
      name: "Elena Rostova",
      role: "AI & ML Research Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      bio: "Researcher specializing in deep learning, LLM code assistants, and generative neural graphs."
    },
    tags: ["AI", "Productivity", "DevTools", "Workflow"],
    content: [
      {
        type: "lead",
        text: "The landscape of AI tooling for developers has evolved far beyond rudimentary autocomplete snippets. In 2026, autonomous agentic assistants, context-aware semantic refactoring engines, and generative test suites can compress weeks of boilerplate engineering into hours."
      },
      {
        type: "heading",
        title: "The Top AI Categories Transforming Dev Teams"
      },
      {
        type: "paragraph",
        text: "Rather than looking for one silver bullet, high-performing developers combine specialized AI engines at every step of the development cycle: planning, coding, reviewing, and synthetic data generation."
      },
      {
        type: "bullets",
        items: [
          "Cursor & Copilot Workspace: Multi-file contextual refactoring and semantic codebase indexing.",
          "Claude 3.5 Sonnet & Gemini 1.5 Pro: Superior reasoning for complex architectural decisions and debugging intricate concurrency issues.",
          "v0 by Vercel: Instant generation of Tailwind CSS and accessible React components from UI descriptions.",
          "Codium & PR-Agent: Automated unit test generation covering edge cases, null checks, and boundary limits.",
          "Supabase AI: Instant SQL migration scripts, schema generators, and row-level security policy synthesis."
        ]
      },
      {
        type: "callout",
        title: "Guardrail Principle",
        text: "Treat AI outputs as junior pull requests. Never blindly commit generated code without verifying type soundness, security posture, and runtime performance."
      }
    ],
    takeaways: [
      "Contextual agents save over 10 hours per week in boilerplate writing.",
      "Automated test synthesis eliminates tedious edge-case manual scaffolding.",
      "Pairing AI generation with strict TypeScript types guarantees output reliability."
    ]
  },
  {
    id: 3,
    title: "How to Build a High-Converting Luxury E-Commerce Store",
    subtitle: "How we engineered a 340% increase in checkout completions using interactive 3D product previews and headless commerce.",
    category: "case-studies",
    categoryLabel: "Case Studies",
    date: "Sep 2026",
    publishDate: "September 12, 2026",
    image: "/blog_ecommerce_strategy.jpg",
    readTime: "10 min read",
    snippet: "Deep dive into sub-second page loads, 3D WebGL product visualizers, cart abandonment triggers, and one-click Stripe checkout.",
    author: {
      name: "Maya Lin",
      role: "Principal UI/UX & 3D Designer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      bio: "Spatial interface designer crafting immersive retail experiences and WebGL product configurators."
    },
    tags: ["E-Commerce", "Shopify Headless", "Three.js", "Conversions"],
    content: [
      {
        type: "lead",
        text: "Online shoppers in 2026 expect instantaneous performance, cinematic product presentation, and effortless payment flow. When luxury streetwear brand Aether Apparel partnered with us, their legacy monolithic store had high bounce rates. Here is how we revolutionized their numbers."
      },
      {
        type: "heading",
        title: "1. 3D WebGL Product Visualizer"
      },
      {
        type: "paragraph",
        text: "Static 2D photos fail to convey texture, fit, and scale. We embedded an interactive Three.js 3D model canvas that allows shoppers to rotate items 360 degrees, customize materials in real-time, and view high-resolution stitching with zero frame drops on mobile."
      },
      {
        type: "heading",
        title: "2. Sub-Second Headless Checkout"
      },
      {
        type: "paragraph",
        text: "By decoupling Shopify's backend and pairing it with a Next.js edge-rendered storefront, page transitions dropped to under 120ms. We integrated Apple Pay, Google Pay, and one-click Stripe Express checkout directly on product pages."
      },
      {
        type: "callout",
        title: "Key Result",
        text: "Mobile checkout abandonment plummeted by 45%, while average order value (AOV) increased from $420 to $720 within the first 60 days of release."
      }
    ],
    takeaways: [
      "Interactive 3D configurators increase on-page engagement time by 320%.",
      "Express one-tap payment options convert mobile buyers 2.4x higher than multi-step forms.",
      "Headless architecture ensures sub-second page loads regardless of catalog volume."
    ]
  },
  {
    id: 4,
    title: "The Future of Web Development in 2026: Spatial, AI & WebGPU",
    subtitle: "From static interfaces to autonomous spatial computing: what frontend engineers need to master to stay relevant in 2026.",
    category: "news",
    categoryLabel: "News",
    date: "Sep 2026",
    publishDate: "September 10, 2026",
    image: "/blog_web_future.jpg",
    readTime: "7 min read",
    snippet: "Explore where frontend architecture is heading: WebGPU spatial computing, zero-bundle edge runtimes, and self-optimizing UX.",
    author: {
      name: "Tariq Al-Mansoor",
      role: "Senior Full-Stack & Cloud Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Cloud systems specialist focused on WebGPU compute shaders, distributed databases, and high-performance WebAssembly."
    },
    tags: ["WebGPU", "Spatial Web", "Cloud", "Future Trends"],
    content: [
      {
        type: "lead",
        text: "The web is transitioning from flat, responsive 2D layouts to spatial, compute-intensive distributed environments. Hardware-accelerated WebGPU is now standard across all major browsers, allowing engineers to run complex neural networks and ray-traced graphics right in the client."
      },
      {
        type: "heading",
        title: "1. WebGPU Replaces WebGL"
      },
      {
        type: "paragraph",
        text: "WebGL served the industry well for over a decade, but its single-threaded CPU overhead severely constrained performance. WebGPU exposes modern GPU compute pipelines directly, granting access to parallel computation, custom compute shaders, and memory bandwidth that rivals native game engines."
      },
      {
        type: "heading",
        title: "2. Autonomous Self-Optimizing Interfaces"
      },
      {
        type: "paragraph",
        text: "Rather than manually designing dozens of A/B test variations, machine learning models running at the edge can dynamically personalize interface hierarchy, button placements, and copy tone based on anonymous user interaction vectors."
      },
      {
        type: "callout",
        title: "Industry Shift",
        text: "The web developer of tomorrow is not just a UI stylist, but a systems orchestrator coordinating GPU shaders, WASM modules, and LLM edge endpoints."
      }
    ],
    takeaways: [
      "WebGPU unlocks console-quality 3D rendering and client-side ML execution.",
      "Edge computing makes regional data locality instant and effortless.",
      "Spatial web standards will redefine e-commerce, education, and SaaS visualization."
    ]
  },
  {
    id: 5,
    title: "The Ultimate Senior Student Capstone & Thesis Defense Checklist",
    subtitle: "How to turn your engineering project into an award-winning academic thesis that impresses examiners and lands dream tech offers.",
    category: "tips",
    categoryLabel: "Tips",
    date: "Sep 2026",
    publishDate: "September 8, 2026",
    image: "/blog_student_guide.jpg",
    readTime: "6 min read",
    snippet: "The exact step-by-step blueprint our students use to secure an A+ grade, pass the viva examination, and publish IEEE citations.",
    author: {
      name: "David Chen",
      role: "Academic Capstone Director",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Mentored over 140+ graduation teams across MIT, Cairo University, and Stanford to score highest departmental honors."
    },
    tags: ["Student Capstone", "Academic Thesis", "IEEE", "Viva Prep"],
    content: [
      {
        type: "lead",
        text: "Every year, thousands of brilliant university engineering and computer science students stumble at the finish line not because their software lacks ambition, but because their academic documentation, architectural diagrams, or oral defense presentations fall short of university rubrics."
      },
      {
        type: "heading",
        title: "The 4 Pillars of a Flawless Capstone Submission"
      },
      {
        type: "paragraph",
        text: "Examiners evaluate projects across structured criteria: conceptual soundness, implementation rigor, academic formatting, and defense confidence. Here is the verified checklist we provide to every student in our Academic Lab:"
      },
      {
        type: "bullets",
        items: [
          "Complete Source Code: Modular, documented, linted, with a comprehensive README detailing local environment setup, environment variables, and Docker instructions.",
          "35+ Page IEEE Formatted Report: Clear problem statement, state-of-the-art literature review, UML class diagrams, database ER schemas, performance benchmarks, and BibTeX citations.",
          "Presentation Deck (12-15 Slides): Problem -> Solution -> Architecture -> Live Demo Video -> Performance Metrics -> Future Work. No walls of text.",
          "Viva Oral Defense Cheat Sheet: Antidotes to the 15 most tricky examiner traps: 'Why did you choose React over Angular?', 'How does your model handle adversarial noise?', 'What is your time complexity?'"
        ]
      },
      {
        type: "callout",
        title: "Student Grant Program",
        text: "Don't let budget constraints prevent you from graduating with top honors. Use code STUDENT40 at Aether Studios for 40% off capstone packages."
      }
    ],
    takeaways: [
      "Rigorous documentation is worth 50% of your graduation grade.",
      "Clear system architecture diagrams make live demonstrations 10x more persuasive.",
      "Rehearsing examiner defense questions guarantees an anxiety-free viva session."
    ]
  },
  {
    id: 6,
    title: "Building Scalable Design Systems with Tailwind CSS & Design Tokens",
    subtitle: "A unified methodology for engineering enterprise design tokens, fluid typography, and dark-mode glassmorphic components.",
    category: "tutorials",
    categoryLabel: "Design",
    date: "Sep 2026",
    publishDate: "September 5, 2026",
    image: "/blog_design_systems.jpg",
    readTime: "5 min read",
    snippet: "Build consistent and scalable design systems with Tailwind CSS, tokens, and components.",
    author: {
      name: "Maya Lin",
      role: "Principal UI/UX & 3D Designer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      bio: "Spatial interface designer crafting immersive retail experiences and WebGL product configurators."
    },
    tags: ["Design Systems", "Tailwind CSS", "UI/UX", "Tokens"],
    content: [
      {
        type: "lead",
        text: "A design system is far more than a Figma component sticker sheet; it is the single source of truth that synchronizes design intent with production code. Using Tailwind CSS with CSS variable tokens allows teams to scale to dozens of apps without visual drift."
      },
      {
        type: "heading",
        title: "1. Tokenizing with CSS Variables"
      },
      {
        type: "paragraph",
        text: "By establishing semantic tokens (such as --color-primary, --surface-glass, and --radius-card) rather than hardcoded hex values, your application can switch themes, brand palettes, or dark/light modes with zero CSS rewrites."
      },
      {
        type: "code",
        language: "css",
        code: `:root {
  --color-primary: 0 242 254; /* Electric Cyan */
  --color-secondary: 168 85 247; /* Neon Violet */
  --surface-ground: 4 6 10;
  --surface-card: 10 15 26;
  --radius-default: 1.25rem;
}

[data-theme="violet"] {
  --color-primary: 168 85 247;
  --color-secondary: 236 72 153;
}`
      },
      {
        type: "heading",
        title: "2. Composable Atomic UI Building Blocks"
      },
      {
        type: "paragraph",
        text: "Build atomic primitives—Buttons, Badges, Modals, and Input Fields—with strict variant props. Enforce consistency through TypeScript interfaces and Tailwind class merging utilities."
      },
      {
        type: "callout",
        title: "Accessibility Note",
        text: "Always verify WCAG AAA contrast ratios when designing dark glassmorphic surfaces against neon accents."
      }
    ],
    takeaways: [
      "Semantic tokens decouple design decisions from rigid component code.",
      "Tailwind with CSS variables allows instant, painless runtime theme switching.",
      "Atomic component contracts prevent regression bugs across large teams."
    ]
  }
];

export const projectTypes = [
  {
    id: "student_capstone",
    name: "Student Capstone / Graduation",
    basePrice: 89,
    baseDays: 2,
    icon: "GraduationCap",
    description: "Full code, 35+ page IEEE documentation, viva presentation slides, and defense prep.",
  },
  {
    id: "landing_store",
    name: "E-Commerce & Digital Store",
    basePrice: 299,
    baseDays: 5,
    icon: "ShoppingBag",
    description: "Shopify or Next.js storefront, 3D product previews, Stripe payments, and mobile optimization.",
  },
  {
    id: "saas_webapp",
    name: "Full-Stack SaaS & Web App",
    basePrice: 599,
    baseDays: 10,
    icon: "Layers",
    description: "Production web application, auth, database, client dashboard, and API integrations.",
  },
  {
    id: "mobile_app",
    name: "Mobile iOS & Android App",
    basePrice: 799,
    baseDays: 14,
    icon: "Smartphone",
    description: "Cross-platform React Native / Expo application with push notifications and offline cache.",
  }
];

export const addOnOptions = [
  {
    id: "academic_report",
    name: "35+ Page IEEE Thesis / Report",
    price: 45,
    days: 1,
    description: "Complete methodology, literature review, UML diagrams, test benchmarks, and BibTeX citations."
  },
  {
    id: "threejs_canvas",
    name: "3D WebGL / Three.js Canvas",
    price: 110,
    days: 3,
    description: "Interactive 3D model visualizer, particle shaders, and spatial mouse-tilt effects."
  },
  {
    id: "ai_pipeline",
    name: "Custom AI / LLM Integration",
    price: 90,
    days: 2,
    description: "OpenAI, Claude, or local PyTorch model inference API endpoints and streaming chat."
  },
  {
    id: "stripe_gateway",
    name: "Stripe / Apple Pay Gateway",
    price: 70,
    days: 1,
    description: "Secure checkout sessions, webhooks, invoice receipts, and multi-currency support."
  },
  {
    id: "admin_cms",
    name: "Admin CMS & Analytics Dashboard",
    price: 80,
    days: 2,
    description: "Role-based management console for tracking orders, users, submissions, and telemetry."
  },
  {
    id: "viva_prep",
    name: "Viva Defense & Examiner Prep Deck",
    price: 35,
    days: 1,
    description: "15-slide defense deck (.pptx) and top 15 examiner trap questions with model answers."
  }
];

export const timelinePaces = [
  {
    id: "standard",
    name: "Standard Meticulous Pace",
    badge: "Included Free",
    priceModifier: 0,
    daysReduction: 0,
  },
  {
    id: "rush",
    name: "Express Rush Delivery",
    badge: "Fast-Track",
    priceModifier: 60,
    daysReduction: 0.4,
  }
];
