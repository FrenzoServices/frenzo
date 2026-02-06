// Mock service for Kimi K 2.5 LLM
import { PROJECT_ROLES } from '../../projects/constants';

export const aiService = {
  /**
   * Generates project proposal based on questionnaire answers
   */
  generateProjectProposal: async (answers) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simple deterministic logic for mock
    let estimatedCost = 35000;
    let title = "Custom Growth System";
    let requirements = [];

    if (answers.goal?.includes('scale')) {
      estimatedCost += 20000;
      title = "Enterprise Scaling Platform";
      requirements.push("- High-performance backend architecture for scaling");
    }
    
    if (answers.platform?.includes('app')) {
      estimatedCost += 25000;
      title = "Cross-Platform Mobile Application";
      requirements.push("- React Native / Flutter mobile app implementation");
    }

    if (answers.ai?.includes('automate')) {
        estimatedCost += 15000;
        requirements.push("- AI Agent integration for workflow automation");
    }

    const proposal = {
      title,
      estimatedCost,
      requirements: `
**AI-Generated Project Scope**

Based on your inputs, we've designed a custom solution:

**Core Objectives:**
${requirements.join('\n')}

**Proposed Stack:**
- Frontend: React / Next.js
- Backend: Node.js / Python
- Database: Firestore / PostgreSQL
- AI: Kimi 2.5 / OpenAI

**Deliverables:**
1. System Architecture Design
2. MVP Development
3. Testing & Deployment support
      `,
      isAiGenerated: true
    };

    return proposal;
  }
};
