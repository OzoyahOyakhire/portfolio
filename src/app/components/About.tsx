import { Code2, Layers, Zap, Users } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm mb-6">
              About Me
            </div>
            <h2 className="text-5xl mb-6">
              Product-minded developer who ships.
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              I don't just write code — I solve problems. With a focus on
              frontend engineering and product thinking, I build applications
              that users love and businesses need.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every line of code is written with performance, scalability, and
              user experience in mind. I thrive at the intersection of design
              and engineering, turning complex requirements into elegant
              solutions.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-3xl mb-2">3+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="flex-1 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-3xl mb-2">20+</div>
                <div className="text-sm text-gray-600">Projects Shipped</div>
              </div>
              <div className="flex-1 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-3xl mb-2">100%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative h-[500px]">
            <div className="absolute top-0 right-0 w-64 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 shadow-xl transform rotate-3">
              <Code2 className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg mb-2">Clean Code</h3>
              <p className="text-sm text-gray-600">
                Maintainable, scalable architecture
              </p>
            </div>

            <div className="absolute top-20 left-0 w-64 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-gray-200 shadow-xl transform -rotate-3">
              <Users className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="text-lg mb-2">User-Centered</h3>
              <p className="text-sm text-gray-600">
                Design with real user needs first
              </p>
            </div>

            <div className="absolute bottom-20 right-12 w-64 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-gray-200 shadow-xl transform rotate-2">
              <Zap className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg mb-2">Performance</h3>
              <p className="text-sm text-gray-600">
                Optimized for speed and efficiency
              </p>
            </div>

            <div className="absolute bottom-0 left-12 w-64 p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-gray-200 shadow-xl transform -rotate-2">
              <Layers className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="text-lg mb-2">Full Stack</h3>
              <p className="text-sm text-gray-600">
                Frontend to deployment expertise
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
