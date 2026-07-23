// AI Clinical Assistant Component
import { CHAT_RESPONSES } from '../db.js';

export function renderChat(container, profile) {
  const patientId = profile.id;
  const patientName = profile.name;
  
  // Default welcome message
  let chatHistory = [
    { 
      sender: "assistant", 
      text: `Hello, I am your Aegis Clinical Assistant. I have analyzed ${patientName}'s genomic markers and health records. You can select from the clinical questions below or type a custom query.` 
    }
  ];

  // Dynamic suggestion questions based on patient flags
  let suggestions = ["What is personalized medicine?", "How does pharmacogenomics work?"];
  
  if (profile.geneticMarkers.cyp2c19.includes("Poor")) {
    suggestions.unshift("Why is clopidogrel contraindicated?");
  }
  if (profile.geneticMarkers.hlab5701.includes("Positive")) {
    suggestions.unshift("Why is abacavir contraindicated?");
  }
  if (profile.geneticMarkers.brca.includes("Positive") || profile.geneticMarkers.brca.includes("Detected")) {
    suggestions.unshift("What does BRCA1 mutation mean?");
  }
  if (profile.geneticMarkers.apoe.includes("High")) {
    suggestions.unshift("How does the APOE-e4 gene affect me?");
  }

  // Draw chat layout
  function drawChatLayout() {
    container.innerHTML = `
      <div class="chat-window">
        <div class="chat-header">
          <div class="chat-status-dot"></div>
          <div class="chat-title-box">
            <h3>Aegis AI Assistant</h3>
            <p>Active Decision Support Node</p>
          </div>
        </div>

        <div class="chat-messages" id="chat-messages-container">
          <!-- Messages render here -->
        </div>

        <div class="chat-suggestions" id="chat-suggestions-container">
          <!-- Suggestion chips render here -->
        </div>

        <form class="chat-input-bar" id="chat-input-form">
          <input type="text" id="chat-text-input" class="chat-input" placeholder="Ask about medications, genetics, risks..." autocomplete="off">
          <button type="submit" class="chat-send-btn">
            <i data-lucide="send" width="16" height="16"></i>
          </button>
        </form>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    updateMessageFeed();
    updateSuggestionChips();

    // Bind event listeners
    document.getElementById("chat-input-form").addEventListener("submit", handleFormSubmit);
  }

  function updateMessageFeed() {
    const feed = document.getElementById("chat-messages-container");
    if (!feed) return;

    feed.innerHTML = chatHistory.map(msg => `
      <div class="chat-message ${msg.sender}">
        ${msg.text}
      </div>
    `).join('');
    
    feed.scrollTop = feed.scrollHeight;
  }

  function updateSuggestionChips() {
    const chipContainer = document.getElementById("chat-suggestions-container");
    if (!chipContainer) return;

    if (suggestions.length === 0) {
      chipContainer.style.display = "none";
      return;
    }

    chipContainer.style.display = "flex";
    chipContainer.innerHTML = suggestions.map(sug => `
      <button class="chat-suggestion-chip" type="button">${sug}</button>
    `).join('');

    // Bind chip clicks
    chipContainer.querySelectorAll(".chat-suggestion-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const question = chip.innerText;
        handleUserQuestion(question);
      });
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("chat-text-input");
    const question = input.value.trim();
    if (!question) return;

    input.value = "";
    handleUserQuestion(question);
  }

  function handleUserQuestion(question) {
    // Add user message
    chatHistory.push({ sender: "user", text: question });
    updateMessageFeed();

    // Add typing indicator
    const feed = document.getElementById("chat-messages-container");
    const indicator = document.createElement("div");
    indicator.className = "chat-message assistant typing-indicator-wrapper";
    indicator.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    feed.appendChild(indicator);
    feed.scrollTop = feed.scrollHeight;

    // Simulate AI thinking and reply
    setTimeout(() => {
      // Remove indicator
      const currentIndicator = feed.querySelector(".typing-indicator-wrapper");
      if (currentIndicator) currentIndicator.remove();

      const answer = generateAssistantResponse(question);
      chatHistory.push({ sender: "assistant", text: answer });
      updateMessageFeed();
    }, 700 + Math.random() * 500);
  }

  // Answer matching engine
  function generateAssistantResponse(question) {
    const qLower = question.toLowerCase();
    const responses = CHAT_RESPONSES[patientId] || {};
    const defaultResponses = CHAT_RESPONSES["default"];

    // 1. Check exact predefined responses for this profile
    if (responses[qLower]) {
      return responses[qLower];
    }

    // 2. Keyword matching for profile-specific queries
    if (qLower.includes("clopidogrel") || qLower.includes("plavix") || qLower.includes("antiplatelet")) {
      if (profile.geneticMarkers.cyp2c19.includes("Poor")) {
        return `For ${patientName}, Clopidogrel is contraindicated due to a CYP2C19 Poor Metabolizer genotype (*2/*2). Because her liver lacks active conversion enzymes, Clopidogrel will not be activated, leaving her unprotected. The recommended alternative is Prasugrel or Ticagrelor.`;
      }
      return `${patientName} is a Normal Metabolizer for CYP2C19 (*1/*1). Standard antiplatelet therapy with Clopidogrel is expected to yield normal therapeutic response rates.`;
    }

    if (qLower.includes("abacavir") || qLower.includes("ziagen") || qLower.includes("hlab") || qLower.includes("hla-b")) {
      if (profile.geneticMarkers.hlab5701.includes("Positive")) {
        return `${patientName} carries the HLA-B*5701 genetic marker. This places them at an extremely high risk for a severe, systemic, life-threatening Abacavir Hypersensitivity Reaction. Abacavir must be documented as an absolute allergy and avoided completely.`;
      }
      return `${patientName} is HLA-B*5701 negative, meaning they have a standard low risk for Abacavir hypersensitivity and can tolerate this medication if clinically indicated.`;
    }

    if (qLower.includes("apoe") || qLower.includes("alzheimer") || qLower.includes("dementia") || qLower.includes("cognitive")) {
      if (profile.geneticMarkers.apoe.includes("ε4") || profile.geneticMarkers.apoe.includes("e4")) {
        return `${patientName} is a carrier of the homozygous APOE-ε4 variant. This is the strongest genetic risk marker for late-onset Alzheimer's. We advise active management of cardiovascular risks (lipids/blood pressure) and cognitive stimulation.`;
      }
      return `${patientName} carries the standard APOE-ε3/ε3 genotype, representing a baseline population risk for late-onset Alzheimer's Disease.`;
    }

    if (qLower.includes("brca") || qLower.includes("breast") || qLower.includes("ovarian") || qLower.includes("cancer")) {
      if (profile.geneticMarkers.brca.includes("Positive") || profile.geneticMarkers.brca.includes("Detected")) {
        return `${patientName} carries a pathogenic BRCA1 mutation. This confers a highly elevated 85% lifetime risk for breast cancer and a 40-50% lifetime risk for ovarian cancer. Recommend intensive surveillance alternating Breast MRI and mammograms starting at age 30, and surgical genetics consultation.`;
      }
      return `No pathogenic BRCA mutations were detected in the sequenced panel for ${patientName}. General population risk-based cancer screening standards apply.`;
    }

    if (qLower.includes("mthfr") || qLower.includes("folate") || qLower.includes("homocysteine")) {
      if (profile.geneticMarkers.mthfr.includes("T/T") || profile.geneticMarkers.mthfr.includes("Homozygous")) {
        return `${patientName} is homozygous for the MTHFR 677T/T variant. Folate metabolism is reduced by roughly 60-70%, potentially raising homocysteine levels (vascular inflammation risk). Support with active L-methylfolate rather than synthetic folic acid.`;
      }
      return `${patientName} possesses a normal MTHFR genotype. Standard folate conversion and cellular methylation cycles are expected.`;
    }

    if (qLower.includes("statin") || qLower.includes("simvastatin") || qLower.includes("cholesterol") || qLower.includes("lipitor")) {
      if (patientId === "marcus-chen") {
        return "Marcus has an SLCO1B1 transporter genotype associated with decreased liver clearance of Simvastatin, elevating myopathy risk. Use low-dose Rosuvastatin or Pravastatin instead.";
      }
      return `For ${patientName}, cholesterol management with statins is indicated based on risk scores. No specific SLCO1B1/statin transporter abnormalities are noted in the report.`;
    }

    if (qLower.includes("diet") || qLower.includes("lifestyle") || qLower.includes("exercise") || qLower.includes("fitness")) {
      const diets = profile.lifestylePlan.map(x => `${x.category}: ${x.title} (${x.desc})`).join("\n\n");
      return `Here is the lifestyle recommendations summary for ${patientName}:\n\n${diets}`;
    }

    // 3. Fallbacks to default general responses
    if (qLower.includes("personalized medicine") || qLower.includes("precision medicine")) {
      return defaultResponses["what is personalized medicine?"];
    }

    if (qLower.includes("pharmacogenomics") || qLower.includes("pgx") || qLower.includes("drug gene")) {
      return defaultResponses["how does pharmacogenomics work?"];
    }

    if (qLower.includes("shap") || qLower.includes("explainability") || qLower.includes("xai")) {
      return defaultResponses["what are shap charts?"];
    }

    // Default fallback
    return `Regarding ${patientName}'s clinical profile: I can answer questions about their specific genomic markers (CYP2C19, HLA-B*5701, BRCA1, APOE), explain drug-gene contraindications, or explain the SHAP contributions in their disease risk charts. Could you clarify your question?`;
  }

  // Initial draw
  drawChatLayout();
}
