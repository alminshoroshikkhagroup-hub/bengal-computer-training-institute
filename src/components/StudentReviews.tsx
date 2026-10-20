import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { Star, Quote, Award, CheckCircle } from 'lucide-react';

export const StudentReviews: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>
              {language === 'bn' ? 'সফলতার গল্প ও পর্যালোচনা' : 'Success Stories & Reviews'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {language === 'bn' ? (
              <>শিক্ষার্থীদের বাস্তব <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">অভিজ্ঞতা ও সাফল্য</span></>
            ) : (
              <>Student Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Experiences & Success</span></>
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            {language === 'bn' 
              ? '২০১৬ সাল থেকে হাজারো শিক্ষার্থী বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট থেকে প্রশিক্ষণ নিয়ে দেশ-বিদেশে প্রতিষ্ঠিত।'
              : 'Since 2016, thousands of graduates from Bengal Computer Training Institute have built successful tech careers both in Bangladesh and globally.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-xl"
            >
              <div className="space-y-4">
                {/* Rating stars & Quote */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{language === 'bn' ? item.reviewBn : (item.reviewEn || item.reviewBn)}"
                </p>

                {item.earningsOrJob && (
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.earningsOrJob}</span>
                  </div>
                )}
              </div>

              {/* Author info */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-slate-950 font-black text-sm">
                  {item.name.slice(0, 1)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {item.role}
                  </p>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {language === 'bn' ? `কোর্স: ${item.course}` : `Course: ${item.course}`}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
