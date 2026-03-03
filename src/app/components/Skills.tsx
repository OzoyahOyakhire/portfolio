import { Code, Palette, Settings } from 'lucide-react';

export function Skills() {
  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend Engineering',
      description: 'Building responsive, performant user interfaces',
      skills: [
        'React & Next.js',
        'TypeScript',
        'Tailwind CSS',
        'State Management',
        'Web Performance',
        'Accessibility (a11y)'
      ],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'Product & UX Thinking',
      description: 'Designing with users and business goals in mind',
      skills: [
        'User Research',
        'Product Strategy',
        'Design Systems',
        'Prototyping',
        'A/B Testing',
        'Analytics Integration'
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Settings,
      title: 'Engineering Practices',
      description: 'Building maintainable, scalable applications',
      skills: [
        'Git & CI/CD',
        'Testing (Jest, Cypress)',
        'API Integration',
        'Code Review',
        'Agile/Scrum',
        'Technical Documentation'
      ],
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="skills" className="py-32 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm mb-6">
            Skills & Expertise
          </div>
          <h2 className="text-5xl mb-6">
            Full-spectrum product development
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From ideation to deployment, I bring the skills needed to build complete digital products.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.gradient} mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>

                  {/* Skills list */}
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.gradient}`} />
                        <span className="text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}