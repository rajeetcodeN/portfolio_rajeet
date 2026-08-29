import React, { useState } from 'react';
import { CERTIFICATIONS } from '../constants';
import { ShieldCheck, CheckCircle2, QrCode, Search, Filter, Download, Hash, Award } from 'lucide-react';

export const CertsPage: React.FC = () => {
    const [filter, setFilter] = useState('');

    const filteredCerts = CERTIFICATIONS.filter(c => 
        c.name.toLowerCase().includes(filter.toLowerCase()) || 
        c.issuer.toLowerCase().includes(filter.toLowerCase())
    );

    const generateHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return "0x" + Math.abs(hash).toString(16).toUpperCase().padStart(12, '0');
    };

    return (
        <div className="min-h-screen pt-24 pb-24 font-mono text-sm">
            {/* Header / Control Bar */}
            <div className="fixed top-[72px] left-0 w-full z-40 bg-background/90 backdrop-blur border-b border-border">
                <div className="max-w-[1920px] mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                     <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-accent">
                            <ShieldCheck size={18} />
                            <span className="font-bold uppercase tracking-widest hidden md:inline">Cert_Registry_v2.0</span>
                            <span className="font-bold uppercase tracking-widest md:hidden">Registry</span>
                        </div>
                        <div className="h-4 w-px bg-border"></div>
                        <div className="text-textMuted text-xs">
                            DB_STATUS: <span className="text-green-500">SYNCED</span>
                        </div>
                     </div>

                     <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted group-hover:text-accent transition-colors" size={14} />
                            <input 
                                type="text" 
                                placeholder="SEARCH QUERY..." 
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full md:w-64 bg-black border border-border pl-10 pr-4 py-2 text-textMain focus:border-accent focus:outline-none placeholder-textMuted/50 uppercase transition-colors"
                            />
                        </div>
                     </div>
                </div>
            </div>

            <div className="max-w-[1920px] mx-auto p-6 md:p-12 mt-12 md:mt-8">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 border border-border bg-black">
                        <div className="text-xs text-textMuted uppercase tracking-widest mb-1">Total Licenses</div>
                        <div className="text-2xl md:text-3xl font-display font-bold text-textMain">{CERTIFICATIONS.length}</div>
                    </div>
                    <div className="p-4 border border-border bg-black">
                        <div className="text-xs text-textMuted uppercase tracking-widest mb-1">Verified Active</div>
                        <div className="text-2xl md:text-3xl font-display font-bold text-accent">100%</div>
                    </div>
                     <div className="p-4 border border-border bg-black">
                        <div className="text-xs text-textMuted uppercase tracking-widest mb-1">Last Audit</div>
                        <div className="text-2xl md:text-3xl font-display font-bold text-textMain">24H</div>
                    </div>
                     <div className="p-4 border border-border bg-black">
                        <div className="text-xs text-textMuted uppercase tracking-widest mb-1">Compliance</div>
                        <div className="text-2xl md:text-3xl font-display font-bold text-textMain">AAA</div>
                    </div>
                </div>

                {/* Card Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCerts.map((cert, index) => (
                        <div 
                            key={index} 
                            className="bg-black border border-border p-8 relative group hover:border-accent transition-all duration-300 overflow-hidden flex flex-col h-full hover:shadow-[0_0_30px_rgba(76,169,255,0.1)]"
                        >
                            {/* Card Accent Top Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-accent/20 group-hover:bg-accent transition-colors"></div>
                            
                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div>
                                    <div className="text-xs font-mono text-accent uppercase tracking-widest mb-1 flex items-center gap-2">
                                        <Hash size={12} /> ID: CERT-0{index + 1}
                                    </div>
                                    <div className="text-sm font-mono text-textMuted uppercase">
                                        {cert.issuer}
                                    </div>
                                </div>
                                <div className="p-2 border border-border group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                                    <Award className="text-accent" size={24} />
                                </div>
                            </div>

                            <h3 className="font-display font-bold text-2xl md:text-3xl text-textMain uppercase leading-tight mb-4 group-hover:text-accent transition-colors">
                                {cert.name}
                            </h3>
                            
                            <div className="mt-8 border-t border-border pt-4 flex justify-between items-end relative z-10">
                                 <div>
                                    <span className="font-mono text-[10px] text-textMuted uppercase block mb-1">Issued</span>
                                    <span className="font-mono text-sm text-textMain">{cert.year}</span>
                                 </div>
                                 <div className="text-right">
                                    <span className="font-mono text-[10px] text-textMuted uppercase block mb-1">License ID</span>
                                    <span className="font-mono text-xs text-accentDim uppercase break-all flex items-center gap-1 justify-end group-hover:text-accent transition-colors">
                                        {cert.id} <CheckCircle2 size={10} />
                                    </span>
                                 </div>
                            </div>

                            {/* Verification Hash Display */}
                            <div className="mt-4 pt-2 border-t border-border/50 text-[10px] text-textMuted font-mono flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                <Hash size={8} /> {generateHash(cert.name).substring(0, 16)}...
                            </div>

                            {/* Interactive Scan Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-accent/0 via-accent/5 to-accent/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none z-0"></div>

                             {/* Corner Brackets */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-border group-hover:border-accent transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-border group-hover:border-accent transition-colors"></div>
                        </div>
                    ))}
                    
                    {filteredCerts.length === 0 && (
                        <div className="col-span-full py-24 text-center border border-dashed border-border mt-8 bg-surface/5">
                           <div className="font-mono text-accent mb-2 text-lg">QUERY_RETURNED_ZERO_RESULTS</div>
                           <div className="text-textMuted text-xs uppercase tracking-widest">Adjust filter parameters or clear search.</div>
                           <button 
                               onClick={() => setFilter('')}
                               className="mt-6 px-6 py-2 bg-accent text-background font-bold text-xs uppercase hover:bg-white transition-colors"
                           >
                               Reset Search
                           </button>
                        </div>
                   )}
                </div>
            </div>
        </div>
    );
};