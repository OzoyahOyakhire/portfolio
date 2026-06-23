import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 px-6 lg:px-12 border-t border-foreground/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-sm bg-foreground flex items-center justify-center">
                <span className="text-background font-heading text-sm font-bold tracking-tight">JO</span>
              </div>
              <div>
                <div className="text-foreground font-heading font-semibold">
                  Justice Oyakhire
                </div>
                <div className="text-foreground/30 text-sm font-mono">
                  Crafts and Code Studio
                </div>
              </div>
            </div>
            <p className="text-foreground/20 leading-relaxed max-w-sm text-sm">
              Designing and building premium digital experiences that look exceptional and perform exceptionally.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono text-foreground/15 tracking-[0.2em] uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'About', href: '#about' },
                { name: 'Work', href: '#projects' },
                { name: 'Services', href: '#services' },
                { name: 'Process', href: '#process' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/25 hover:text-foreground/60 transition-colors duration-300 font-mono"
                    data-hover
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono text-foreground/15 tracking-[0.2em] uppercase mb-6">
              Connect
            </h4>
            <div className="flex gap-4 mb-8">
              {[
                { Icon: Github, href: 'https://github.com/OzoyahOyakhire', label: 'GitHub' },
                { Icon: Linkedin, href: 'https://linkedin.com/in/oyakhire-justice-888a4b344', label: 'LinkedIn' },
                { Icon: Twitter, href: 'https://twitter.com/heyOzed', label: 'Twitter' },
                { Icon: Mail, href: 'mailto:justiceoyakhire27@gmail.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-sm border border-foreground/5 hover:border-foreground/10 flex items-center justify-center text-foreground/20 hover:text-gold hover:border-gold/20 transition-all duration-300"
                  data-hover
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href="mailto:justiceoyakhire27@gmail.com"
              className="text-sm text-foreground/20 hover:text-gold transition-colors duration-300 font-mono"
              data-hover
            >
              justiceoyakhire27@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-mono text-foreground/10">
            &copy; {year} Justice Oyakhire. All rights reserved.
          </p>
          <motion.p
            className="text-xs font-mono text-foreground/10"
            whileHover={{ color: 'rgba(218, 165, 32, 0.5)' }}
          >
            Designed & Engineered with precision
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
