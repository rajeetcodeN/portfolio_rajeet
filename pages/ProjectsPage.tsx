import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, FolderOpen } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-24">
      <Section title="Project_Db" noBorder>
        <div className="p-4 md:p-12">
            <div className="flex items-center gap-4 mb-8">
                 <div className="w-8 h-8 border border-accent flex items-center justify-center text-accent">
                    <FolderOpen size={16} />
                 </div>
                 <span className="font-mono text-sm text-accent uppercase tracking-[0.2em]">Deployment History</span>
            </div>

             <h1 className="text-6xl md:text-9xl font-display font-bold text-textMain uppercase mb-16 leading-[0.8]">
                System <span className="text-outline-accent">Builds</span>
            </h1>
            
            <div className="grid grid-cols-1 gap-px bg-border border border-border">
                {PROJECTS.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        whileHover="rowHover"
                        className="group relative bg-background p-6 md:p-12 overflow-hidden"
                    >
                        {/* Accent gradient wash slides in on hover */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(100deg, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 55%)',
                            }}
                            initial={{ opacity: 0, x: '-100%' }}
                            variants={{ rowHover: { opacity: 1, x: 0 } }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        />

                        {/* Inner accent glow */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{ boxShadow: 'inset 0 0 60px color-mix(in srgb, var(--color-accent) 6%, transparent)' }}
                            initial={{ opacity: 0 }}
                            variants={{ rowHover: { opacity: 1 } }}
                            transition={{ duration: 0.4 }}
                        />

                        {/* Hover Stripe */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                        <div className="grid lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="font-mono text-xs text-accentDim border border-border px-2 py-0.5">ID: 0{index + 1}</span>
                                    <div className="h-px bg-border flex-grow"></div>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-display font-bold text-textMain uppercase mb-8 leading-[0.9] group-hover:text-white transition-colors break-words">
                                    {project.title}
                                </h2>
                                
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div className="relative pl-6 border-l border-border">
                                        <div className="absolute -left-[5px] top-0 w-2 h-2 bg-border rounded-full"></div>
                                        <span className="font-mono text-[10px] text-textMuted uppercase tracking-widest block mb-2">Problem Matrix</span>
                                        <p className="text-sm text-textMuted leading-relaxed">{project.problem}</p>
                                    </div>
                                    <div className="relative pl-6 border-l border-accent">
                                        <div className="absolute -left-[5px] top-0 w-2 h-2 bg-accent rounded-full"></div>
                                        <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-2">Solution Protocol</span>
                                        <p className="text-sm text-textMain leading-relaxed">{project.solution}</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.stack.map(tech => (
                                        <span key={tech} className="text-[10px] font-mono uppercase px-2 py-1 bg-surface border border-border text-textMuted group-hover:text-accent transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-12">
                                <div>
                                    <span className="font-mono text-[10px] text-textMuted uppercase tracking-widest block mb-4">Performance Impact</span>
                                    <div className="text-2xl font-display font-bold text-accent uppercase leading-tight">
                                        {project.result}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 mt-12">
                                    {project.demoUrl && (
                                        <a href={project.demoUrl} className="flex items-center justify-between px-6 py-4 bg-surface border border-border text-textMain font-display font-bold text-lg uppercase hover:bg-accent hover:border-accent hover:text-background transition-colors">
                                            <span>Deploy View</span> <ExternalLink size={18} />
                                        </a>
                                    )}
                                    {project.repoUrl && (
                                        <a href={project.repoUrl} className="flex items-center justify-between px-6 py-4 border border-border text-textMuted font-display font-bold text-lg uppercase hover:text-textMain hover:border-textMain transition-colors">
                                            <span>Source Code</span> <Github size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </Section>
    </div>
  );
};