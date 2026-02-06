import React from 'react';
import Section from '../components/ui/Section';
import DiscoveryWizard from '../features/ai/components/DiscoveryWizard';

const Audit = () => {
  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '90vh' }}>
      <Section>
        <DiscoveryWizard />
      </Section>
    </div>
  );
};

export default Audit;
