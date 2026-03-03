import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
       
          <div>
            <h3 className="text-2xl text-white mb-3">
              Ozoyah Oyakhire
            </h3>
            <p className="text-gray-400 mb-4">
              Frontend Developer & Product Engineer
            </p>
            <p className="text-sm text-gray-500">
              Building digital products that make a difference.
            </p>
          </div>

          
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-300 hover:text-white transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

       
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
              Connect
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://github.com/OzoyahOyakhire"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/oyakhire-justice-888a4b344"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/heyOzed"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:justiceoyakhire27@gmail.com?subject=Project Inquiry"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-500">
              Open to new opportunities and collaborations.
            </p>
          </div>
        </div>

       
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Ozoyah Oyakhire. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            Designed & built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> 
            </p>
        </div>
      </div>
    </footer>
  );
}