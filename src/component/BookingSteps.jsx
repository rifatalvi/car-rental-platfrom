
import { Search, Shield, Key, CheckCircle2 } from "lucide-react";

const BookingSteps = () => {
  const steps = [
    {
      id: "01",
      icon: <Search className="text-blue-600" size={24} />,
      title: "Discover Perfect Car",
      description: "Browse our dynamic verified grid catalog framework. Filter operations by custom vehicle classifications parameters like Luxury, Sedan, SUV smoothly."
    },
    {
      id: "02",
      icon: <Shield className="text-emerald-600" size={24} />,
      title: "Secure Verification",
      description: "Log in safely with protected validation systems. Provide optional driver parameters setup profiles or key operational notes instantly before reservation triggers."
    },
    {
      id: "03",
      icon: <Key className="text-amber-600" size={24} />,
      title: "Pick Up & Drive",
      description: "Confirm absolute scheduling matrices allocation rules, meet verification specifications logs at coordinate pickup destination and receive premium key logs."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
          <CheckCircle2 size={12} className="text-blue-600" />
          <span>Execution Matrix</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">
          How DriveFleet Works
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          Get behind the steering wheels of absolute pristine high-performance engineering blocks in three simplified step actions layers.
        </p>
      </div>

      {/* Grid list elements formatting steps layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Decorative horizontal connecting line path structure for desktop interfaces */}
        <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue-100 via-gray-100 to-amber-100 -z-10"></div>

        {steps.map((step) => (
          <div 
            key={step.id}
            className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition relative flex flex-col items-center text-center group"
          >
            {/* Serial absolute top tracking code element block layout */}
            <span className="absolute top-4 right-5 text-4xl font-black text-gray-100 group-hover:text-blue-50/70 transition-colors select-none">
              {step.id}
            </span>

            <div className="p-4 bg-gray-50 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              {step.icon}
            </div>

            <h3 className="font-extrabold text-lg text-gray-900 mb-2 tracking-tight">
              {step.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-normal">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingSteps;