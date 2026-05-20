
import Link from 'next/link';
import { Tag, Calendar, Clock, ArrowRight } from "lucide-react";

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      badge: "Weekend Getaway",
      title: "Save 20% on Luxury SUVs",
      description: "Book any premium SUV from Friday afternoon to Sunday evening and unlock a flat 20% deduction automatically generated in your total rent log.",
      validity: "Valid till June 30, 2026",
      bgClass: "from-blue-600 to-indigo-700 text-white"
    },
    {
      id: 2,
      badge: "Long Term Fleet",
      title: "Rent 7+ Days, Get 1 Day Free",
      description: "Planning an extended cross-country tour? Register a car listing for more than a week and the daily price count for the final day drops to absolute zero.",
      validity: "Limited Corporate Offer",
      bgClass: "from-slate-900 to-gray-800 text-white border border-gray-700"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white rounded-3xl my-10 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Tag size={12} />
            <span>Exclusive Deals</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">
            Drive More, Pay Less
          </h2>
          <p className="text-gray-500 max-w-xl text-sm sm:text-base">
            Maximize your traveling mileage parameter setup with handpicked seasonal promotional booking logic layers customized for drivers.
          </p>
        </div>
      </div>

      {/* Grid container formatting 2 high impact banners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {offers.map((offer) => (
          <div 
            key={offer.id}
            className={`p-8 rounded-2xl bg-gradient-to-br ${offer.bgClass} flex flex-col justify-between space-y-8 relative overflow-hidden group shadow-lg`}
          >
            {/* Ambient visual gradient blob decoration */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

            <div className="space-y-4 relative z-10">
              <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold tracking-wide uppercase">
                {offer.badge}
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight leading-tight">{offer.title}</h3>
              <p className="text-gray-200/90 text-sm font-light leading-relaxed">
                {offer.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                <Calendar size={14} className="text-blue-400" />
                <span>{offer.validity}</span>
              </div>
              <Link 
                href="/explore-cars"
                className="inline-flex items-center gap-1.5 text-sm font-bold bg-white text-blue-600 px-4 py-2.5 rounded-xl hover:bg-blue-50 transition active:scale-95 shadow-sm"
              >
                <span>Claim Offer</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;