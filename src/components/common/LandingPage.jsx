// LandingPage.jsx (Navbar code removed)
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"; // Import your Navbar component
import {
  ArrowRight,
  Users,
  Wallet,
  TrendingUp,
  Star,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  CheckCircle,
  Share2,
  DollarSign,
  Zap,
  Award,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const LandingPage = ({ onRegisterClick }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "how-it-works", "features", "testimonials", "faq", "cta"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 overflow-hidden">
      {/* Premium Background Graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Geometric patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#3b82f6" strokeWidth="1"/>
              </pattern>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#7c3aed"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
            <rect width="100%" height="100%" fill="url(#dots)"/>
          </svg>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-xl animate-float delay-700" />
        <div className="absolute bottom-40 left-1/3 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-xl animate-float delay-300" />
        
        {/* Modern line art */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,200 Q400,50 800,250 T1600,150" stroke="url(#lineGradient)" strokeWidth="2" fill="none"/>
          <path d="M0,400 Q200,350 400,500 T800,400 T1200,550 T1600,450" stroke="url(#lineGradient)" strokeWidth="2" fill="none"/>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6"/>
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* External Navbar Component */}
      {/* <Navbar
        onRegisterClick={onRegisterClick}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      /> */}

      {/* ================= HERO SECTION ================= */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute top-20 right-10 opacity-20">
          <Sparkles className="w-32 h-32 text-blue-400" />
        </div>
        
        <div className="max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <Zap size={16} className="animate-pulse" />
            <span>Join 50,000+ Earners Today</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Turn Connections
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Into Income
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Earn money by referring friends to top brands. Simple, fast, and secure — start earning with just a few clicks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onRegisterClick}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Earning Now
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="group inline-flex items-center gap-3 border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:shadow-lg"
            >
              Learn How
              <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Stats with enhanced design */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl rounded-3xl" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto relative z-10 bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
              {[
                { value: "$2M+", label: "Paid Out", color: "from-blue-500 to-cyan-500" },
                { value: "50K+", label: "Active Earners", color: "from-indigo-500 to-purple-500" },
                { value: "500+", label: "Brand Partners", color: "from-purple-500 to-pink-500" },
                { value: "24h", label: "Payout Time", color: "from-emerald-500 to-green-500" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4">
                  <div className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 mt-2 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section id="how-it-works" className="relative py-24 px-4">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
              <TrendingUp size={24} />
              <span className="font-semibold">EASY PROCESS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start earning in three simple steps. No experience needed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Modern connecting line */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 z-0">
              <div className="absolute left-0 top-1/2 w-3 h-3 -translate-y-1/2 bg-blue-500 rounded-full animate-pulse" />
              <div className="absolute left-1/2 top-1/2 w-3 h-3 -translate-y-1/2 -translate-x-1/2 bg-indigo-500 rounded-full animate-pulse delay-300" />
              <div className="absolute right-0 top-1/2 w-3 h-3 -translate-y-1/2 bg-purple-500 rounded-full animate-pulse delay-600" />
            </div>
            
            {[
              { 
                number: "01",
                icon: <Users className="text-white" size={32} />,
                title: "Sign Up Free",
                description: "Create your free EarnHub account in under 2 minutes. No credit card required.",
                gradient: "from-blue-500 to-cyan-500",
                delay: "0"
              },
              { 
                number: "02",
                icon: <Share2 className="text-white" size={32} />,
                title: "Share Your Link",
                description: "Share your unique referral link with friends via social media, email, or messaging apps.",
                gradient: "from-indigo-500 to-purple-500",
                delay: "200"
              },
              { 
                number: "03",
                icon: <Wallet className="text-white" size={32} />,
                title: "Earn & Withdraw",
                description: "Get paid for every successful referral. Withdraw instantly to your bank or e-wallet.",
                gradient: "from-emerald-500 to-green-500",
                delay: "400"
              },
            ].map((step, index) => (
              <Step key={index} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent -z-10" />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-indigo-600 mb-4">
              <Award size={24} />
              <span className="font-semibold">PREMIUM FEATURES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose EarnHub</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the most user-friendly and rewarding referral platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck className="text-white" size={24} />, title: "Bank-Level Security", description: "Your earnings and data are protected with enterprise-grade encryption.", gradient: "from-blue-500/20 to-blue-500/5", iconGradient: "from-blue-500 to-cyan-500" },
              { icon: <TrendingUp className="text-white" size={24} />, title: "Real-Time Analytics", description: "Track your referrals, earnings, and performance with our intuitive dashboard.", gradient: "from-indigo-500/20 to-indigo-500/5", iconGradient: "from-indigo-500 to-purple-500" },
              { icon: <Zap className="text-white" size={24} />, title: "Instant Payouts", description: "Get your money within 24 hours. No waiting periods or hidden fees.", gradient: "from-amber-500/20 to-amber-500/5", iconGradient: "from-amber-500 to-yellow-500" },
              { icon: <Award className="text-white" size={24} />, title: "Bonus Rewards", description: "Earn extra bonuses for reaching milestones and maintaining activity streaks.", gradient: "from-purple-500/20 to-purple-500/5", iconGradient: "from-purple-500 to-pink-500" },
              { icon: <Users className="text-white" size={24} />, title: "Multi-Platform Sharing", description: "Share links directly to WhatsApp, Facebook, Instagram, Twitter, and more.", gradient: "from-cyan-500/20 to-cyan-500/5", iconGradient: "from-cyan-500 to-blue-500" },
              { icon: <DollarSign className="text-white" size={24} />, title: "High Commission Rates", description: "Earn up to 30% commission on every referral, higher than industry average.", gradient: "from-emerald-500/20 to-emerald-500/5", iconGradient: "from-emerald-500 to-green-500" },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section id="testimonials" className="relative py-24 px-4">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-indigo-50/30 to-transparent -z-10" />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-purple-600 mb-4">
              <Star size={24} />
              <span className="font-semibold">TRUSTED BY THOUSANDS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our community of earners has to say about their experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Rahul Sharma"
              role="Student"
              earnings="$1,250"
              imageColor="bg-gradient-to-br from-blue-100 to-blue-200"
              text="EarnHub helped me pay my tuition fees. I've earned over $1,200 just by referring friends to apps I already use."
              rating={5}
            />
            <TestimonialCard 
              name="Anjali Patel"
              role="Freelancer"
              earnings="$3,400"
              imageColor="bg-gradient-to-br from-purple-100 to-pink-100"
              text="As a freelancer, this passive income stream has been a game-changer. The payout process is incredibly fast."
              rating={5}
            />
            <TestimonialCard 
              name="Amit Kumar"
              role="Small Business Owner"
              earnings="$5,800"
              imageColor="bg-gradient-to-br from-emerald-100 to-green-100"
              text="I've tried several referral platforms, but EarnHub offers the best commission rates and user experience."
              rating={5}
            />
          </div>
          
          {/* Enhanced stats */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl rounded-3xl" />
            <div className="relative bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-white/30">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "4.9/5", label: "User Rating", icon: <Star className="text-yellow-500" size={24} /> },
                  { value: "98%", label: "Payout Success", icon: <CheckCircle className="text-green-500" size={24} /> },
                  { value: "24/7", label: "Support", icon: <ShieldCheck className="text-blue-500" size={24} /> },
                  { value: "10K+", label: "Monthly Payouts", icon: <DollarSign className="text-purple-500" size={24} /> },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-gray-600 mt-2 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent -z-10" />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-cyan-600 mb-4">
              <HelpCircle size={24} />
              <span className="font-semibold">GET ANSWERS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to the most common questions about EarnHub.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <button
                  className="w-full p-8 text-left flex justify-between items-center hover:bg-blue-50/30 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <HelpCircle className="text-blue-600" size={24} />
                    </div>
                    <span className="text-xl font-semibold text-gray-800">{faq.question}</span>
                  </div>
                  <ChevronDown 
                    className={`text-blue-500 transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                    size={28}
                  />
                </button>
                <div 
                  className={`px-8 overflow-hidden transition-all duration-500 ${
                    expandedFaq === index ? 'pb-8 max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 text-lg leading-relaxed">{faq.answer}</p>
                  {faq.additional && (
                    <div className="mt-6 pl-6 border-l-2 border-blue-200">
                      <ul className="space-y-3">
                        {faq.additional.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="text-green-500" size={14} />
                            </div>
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section id="cta" className="relative py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-10" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl animate-pulse delay-500" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join thousands of earners today. It's free to sign up and takes less than 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button
              onClick={onRegisterClick}
              className="group bg-white text-blue-600 px-12 py-5 rounded-2xl text-xl font-bold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-3"
            >
              Create Free Account
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="border-2 border-white/50 text-white px-12 py-5 rounded-2xl text-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              Watch Demo
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>No credit card required</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-white/50" />
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Free forever plan</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-white/50" />
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative bg-gray-900 text-white py-16 px-4">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                  <DollarSign size={28} />
                </div>
                <span className="text-2xl font-bold">EarnHub</span>
              </div>
              <p className="text-gray-400 mb-6">
                Turning connections into income since 2020. Join our community of successful earners.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Quick Links",
                links: ["How It Works", "Features", "Testimonials", "FAQ"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
              },
              {
                title: "Contact",
                links: ["support@earnhub.com", "+1 (555) 123-4567", "Live Chat", "Help Center"],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-6 text-white">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => column.title === "Quick Links" ? scrollToSection(link.toLowerCase().replace(" ", "-")) : null}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} EarnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Component for How It Works steps
const Step = ({ number, icon, title, description, gradient, delay }) => (
  <div 
    className="relative z-10 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl transform group-hover:scale-105 transition-transform duration-500 opacity-0 group-hover:opacity-100 blur-xl" />
    <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden">
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/5 to-indigo-500/5" />
     <div className="flex justify-center mb-8">
  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${gradient} text-white text-3xl font-bold shadow-lg`}>
    {number}
  </div>
</div>
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-md`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 text-blue-600 font-medium">
          <span>Learn more</span>
          <ChevronRight size={18} />
        </div>
      </div>
    </div>
  </div>
);

// Component for Feature Cards
const FeatureCard = ({ icon, title, description, gradient, iconGradient }) => (
  <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
    <div className="relative z-10">
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${iconGradient} mb-6 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <div className="mt-6 pt-4 border-t border-gray-200/30">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Explore feature</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  </div>
);

// Component for Testimonials
const TestimonialCard = ({ name, role, earnings, imageColor, text, rating }) => (
  <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
    <div className="p-8">
      <div className="flex items-center gap-6 mb-8">
        <div className={`w-20 h-20 rounded-2xl ${imageColor} flex items-center justify-center text-3xl font-bold text-gray-800 shadow-md`}>
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-2xl font-bold text-gray-800">{name}</h4>
          <p className="text-gray-600 mb-2">{role}</p>
          <div className="flex items-center gap-1">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="text-yellow-500 fill-yellow-500" size={18} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-lg italic mb-8 leading-relaxed">"{text}"</p>
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Total Earnings:</span>
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-500">
            {earnings}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// FAQ Data
const faqData = [
  {
    question: "Is EarnHub really free?",
    answer: "Yes, EarnHub is completely free to join. There are no hidden fees, subscription charges, or upfront costs. You only earn money, never pay.",
    additional: ["Free registration", "No monthly fees", "No transaction fees on earnings"]
  },
  {
    question: "How much can I earn with EarnHub?",
    answer: "Earnings vary based on your referrals and the brands you promote. Most users earn between $50-$500 per month, with top earners making over $2,000 monthly.",
    additional: ["Average: $50-$500/month", "Top earners: $2,000+/month", "Bonus programs available"]
  },
  {
    question: "How do I withdraw my earnings?",
    answer: "Withdrawals are processed within 24 hours directly to your bank account, PayPal, or popular e-wallets. Minimum withdrawal is just $10.",
    additional: ["24-hour processing", "Multiple payout methods", "$10 minimum withdrawal"]
  },
  {
    question: "Can I refer people internationally?",
    answer: "Yes! EarnHub works globally. You can refer friends from any country as long as the brand you're promoting operates in their region.",
  },
  {
    question: "What support is available if I need help?",
    answer: "We offer 24/7 customer support via email, live chat, and our comprehensive help center. Average response time is under 15 minutes.",
  }
];

export default LandingPage;