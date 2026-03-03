import { Search, Lightbulb, Code, TestTube, Rocket } from 'lucide-react';

export function Process() {
  const steps = [
    {
      icon: Search,
      title: 'Understand the problem',
      description: 'Deep dive into user needs, business goals, and technical constraints',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lightbulb,
      title: 'Design the solution',
      description: 'Create intuitive flows, wireframes, and prototypes with stakeholder feedback',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Code,
      title: 'Build scalable architecture',
      description: 'Write clean, maintainable code with performance and scalability in mind',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TestTube,
      title: 'Test & refine',
      description: 'Rigorous testing, user feedback, and iterative improvements',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Rocket,
      title: 'Launch & iterate',
      description: 'Deploy with confidence and continuously improve based on real data',
      color: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <section id="process" className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-sm mb-6">
            How I Work
          </div>
          <h2 className="text-5xl mb-6">
            A proven process for shipping products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structured, iterative approach that balances speed with quality.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 -translate-x-1/2" />

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative">
                  <div className={`flex flex-col md:flex-row gap-8 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="inline-block p-8 rounded-2xl bg-white shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${step.color}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl mb-2">
                              {step.title}
                            </h3>
                            <p className="text-gray-600">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:block flex-shrink-0 w-12 h-12 rounded-full bg-white border-4 border-gray-200 shadow-lg flex items-center justify-center relative z-10">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${step.color}`} />
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}