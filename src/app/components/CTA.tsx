import { ArrowRight, Mail, Calendar } from 'lucide-react';

export function CTA() {
  return (
    <section id="contact" className="py-32 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
  
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-6xl text-white mb-6">
          Let's build something great together.
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Have a project in mind? Looking for a product-focused developer? Let's talk about how we can work together.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="mailto:justiceoyakhire27@gmail.com?subject=Project Inquiry"
            
            className="group px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Send me an email
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href='https://wa.link/tlxlma'  target="_blank"
  rel="noopener noreferrer">
        <button className="px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Schedule a call
          </button>
          </a>
         
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-300">
          <a href="mailto:justiceoyakhire27@gmail.com" className="hover:text-white transition-colors">
            justiceoyakhire27@gmail.com
          </a>
          <span className="hidden sm:block">•</span>
          <a
            href="https://linkedin.com/in/oyakhire-justice-888a4b344"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <span className="hidden sm:block">•</span>
          <a
            href="https://github.com/OzoyahOyakhire"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}