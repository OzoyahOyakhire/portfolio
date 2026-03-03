import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      quote: " Working with Ozoyah was a huge pleasure and pleasant experience, he understood the project brief completely, he was able to work from my wireframe and website mock up creating exactly what i wanted. The technical functionalities all work perfectly, I highly recommend his website services as he is a capable web developer",
      author: "Jennifer Onah",
      role: "Founder & Creative Director",
      rating: 5
    },
    {
      quote: "Ozoyah is a highly skilled and reliable website developer. He combines clean design with strong functionality, delivering websites that are both visually impressive to use. Professional, attentive to detail and alway on time. I highly recommend him",
      author: "Segun",
      role: "Freelance Designer",
      rating: 4
    },
    {
      quote: "Incredible frontend skills combined with product thinking. Alex delivered ahead of schedule and the code quality was outstanding. Would hire again in a heartbeat.",
      author: "Emma Rodriguez",
      role: "CTO at GrowthLabs",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-32 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm mb-6">
            Testimonials
          </div>
          <h2 className="text-5xl mb-6">
            What people say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take my word for it — here's what clients have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-gray-900" />
              </div>

             
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

             
              <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}