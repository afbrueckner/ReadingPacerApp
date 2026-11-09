window.benchmarkBank = {
    tier1: {
      FormA: { wordCount: 110, passage: "Lighthouses are tall towers built near coasts and harbors. They shine bright beams of light to guide ships safely through dark waters. Long ago, lighthouse keepers had to trim oil lamps every night. Today, most lighthouses use electric bulbs and automatic timers. Warnings from lighthouses prevent boats from hitting sharp rocks near the shore during stormy weather.", 
        questions: [
          { type: "Literal Recall", question: "1. What was a task for lighthouse keepers long ago?", options: ["Fixing electric bulbs", "Trimming oil lamps every night", "Building new harbors"], correctIndex: 1 },
          { type: "Inferential", question: "2. Why are lighthouses built on high coastal rocks?", options: ["So keepers can see stars", "To maximize light visibility for approaching ships", "To stay away from town noise"], correctIndex: 1 },
          { type: "Vocabulary", question: "3. What does 'automatic' mean in the context of modern lighthouses?", options: ["Operated by hand", "Self-operating without manual effort", "Broken and unpowered"], correctIndex: 1 }
        ]
      },
      FormB: { wordCount: 115, passage: "Coral reefs are underwater structures made by tiny sea creatures called polyps. These reefs provide homes for one quarter of all marine life in the ocean. Bright fish, sea turtles, and crabs rely on corals for food and shelter. Ocean pollution and warm water can harm these fragile ecosystems. Scientists work to protect reefs by creating ocean sanctuaries.", 
        questions: [
          { type: "Literal Recall", question: "1. What creatures build coral reefs?", options: ["Sea turtles", "Tiny polyps", "Electric eels"], correctIndex: 1 },
          { type: "Inferential", question: "2. What would happen if coral reefs were destroyed?", options: ["25% of marine life would lose their habitat", "Ocean water would instantly dry up", "Fish would swim faster"], correctIndex: 0 },
          { type: "Vocabulary", question: "3. What does 'fragile' mean when describing reef ecosystems?", options: ["Strong and indestructible", "Easily damaged or delicate", "Deep underwater"], correctIndex: 1 }
        ]
      }
    },
    tier2: {
      FormA: { wordCount: 165, passage: "Volcanoes are openings in the Earth's crust that allow molten rock, ash, and gases to escape onto the surface. When magma builds up pressure beneath a volcano, an eruption can occur. Some eruptions are explosive and send ash high into the atmosphere, while others produce gentle flows of liquid lava. Scientists monitor volcanic activity by measuring seismic waves, gas emissions, and ground deformation. Understanding these signs helps warning systems protect nearby communities from unexpected hazards.", 
        questions: [
          { type: "Literal Recall", question: "1. What allows scientists to monitor volcanic activity?", options: ["Weather forecasts", "Seismic waves, gas emissions, and ground deformation", "Ocean tides"], correctIndex: 1 },
          { type: "Inferential", question: "2. Why is monitoring ground deformation critical near active volcanoes?", options: ["It shows where trees grow best", "It indicates rising magma pressure underneath", "It tracks animal migration"], correctIndex: 1 },
          { type: "Vocabulary", question: "3. What is 'magma' before it reaches the Earth's surface?", options: ["Molten rock beneath the surface", "Cold volcanic ash", "Atmospheric gas"], correctIndex: 0 }
        ]
      },
      FormB: { wordCount: 170, passage: "Glaciers are massive sheets of dense ice that move slowly across land under their own weight. Formed over hundreds of years from accumulated snow, glaciers hold most of the world's freshwater. As climate temperatures rise, glaciers melt faster than new snow can collect. Scientists track glacier movement using satellite imagery and aerial radar. Shrinking glaciers cause rising sea levels and alter river habitats around the world.", 
        questions: [
          { type: "Literal Recall", question: "1. How do scientists track glacier movement?", options: ["Using satellite imagery and aerial radar", "By measuring rainwater", "Through deep sea diving"], correctIndex: 0 },
          { type: "Inferential", question: "2. Why does melting glaciers impact coastal communities?", options: ["It decreases ocean levels", "It causes sea levels to rise and floods coasts", "It stops river flow entirely"], correctIndex: 1 },
          { type: "Vocabulary", question: "3. What does 'accumulated' mean regarding glacier formation?", options: ["Melted away quickly", "Gathered and built up over time", "Blown away by wind"], correctIndex: 1 }
        ]
      }
    },
    tier3: {
      FormA: { wordCount: 210, passage: "Hydrothermal vents are fissures on the ocean floor where geothermally heated water emerges. Located near volcanically active oceanic ridges, these vents discharge mineral-rich fluids exceeding four hundred degrees Celsius. Despite the total absence of sunlight and extreme hydrostatic pressure, complex ecosystems thrive surrounding hydrothermal vents. Chemosynthetic bacteria convert chemical compounds like hydrogen sulfide into organic energy, serving as the primary producers for specialized sea life including giant tube worms and blind shrimp.", 
        questions: [
          { type: "Literal Recall", question: "1. What process do bacteria near hydrothermal vents use to generate energy?", options: ["Photosynthesis", "Chemosynthesis using chemical compounds", "Nuclear decay"], correctIndex: 1 },
          { type: "Inferential", question: "2. Why is chemosynthesis necessary for vent life instead of photosynthesis?", options: ["Sunlight cannot penetrate to deep ocean floors", "Water is too cold for plants", "Bacteria prefer dark colors"], correctIndex: 0 },
          { type: "Vocabulary", question: "3. What are 'fissures' in the ocean floor?", options: ["Floating seaweed beds", "Deep cracks or openings in the crust", "Solid ice formations"], correctIndex: 1 }
        ]
      },
      FormB: { wordCount: 215, passage: "Bioluminescence is the biochemical emission of light by living organisms, occurring predominantly among marine species. This physiological reaction requires the enzyme luciferase to catalyze the oxidation of luciferin, generating light without heat. Organisms utilize bioluminescence for diverse evolutionary adaptations, including camouflage through counterillumination, attracting prey, and deterring potential predators. Marine biologists study these molecular mechanisms to develop advanced medical imaging technologies.", 
        questions: [
          { type: "Literal Recall", question: "1. What enzyme catalyzes the light-producing reaction in bioluminescence?", options: ["Luciferase", "Amylase", "Hemoglobin"], correctIndex: 0 },
          { type: "Inferential", question: "2. How does counterillumination aid a deep-sea creature's survival?", options: ["It glows brightly to blind enemies", "It matches overhead light to hide its silhouette from predators below", "It warms the cold surrounding water"], correctIndex: 1 },
          { type: "Vocabulary", question: "3. What does 'catalyze' mean in a biochemical reaction?", options: ["To prevent or block a change", "To accelerate or trigger a chemical process", "To freeze liquids"], correctIndex: 1 }
        ]
      }
    },
    tier4: {
      FormA: { wordCount: 235, passage: "Quantum computing represents a paradigm shift from classical computation, leveraging the principles of quantum mechanics to process information. Unlike classical bits that exist in definitive binary states of zero or one, quantum bits or qubits exhibit superposition, enabling simultaneous representation of multiple state combinations. Furthermore, quantum entanglement allows qubits to remain interconnected regardless of spatial distance, exponentially accelerating complex calculations in cryptography, material science, and algorithmic simulation.", 
        questions: [
          { type: "Literal Recall", question: "1. What property allows qubits to represent multiple states simultaneously?", options: ["Binary compilation", "Superposition", "Thermal conductivity"], correctIndex: 1 },
          { type: "Inferential", question: "2. Why does quantum computing threaten traditional data cryptography?", options: ["Qubits can process complex calculations exponentially faster", "Qubits delete classical hard drives", "Quantum computers use less electricity"], correctIndex: 0 },
          { type: "Vocabulary", question: "3. What is a 'paradigm shift' in scientific computing?", options: ["A minor hardware update", "A fundamental change in basic concepts and approach", "A system error"], correctIndex: 1 }
        ]
      },
      FormB: { wordCount: 240, passage: "The CRISPR-Cas9 system is a revolutionary genome-editing tool derived from bacterial adaptive immune mechanisms. Bacteria employ CRISPR sequences to recognize and destroy recurring viral DNA using the endonuclease Cas9 as molecular scissors. Researchers have repurposed this precision mechanism to introduce targeted alterations within complex eukaryotic genomes, opening unprecedented avenues for treating hereditary genetic disorders, enhancing agricultural resilience, and elucidating fundamental cellular pathways.", 
        questions: [
          { type: "Literal Recall", question: "1. What is the function of the Cas9 protein in CRISPR editing?", options: ["Synthesizing sugars", "Acting as molecular scissors to cut DNA", "Storing lipids"], correctIndex: 1 },
          { type: "Inferential", question: "2. How did bacteria originally evolve the CRISPR-Cas9 system?", options: ["To store excess food energy", "As an adaptive immune system against viral attacks", "To build cell walls"], correctIndex: 1 },
          { type: "Vocabulary", question: "3. What does 'elucidating' mean in scientific research?", options: ["Hiding secret data", "Making clear or explaining complex pathways", "Removing cellular waste"], correctIndex: 1 }
        ]
      }
    }
  };