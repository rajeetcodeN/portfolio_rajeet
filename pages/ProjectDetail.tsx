import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ArrowLeft, Cpu, Layers, GitBranch, Terminal } from 'lucide-react';
import { Section } from '../components/Section';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return <div className="p-20 text-center font-display text-4xl">PROJECT NOT FOUND</div>;
  }

  return (
    <div className="min-h-screen pt-12 pb-24">
      <Section title="Schematic_View" noBorder>
        <div className="p-4 md:p-12">
            <Link to="/projects" className="inline-flex items-center gap-2 text-textMuted hover:text-accent font-mono text-xs uppercase tracking-widest mb-8 transition-colors">
                <ArrowLeft size={14} /> Return to DB
            </Link>

            <div className="border border-border bg-black relative overflow-hidden">
                {/* Header Block */}
                <div className="p-6 md:p-16 border-b border-border bg-black">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="px-3 py-1 bg-accent text-background font-mono text-xs font-bold uppercase tracking-widest">
                            Project ID: {project.id}
                        </div>
                        <div className="h-px bg-border flex-grow"></div>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-display font-bold text-textMain uppercase leading-[0.9]">
                        {project.title}
                    </h1>
                </div>

                <div className="grid lg:grid-cols-12 min-h-[600px]">
                    {/* Left: Diagram & Logic */}
                    <div className="lg:col-span-8 border-r border-border p-6 md:p-16">
                        <div className="mb-12">
                            <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Terminal size={16} /> Mission Logic
                            </h3>
                            <p className="text-xl md:text-2xl text-textMain font-sans leading-relaxed border-l-2 border-accent pl-6">
                                {project.longDescription || project.solution}
                            </p>
                        </div>

                        {/* System Architecture Visualization */}
                        <div className="bg-black border border-border p-6 md:p-12 relative overflow-hidden corner-brackets">
                             <h4 className="font-mono text-xs text-textMuted uppercase tracking-widest mb-8">System_Flow_Diagram_v1.0</h4>
                             
                             <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-8 items-center justify-center relative z-10">
                                {project.architecture?.map((step, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="bg-[#0a0a0a] border border-border px-6 py-4 font-display font-bold uppercase tracking-wider text-textMain shadow-lg hover:border-accent transition-colors cursor-default relative group">
                                            {step}
                                            {/* Connector Dot */}
                                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-textMuted group-hover:bg-accent transition-colors"></div>
                                        </div>
                                        {idx < (project.architecture?.length || 0) - 1 && (
                                            <div className="w-px h-8 md:w-8 md:h-px bg-border"></div>
                                        )}
                                    </React.Fragment>
                                ))}
                             </div>
                        </div>

                        <div className="mt-12 grid md:grid-cols-2 gap-8">
                             <div>
                                <h4 className="font-mono text-xs text-textMuted uppercase tracking-widest mb-4">Problem_Vector</h4>
                                <p className="text-sm text-textMuted leading-relaxed">{project.problem}</p>
                             </div>
                             <div>
                                <h4 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">Outcome_Metric</h4>
                                <p className="text-sm text-textMain leading-relaxed font-bold">{project.result}</p>
                             </div>
                        </div>
                    </div>

                    {/* Right: Stack & Meta */}
                    <div className="lg:col-span-4 bg-black p-6 md:p-12 flex flex-col">
                        <div className="mb-12">
                             <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Layers size={16} /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map(tech => (
                                    <span key={tech} className="px-3 py-2 bg-[#0a0a0a] border border-border text-xs font-mono uppercase text-textMain flex items-center gap-2 w-full">
                                        <div className="w-1.5 h-1.5 bg-accent"></div>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                         <div className="mt-auto">
                            <h3 className="font-mono text-sm text-textMuted uppercase tracking-widest mb-6 flex items-center gap-2">
                                <GitBranch size={16} /> Repository
                            </h3>
                            <div className="space-y-4">
                                {project.repoUrl ? (
                                    <a href={project.repoUrl} className="block w-full py-4 bg-textMain text-background text-center font-display font-bold text-xl uppercase hover:bg-accent transition-colors">
                                        Access Source
                                    </a>
                                ) : (
                                    <div className="block w-full py-4 border border-dashed border-border text-textMuted text-center font-mono text-xs uppercase opacity-50 cursor-not-allowed">
                                        Source Private
                                    </div>
                                )}
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </Section>
    </div>
  );
};