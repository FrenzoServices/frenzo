import React, { useState } from 'react';
import { ShoppingBag, Search, Star, Plus } from 'lucide-react';

const CommerceDemo = () => {
  const [cartCount, setCartCount] = useState(2);
  const products = [
    { id: 1, name: 'Minimalist Watch', price: '$149', image: '#333' },
    { id: 2, name: 'Leather Wallet', price: '$89', image: '#444' },
    { id: 3, name: 'Travel Backpack', price: '$220', image: '#555' },
    { id: 4, name: 'Steel Bottle', price: '$45', image: '#666' },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', color: '#000' }}>
      {/* Nav */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>BRAND.</div>
         <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Search size={20} color="#333" />
            <div style={{ position: 'relative' }}>
               <ShoppingBag size={20} color="#333" />
               <span style={{ 
                 position: 'absolute', 
                 top: -6, 
                 right: -6, 
                 background: '#000', 
                 color: '#fff', 
                 fontSize: '0.6rem', 
                 width: '14px', 
                 height: '14px', 
                 borderRadius: '50%', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center' 
               }}>{cartCount}</span>
            </div>
         </div>
      </div>

      {/* Hero Mini */}
      <div style={{ background: '#f8f8f8', padding: '2rem 1.5rem', textAlign: 'center' }}>
         <h1 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '0.5rem', letterSpacing: '-1px' }}>New Collection</h1>
         <p style={{ color: '#666', fontSize: '0.9rem' }}>Timeless essentials for the modern creator.</p>
      </div>

      {/* Grid */}
      <div style={{ 
        flex: 1, 
        padding: '1.5rem', 
        overflowY: 'auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
        gap: '1rem' 
      }}>
        {products.map(p => (
           <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ 
                background: '#f4f4f5', 
                borderRadius: '8px', 
                aspectRatio: '1', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
                group: 'product'
              }}
              onClick={() => setCartCount(c => c + 1)}
              >
                 <div style={{ position: 'absolute', top: 10, right: 10, background: '#fff', borderRadius: '50%', padding: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                   <Plus size={14} />
                 </div>
              </div>
              <div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                   <h3 style={{ fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>{p.name}</h3>
                   <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{p.price}</span>
                 </div>
                 <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#000" strokeWidth={0} />)}
                 </div>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default CommerceDemo;
