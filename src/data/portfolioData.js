export const portfolioData = [
  {
    id: "travel-platform",
    title: "Travel Platform",
    category: "web-apps",
    duration: "Web App • 2 Weeks",
    image: "/ui_travel_platform.jpg",
    multiDeviceImage: "/ui_travel_multi_device.jpg",
    client: "LuxeVoyage Global",
    tagBadges: ["Web App", "Next.js", "Tailwind CSS", "Supabase"],
    description: "A complete travel booking platform that helps users plan their trips from hotels and flights to restaurants and attractions.",
    overview: "The Travel Platform is a full-stack web application that integrates multiple APIs and provides a seamless travel planning experience. Users can search for hotels, flights, restaurants and attractions, create custom itineraries and get real-time weather updates.",
    keyFeatures: [
      "Hotel, flight, restaurant & attraction search",
      "Interactive map & itinerary builder",
      "Real-time weather information",
      "Secure user authentication & Stripe checkout"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Supabase", "Mapbox", "OpenWeather"],
    metrics: "+280% Booking Rate",
    stats: [
      { value: "2 Weeks", label: "Development Time" },
      { value: "100%", label: "On-Time Delivery" },
      { value: "4.9/5", label: "Client Rating" }
    ],
    liveUrl: "https://luxevoyage.aetherstudios.dev",
    deliverables: ["Interactive Flight Engine", "Live World Map", "Stripe Payment Portal", "Admin Dashboard"],
    testimonial: "Aether Studios built our complete travel platform in two weeks flat. Flawless execution and modern design."
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce Store",
    category: "ecommerce",
    duration: "Web App • 1 Week",
    image: "/ui_ecommerce_store.jpg",
    multiDeviceImage: "/ui_ecommerce_multi_device.jpg",
    client: "Aether Apparel & Footwear",
    tagBadges: ["E-Commerce", "Shopify", "React", "Tailwind"],
    description: "Modern high-end e-commerce storefront for luxury streetwear with 3D sneakers showcase, dynamic filters, and instant checkout.",
    overview: "Engineered to deliver sub-second page loads, an interactive product gallery, shopping cart drawer, and automated inventory synchronization.",
    keyFeatures: [
      "Custom 3D footwear & apparel visualizer",
      "One-click Apple Pay & Stripe checkout",
      "Dynamic filtering & live stock badges",
      "Automated cart abandonment recovery"
    ],
    technologies: ["Shopify Headless", "React", "Tailwind CSS", "Stripe API"],
    metrics: "+340% Mobile Conversions",
    stats: [
      { value: "1 Week", label: "Development Time" },
      { value: "100%", label: "On-Time Delivery" },
      { value: "5.0/5", label: "Client Rating" }
    ],
    liveUrl: "https://aether-arcade.shop",
    deliverables: ["3D Product Canvas", "Cart Engine", "Multi-Currency Sync", "Stock Alerts"],
    testimonial: "Our checkout abandonment dropped by 45% immediately after launch."
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    category: "web-apps",
    duration: "Web App • 10 Days",
    image: "/ui_taskflow.jpg",
    multiDeviceImage: "/ui_taskflow.jpg",
    client: "TaskFlow Technologies",
    tagBadges: ["SaaS", "Next.js", "PostgreSQL", "WebSockets"],
    description: "Collaborative project management and Kanban board web application with real-time multi-user synchronization.",
    overview: "Built for agile product teams needing sprint planning, task boards, automated notifications, and developer API integrations.",
    keyFeatures: [
      "Drag-and-drop Kanban sprint columns",
      "Real-time task synchronization via WebSockets",
      "Team member avatar assignments & progress bars",
      "Role-based access permissions & audit logs"
    ],
    technologies: ["Next.js 15", "PostgreSQL", "Prisma", "Tailwind CSS"],
    metrics: "12,000+ Daily Active Users",
    stats: [
      { value: "10 Days", label: "Development Time" },
      { value: "100%", label: "On-Time Delivery" },
      { value: "4.9/5", label: "Client Rating" }
    ],
    liveUrl: "https://taskflow.aetherstudios.dev",
    deliverables: ["Multi-Tenant Architecture", "WebSockets Engine", "Stripe Subscription Billing"],
    testimonial: "Shipped our MVP ahead of schedule. The code quality made it easy to pitch to seed investors."
  },
  {
    id: "fitness-mobile-app",
    title: "Fitness Mobile App",
    category: "mobile-apps",
    duration: "Mobile App • 2 Weeks",
    image: "/ui_fitness_mobile_app.jpg",
    multiDeviceImage: "/ui_fitness_mobile_app.jpg",
    client: "PulseFit Pro Inc.",
    tagBadges: ["Mobile App", "React Native", "Expo", "Firebase"],
    description: "Dual-screen mobile application tracking workouts, heart rate telemetry, calorie ring progress, and daily routines.",
    overview: "A sleek dark-mode native experience designed for iOS and Android with Apple HealthKit and Google Fit integration.",
    keyFeatures: [
      "Daily activity ring & calorie calculators",
      "Workout routine video guides & interval timers",
      "Community leaderboards & badges",
      "Offline cache with background synchronization"
    ],
    technologies: ["React Native", "Expo", "Node.js", "Firebase"],
    metrics: "4.9 Stars (5,000+ Downloads)",
    stats: [
      { value: "2 Weeks", label: "Development Time" },
      { value: "100%", label: "On-Time Delivery" },
      { value: "4.9/5", label: "App Store Rating" }
    ],
    liveUrl: "https://pulsefit.app",
    deliverables: ["iOS & Android Builds", "Workout Generator", "Push Notifications", "Apple Watch Sync"],
    testimonial: "The UI feels so fluid and responsive. Our beta testers fell in love on day one."
  },
  {
    id: "ai-image-generator",
    title: "AI Image Generator",
    category: "ai-3d",
    duration: "Web App • 5 Days",
    image: "/ui_ai_image_generator.jpg",
    multiDeviceImage: "/ui_ai_image_generator.jpg",
    client: "Nova AI Studio",
    tagBadges: ["AI / ML", "Python", "FastAPI", "React"],
    description: "Creative generative AI studio enabling users to generate 3D characters, textures, and assets using Stable Diffusion pipelines.",
    overview: "High-concurrency GPU inference platform with parameter sliders, negative prompts, aspect ratio selectors, and one-click cloud exports.",
    keyFeatures: [
      "Text-to-3D character generation engine",
      "Instant GPU inference pipeline (<3s generation)",
      "Resolution & style presets (Cyberpunk, Anime, Photoreal)",
      "Integrated credit billing & API tokens"
    ],
    technologies: ["Python", "FastAPI", "React", "CUDA", "Three.js"],
    metrics: "120,000+ Renders Generated",
    stats: [
      { value: "5 Days", label: "Development Time" },
      { value: "100%", label: "On-Time Delivery" },
      { value: "5.0/5", label: "Client Rating" }
    ],
    liveUrl: "https://nova-ai.studio",
    deliverables: ["GPU Inference Pipeline", "Interactive Canvas Editor", "Subscription Billing"],
    testimonial: "Incredible latency optimization. Generates ultra-sharp images in under 3 seconds."
  },
  {
    id: "university-project",
    title: "University Project (MediVision AI)",
    category: "student-projects",
    duration: "Student Capstone • 48h",
    image: "/ui_medivision_capstone.jpg",
    multiDeviceImage: "/ui_medivision_capstone.jpg",
    client: "PulmoCare AI (Senior Capstone)",
    tagBadges: ["Student Capstone", "PyTorch", "Python", "IEEE Thesis"],
    description: "Deep learning chest X-ray diagnosis dashboard with heatmap visualization, 40-page LaTeX thesis, and defense presentation deck.",
    overview: "Built specifically for university evaluation rubrics with high-accuracy ResNet models, ROC curves, confusion matrices, and comprehensive documentation.",
    keyFeatures: [
      "Real-time X-ray scan classification & confidence score",
      "Grad-CAM pathology heatmap localization overlay",
      "40-page structured IEEE LaTeX thesis report",
      "Complete 25-slide defense presentation deck (.pptx)"
    ],
    technologies: ["PyTorch", "Python", "FastAPI", "React", "LaTeX"],
    metrics: "Graduated with 99/100 (Highest Honors)",
    stats: [
      { value: "48h", label: "Turnaround" },
      { value: "100%", label: "Grade A+" },
      { value: "99/100", label: "University Mark" }
    ],
    liveUrl: "https://pulmocare.aetherstudios.dev",
    deliverables: ["Full Working Model & Web App", "40-Page LaTeX Thesis", "Defense Slide Deck", "Viva Guide"],
    testimonial: "We received the Department Best Project Award! Our professors were stunned by the live demo."
  }
];

export const portfolioCategories = [
  { id: "all", label: "All" },
  { id: "web-apps", label: "Web Apps" },
  { id: "mobile-apps", label: "Mobile Apps" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "ai-3d", label: "AI / 3D" },
  { id: "student-projects", label: "Student Projects" },
];
