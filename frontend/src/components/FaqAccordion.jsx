import { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqAccordion({ faqs }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          style={{ background: '#0d0d26', borderRadius: '12px', border: '1px solid #1c1c44', overflow: 'hidden', cursor: 'pointer' }}
          onClick={() => setOpenFaq(openFaq === index ? null : index)}
        >
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.4rem', color: '#fff', letterSpacing: '0.5px' }}>{faq.q}</span>
            {openFaq === index ? <ChevronUp style={{ color: '#ff007f' }} /> : <ChevronDown style={{ color: '#00f2fe' }} />}
          </div>
          {openFaq === index && (
            <div style={{ padding: '0 20px 20px 20px', fontFamily: 'sans-serif', fontSize: '0.95rem', color: '#aaa', lineHeight: 1.5, borderTop: '1px solid #141438', paddingTop: '15px' }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
