import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Heart, Sparkles, MessageCircle, Coffee, Users, Zap, Star, ArrowRight, Mail, Phone, Calendar, Clock, Send, X, Check, DollarSign, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './App.css';

// Import photos
import photo1 from './assets/photo1.png';
import photo2 from './assets/photo2.jpeg';
import photo3 from './assets/photo3.jpeg';
import photo4 from './assets/photo4.jpg';
import photo5 from './assets/photo5.jpeg';
import photo6 from './assets/photo6.jpg';
import photo7 from './assets/photo7.jpg';

const FriendBookingWebsite = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'message', // 'message' or 'booking'
    date: '',
    time: '',
    duration: '60',
    sessionType: '',
    otherSessionType: '',
    description: ''
  });
  const [formStatus, setFormStatus] = useState(''); // 'success', 'error', or ''
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  // Form handling functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
    setFormStatus('loading');
    
    try {
      // Web3Forms - Direct email without registration
      const formDataObj = new FormData();
      formDataObj.append('access_key', '1119f7e7-3751-486b-90b6-8472afdca6ea'); // Your Web3Forms access key
      formDataObj.append('subject', `New Contact from RentMe - ${formData.name}`);
      formDataObj.append('from_name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('message', formData.message || formData.description || 'No message');
      formDataObj.append('type', formData.type);
      
      if (formData.type === 'booking') {
        formDataObj.append('date', formData.date || 'Not specified');
        formDataObj.append('time', formData.time || 'Not specified');
        formDataObj.append('duration', formData.duration || 'Not specified');
        formDataObj.append('session_type', formData.sessionType === 'other' ? formData.otherSessionType : formData.sessionType || 'Not specified');
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj
      });

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      setFormStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus('');
        setFormData({
          name: '',
          email: '',
          message: '',
          description: '',
          type: 'message',
          date: '',
          time: '',
          duration: '',
          sessionType: '',
          otherSessionType: ''
        });
        if (formData.type === 'booking') {
          setShowBookingModal(false);
        } else {
          setShowContactModal(false);
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
    }
  };

  const openContactModal = () => {
    setFormData(prev => ({ ...prev, type: 'message' }));
    setShowContactModal(true);
    setFormStatus('');
  };

  const openBookingModal = () => {
    setFormData(prev => ({ ...prev, type: 'booking' }));
    setShowBookingModal(true);
    setFormStatus('');
  };

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const ScrollReveal = ({ children, delay = 0, immediate = false }) => {
    const [isVisible, setIsVisible] = useState(immediate);
    const ref = useRef(null);

    useEffect(() => {
      if (immediate) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [delay, immediate]);

    return (
      <div
        ref={ref}
        className={`transition-all duration-1000 pointer-events-auto relative z-10 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        style={{ pointerEvents: 'auto' }}
      >
        {children}
      </div>
    );
  };

  const GradientBlob = ({ color, size, top, left, delay }) => (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 animate-blob ${color} ${size} pointer-events-none`}
      style={{
        top,
        left,
        animationDelay: delay,
      }}
    />
  );

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-colors duration-500`}>
      <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 overflow-hidden">
        
        {/* Clean Background - No Particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Subtle gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-orange-900/10"></div>
        </div>

        {/* Gradient Blobs */}
        <GradientBlob color="bg-purple-500" size="w-96 h-96" top="10%" left="10%" delay="0s" />
        <GradientBlob color="bg-pink-500" size="w-80 h-80" top="50%" left="70%" delay="2s" />
        <GradientBlob color="bg-orange-500" size="w-72 h-72" top="80%" left="20%" delay="4s" />
        <GradientBlob color="bg-blue-500" size="w-64 h-64" top="30%" left="80%" delay="6s" />

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-6 right-6 z-50 p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl hover:scale-110 transition-all duration-300 hover:rotate-180 group"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-purple-600 group-hover:text-purple-500" />
          )}
        </button>

        {/* Hero Section with Photo 1 - Mobile Optimized */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-12 sm:py-16 md:py-20 z-10">
          <div className="max-w-7xl mx-auto">
            {/* Mobile: Photo first, Desktop: Side by side */}
            <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
              {/* Photo 1 - Mobile First */}
              <div className="lg:hidden">
                <ScrollReveal delay={200} immediate={true}>
                  <div className="relative group mb-8">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105 mx-auto max-w-sm">
                      <div className="relative h-[320px] sm:h-[400px] md:h-[450px] overflow-hidden">
                        <img 
                          src={photo1} 
                          alt="Hero" 
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="text-white text-sm sm:text-base font-bold mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              Your Safe Space
                            </h3>
                            <p className="text-white/70 text-xs sm:text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                              Where you can be completely yourself
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Animated background blob - smaller on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl -rotate-1 scale-105 -z-10 blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-700 mx-auto max-w-sm"></div>
                    
                    {/* Floating elements - smaller on mobile */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Content */}
              <div className="text-center lg:text-left lg:order-1 w-full px-2 sm:px-4">
                <ScrollReveal immediate={true}>
                  <div className="flex justify-center lg:justify-start mb-6">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-600/30 dark:to-pink-600/30 rounded-full backdrop-blur-xl border border-purple-300/30 dark:border-purple-500/30">
                      <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300">
                        Real conversations, real support
                      </span>
                    </div>
                  </div>
                  <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent leading-tight animate-gradient px-2">
                    Book me as a friend.
                  </h1>
                  <p className="text-base sm:text-lg md:text-2xl lg:text-3xl mb-4 sm:mb-6 text-gray-700 dark:text-gray-300 font-light px-2">
                    No bullshit. No scams. No pressure.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-2xl mb-6 sm:mb-8 text-gray-600 dark:text-gray-400 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto lg:mx-0 leading-relaxed px-2">
                    This isn't a pitch. This isn't a trick. This is just a space where you can talk — 
                    freely, honestly, without pretending you've got everything figured out.
                  </p>
                  {/* Buttons moved OUTSIDE ScrollReveal */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center z-40 relative w-full px-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openBookingModal();
                      }}
                      className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white rounded-full font-semibold text-sm sm:text-base lg:text-xl shadow-2xl hover:shadow-purple-500/50 dark:hover:shadow-purple-400/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 z-50 relative"
                    >
                      Book a Session
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openContactModal();
                      }}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl text-gray-800 dark:text-white rounded-full font-semibold text-sm sm:text-base lg:text-xl border-2 border-purple-300 dark:border-purple-600 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 z-50 relative"
                    >
                      Send Message
                    </button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Photo 1 - Desktop Only */}
              <div className="hidden lg:block lg:order-2">
                <ScrollReveal delay={300} immediate={true}>
                  <div className="relative group">
                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700 hover:scale-105">
                      <div className="relative h-[400px] lg:h-[600px] overflow-hidden">
                        <img 
                          src={photo1} 
                          alt="Hero" 
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                            <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              Your Safe Space
                            </h3>
                            <p className="text-white/80 sm:text-white/90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                              Where you can be completely yourself
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Animated background blob */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl -rotate-3 scale-105 -z-10 blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-700"></div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For - With Photo 2 - Mobile Optimized */}
        <section className="relative py-12 sm:py-16 md:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="space-y-8 sm:space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                {/* Photo 2 - Mobile First */}
                <div className="lg:hidden">
                  <ScrollReveal delay={200} immediate={true}>
                    <div className="relative group mb-6">
                      <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500 hover:rotate-1 mx-auto max-w-xs sm:max-w-sm">
                        <div className="relative h-[240px] sm:h-[320px] overflow-hidden">
                          <img 
                            src={photo2} 
                            alt="Real Conversations" 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute bottom-3 left-3 right-3">
                              <h3 className="text-white text-sm sm:text-base font-bold mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                Real Conversations
                              </h3>
                              <p className="text-white/70 text-xs sm:text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                Where authenticity meets understanding
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Floating elements - smaller on mobile */}
                      <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
                      <div className="absolute bottom-1 left-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  </ScrollReveal>
                </div>
                
                {/* Content */}
                <div className="order-2 lg:order-1">
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border border-purple-200/50 dark:border-purple-700/50 hover:scale-105 transition-all duration-500 hover:shadow-purple-500/30 mx-2 sm:mx-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-pink-500 animate-pulse flex-shrink-0" />
                      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white">
                        Who this is really for
                      </h2>
                    </div>
                    <div className="w-12 sm:w-16 lg:w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-4 sm:mb-6 lg:mb-8 rounded-full animate-pulse"></div>
                    <div className="space-y-2 sm:space-y-4 lg:space-y-6 text-xs sm:text-base text-gray-700 dark:text-gray-300">
                      <p className="leading-relaxed">
                        This is for you if you're <span className="font-semibold text-purple-600 dark:text-purple-400">over 18</span> and still quietly trying to understand life.
                      </p>
                      <p className="leading-relaxed">
                        If you feel like everyone else looks sorted while you're just… <span className="italic">floating</span>.
                      </p>
                      <p className="leading-relaxed">
                        If you overthink at night, replay conversations, worry about the future, and still wake up pretending everything is fine.
                      </p>
                      <p className="text-sm sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                        You don't need to be broken to be here. You just need to be human.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Photo 2 - Desktop Only */}
                <div className="order-1 lg:order-2 hidden lg:block">
                  <ScrollReveal delay={300} immediate={true}>
                    <div className="relative group">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:rotate-1">
                        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
                          <img 
                            src={photo2} 
                            alt="Real Conversations" 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                              <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                Real Conversations
                              </h3>
                              <p className="text-white/80 sm:text-white/90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                Where authenticity meets understanding
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Floating elements */}
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Simple Truth - With Photo 3 */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
                <div className="px-2 sm:px-0 text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 dark:from-orange-400 dark:via-pink-400 dark:to-purple-500 bg-clip-text text-transparent">
                    A simple truth
                  </h2>
                  <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-orange-500 to-purple-600 mb-6 sm:mb-12 rounded-full mx-auto"></div>
                  <div className="space-y-3 sm:space-y-6 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                    <p>Let's clear something first.</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                      This is not therapy. This is not coaching. This is not motivation talk.
                    </p>
                    <p>I won't give you fake positivity. I won't sell you "10 steps to success." I won't pretend life is easy.</p>
                    <p className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      This is just a real conversation — between two people — where you're allowed to think out loud.
                    </p>
                  </div>
                </div>
                
                {/* Photo 3 - Individual showcase */}
                <div>
                  <ScrollReveal delay={300} immediate={true}>
                    <div className="relative group">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:-rotate-2">
                        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                          <img 
                            src={photo3} 
                            alt="Simple Truth" 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-120 group-hover:rotate-3"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-pink-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                              <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                Raw Honesty
                              </h3>
                              <p className="text-white/80 sm:text-white/90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                No filters, no pretense, just real talk
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Floating elements */}
                      <div className="absolute top-4 left-4 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 right-4 w-3 h-3 bg-orange-400 rounded-full animate-bounce shadow-lg"></div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What You Can Talk About - With Photo 4 */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
                <div className="order-2 lg:order-1 px-2 sm:px-0">
                  <div className="bg-gradient-to-br from-purple-100/80 via-pink-100/80 to-orange-100/80 dark:from-purple-900/40 dark:via-pink-900/40 dark:to-orange-900/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border border-purple-300/50 dark:border-purple-600/50">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center">
                      <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white text-center">
                        What you can talk about
                      </h2>
                    </div>
                    <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-4 sm:mb-8 rounded-full mx-auto"></div>
                    <p className="text-sm sm:text-lg mb-6 sm:mb-8 text-gray-700 dark:text-gray-300">
                      You can talk about things you usually keep inside.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        { icon: Coffee, text: "Work stress that follows you home", color: "from-orange-400 to-red-500" },
                        { icon: Zap, text: "Money pressure you don't say out loud", color: "from-yellow-400 to-orange-500" },
                        { icon: Users, text: 'Career confusion and "what am I even doing?" thoughts', color: "from-purple-400 to-pink-500" },
                        { icon: Star, text: "Side-hustle ideas you're unsure about", color: "from-blue-400 to-purple-500" },
                        { icon: Heart, text: "Life decisions that feel too big to make alone", color: "from-pink-400 to-purple-500" },
                      ].map((item, idx) => (
                        <ScrollReveal immediate={true} key={idx}>
                          <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-4 sm:p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-purple-200/50 dark:border-purple-700/50 cursor-pointer">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:rotate-12 transition-transform flex-shrink-0`}>
                              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">{item.text}</p>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                    <ScrollReveal immediate={true}>
                      <div className="mt-6 sm:mt-8 text-center">
                        <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 mb-2 sm:mb-4">
                          You don't need a perfect topic. You don't need the right words.
                        </p>
                        <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                          We'll find clarity together.
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
                
                {/* Photo 4 - Individual showcase */}
                <div className="order-1 lg:order-2">
                  <ScrollReveal delay={300} immediate={true}>
                    <div className="relative group">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:rotate-2">
                        <div className="relative h-[400px] lg:h-[600px] overflow-hidden">
                          <img 
                            src={photo4} 
                            alt="Deep Connections" 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-125"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute bottom-6 left-6">
                              <h3 className="text-white text-xl font-bold">Deep Connections</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Floating elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-bounce shadow-lg"></div>
                      <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What I Actually Do - With Photo 5 */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
                <div className="px-2 sm:px-0 text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    What I actually do
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 max-w-4xl">
                    {[
                      { title: "Listen properly", desc: "Not waiting for my turn to speak", emoji: "👂" },
                      { title: "Hype you up", desc: "Before interviews, calls, or big moments", emoji: "💪" },
                      { title: "Give honest feedback", desc: "Tell you when ideas need work, then help improve them", emoji: "💡" },
                      { title: "Be flexible", desc: "Walk, coffee, or just sit and talk", emoji: "☕" },
                    ].map((item, idx) => (
                      <ScrollReveal immediate={true} key={idx}>
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl p-4 sm:p-6 md:p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl shadow-xl border border-purple-200/50 dark:border-purple-700/50 group cursor-pointer h-full flex flex-col justify-between">
                          <div>
                            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transition-transform duration-300">{item.emoji}</div>
                            <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                  <ScrollReveal immediate={true}>
                    <p className="text-xl sm:text-2xl font-bold text-center mt-8 sm:mt-12 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      No judgement. No labels. Just real conversation.
                    </p>
                  </ScrollReveal>
                </div>
                
                {/* Photo 5 - Individual showcase */}
                <div>
                  <ScrollReveal delay={300} immediate={true}>
                    <div className="relative group">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:-rotate-1">
                        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                          <img 
                            src={photo5} 
                            alt="What I Actually Do" 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-115 group-hover:sepia-[0.3]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                              <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                Pure Support
                              </h3>
                              <p className="text-white/80 sm:text-white/90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                I'm here to listen, not to fix
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Floating elements */}
                      <div className="absolute top-6 right-6 w-3 h-3 bg-red-400 rounded-full animate-pulse shadow-lg"></div>
                      <div className="absolute bottom-6 left-6 w-4 h-4 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Why This Exists */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="bg-gradient-to-br from-pink-200/60 via-purple-200/60 to-blue-200/60 dark:from-pink-900/40 dark:via-purple-900/40 dark:to-blue-900/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-purple-300/50 dark:border-purple-600/50 hover:scale-105 transition-all duration-500 mx-2 sm:mx-0">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Why this exists
                </h2>
                <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-6 sm:mb-8 rounded-full"></div>
                <div className="space-y-3 sm:space-y-6 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                  <p>Because life is already loud.</p>
                  <p>Everyone wants to fix you. Sell you something. Tell you how to live.</p>
                  <p>Sometimes you don't need advice. You need space.</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Space to talk. Space to think. Space to breathe.
                  </p>
                  <p className="text-base sm:text-lg italic">That's all this is.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* How People Feel After */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal immediate={true}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 dark:from-green-400 dark:via-teal-400 dark:to-blue-500 bg-clip-text text-transparent px-2">
                How people usually feel after
              </h2>
            </ScrollReveal>
            <ScrollReveal immediate={true}>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-green-200/50 dark:border-green-700/50 mx-2 sm:mx-0">
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                  <p>Most people don't leave with their life magically solved.</p>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    They leave feeling lighter. Clearer. Less alone.
                  </p>
                  <p>They stop blaming themselves so much. They understand their next step a little better.</p>
                  <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Not because someone told them what to do — but because they finally heard themselves clearly.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* How This Works - With Photo 6 */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
                <div className="order-2 lg:order-1 px-2 sm:px-0 text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-16 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-500 bg-clip-text text-transparent">
                    How this works
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {[
                      { step: "01", title: "You reach out", desc: "No long forms. No awkward explanations. Just a simple message.", color: "from-purple-500 to-pink-500" },
                      { step: "02", title: "We talk", desc: "A calm, honest conversation without pressure to impress or perform.", color: "from-pink-500 to-orange-500" },
                      { step: "03", title: "You move forward", desc: "With clarity. With confidence. Or at least with less noise in your head.", color: "from-orange-500 to-red-500" },
                    ].map((item, idx) => (
                      <ScrollReveal immediate={true} key={idx}>
                        <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl p-4 sm:p-6 rounded-2xl hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl border border-purple-200/50 dark:border-purple-700/50 group cursor-pointer pt-8 sm:pt-12">
                          <div className={`absolute -top-4 sm:-top-6 left-4 sm:left-8 w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-sm sm:text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                            {item.step}
                          </div>
                          <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-800 dark:text-white">{item.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
                
                {/* Photo 6 - Individual showcase */}
                <div className="order-1 lg:order-2">
                  <ScrollReveal delay={300} immediate={true}>
                    <div className="relative group">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:rotate-1">
                        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                          <img 
                            src={photo6} 
                            alt="How This Works" 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:contrast-125"
                          />
                          <div className="absolute inset-0 bg-gradient-to-bl from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute bottom-6 left-6 right-6">
                              <h3 className="text-white text-xl font-bold">Authentic Space</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Floating elements */}
                      <div className="absolute bottom-4 right-4 w-4 h-4 bg-purple-400 rounded-full animate-bounce shadow-lg"></div>
                      <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="bg-gradient-to-br from-green-100/80 via-emerald-100/80 to-teal-100/80 dark:from-green-900/40 dark:via-emerald-900/40 dark:to-teal-900/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-green-300/50 dark:border-green-700/50 mx-2 sm:mx-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
                    Investment in Clarity
                  </h2>
                </div>
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mb-6 sm:mb-8 rounded-full"></div>
                
                <div className="text-center mb-6 sm:mb-8">
                  <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-200/50 dark:bg-green-800/30 rounded-full backdrop-blur-xl border border-green-300/50 dark:border-green-600/50 mb-4 sm:mb-6">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">$100</span>
                    </div>
                    <span className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">per session</span>
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 px-2">
                    Quality conversation time that can change your perspective
                  </p>
                  
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-green-200/50 dark:border-green-700/50">
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 italic mb-2 sm:mb-3">
                      <span className="font-semibold text-green-600 dark:text-green-400">Negotiable</span> - 
                      Your situation matters more than the price
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      If you're genuinely in need but the cost is a barrier, let's talk about it. 
                      The goal is to help, not to create financial stress.
                    </p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-3 gap-3 sm:gap-6 text-center">
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-green-200/50 dark:border-green-700/50">
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">30 min</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Quick clarity session</p>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-green-200/50 dark:border-green-700/50">
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">60 min</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Standard session</p>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-green-200/50 dark:border-green-700/50">
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">90 min</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Deep dive session</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="text-center mb-8 sm:mb-12 px-2">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                  <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
              </div>
            </ScrollReveal>
            
            {/* FAQs moved OUTSIDE ScrollReveal */}
            <div className="space-y-3 sm:space-y-4 z-40 relative px-2 sm:px-0">
              {[
                {
                  question: "Is this therapy or counseling?",
                  answer: "No, this is not therapy or counseling. I'm not a licensed therapist. This is simply a conversation between two people where you can speak freely without judgment. Think of it as talking to a wise friend who listens without agenda. I won't diagnose conditions or provide clinical treatment - just honest human conversation."
                },
                {
                  question: "How is this different from talking to friends?",
                  answer: "Friends often have their own biases, may give advice based on what they think you want to hear, or have their own interests in your decisions. I provide an outside perspective without personal investment in your outcomes. There's no history, no expectations, no fear of damaging the relationship. You can be completely honest without worrying about how it affects our friendship."
                },
                {
                  question: "What if I don't know what to talk about?",
                  answer: "That's completely fine! Many people start with 'I don't know where to begin' or 'I just feel stuck.' We can explore whatever comes up, even if it's just feeling confused or uncertain. Sometimes the most valuable conversations start from not knowing. I'll help you find the threads to pull on."
                },
                {
                  question: "Is this confidential?",
                  answer: "Absolutely. Everything discussed is completely confidential. I don't share details with anyone, ever. This creates a safe space where you can be completely honest without fear of judgment or consequences. Your privacy is paramount - what happens in our conversation stays between us."
                },
                {
                  question: "What if I need to cancel or reschedule?",
                  answer: "Just let me know as soon as possible. Life happens, and I understand completely. We can reschedule without any hassle or penalties. The goal is to make this as stress-free as possible. No cancellation fees, no guilt - just honest communication about what works for you."
                },
                {
                  question: "Do I have to book multiple sessions?",
                  answer: "Not at all. There's no commitment or pressure to book again. Some people find one conversation is enough to gain clarity. Others return periodically when they need perspective. You're in complete control of what works for you. I won't chase you or pressure you for repeat business."
                },
                {
                  question: "What if the price is too high for me right now?",
                  answer: "The price is negotiable. If you're genuinely interested but the cost is a barrier, please reach out anyway. We can work something out - maybe a shorter session, payment plan, or adjusted rate. The priority is making this accessible to those who need it, not creating financial stress."
                },
                {
                  question: "What happens during a session?",
                  answer: "Sessions are conversational and flow naturally. We might start with what brought you here, then explore whatever feels important. I listen deeply, ask thoughtful questions, sometimes share perspectives. There's no rigid structure - we follow what matters to you. You can talk as much or as little as you want."
                },
                {
                  question: "Can you help me with specific problems?",
                  answer: "I can help you think through problems, explore options, and gain clarity on your own wisdom. I won't give you 'the answer' but I'll help you find your own answers. Sometimes having someone reflect back what you're saying, ask good questions, and offer different perspectives is exactly what helps you move forward."
                },
                {
                  question: "What if I'm nervous or anxious about this?",
                  answer: "That's totally normal! Most people feel some nervousness before talking to someone new. We can start slow, and I'll make sure you feel comfortable. There's no pressure to perform or say the 'right' things. You can be exactly as you are, nerves and all."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-2xl border border-purple-200/50 dark:border-purple-700/50 overflow-hidden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedFAQ(expandedFAQ === idx ? null : idx);
                    }}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors"
                  >
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-white pr-2 sm:pr-4">
                      {faq.question}
                    </h3>
                    {expandedFAQ === idx ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === idx && (
                    <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Boundaries */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="bg-gradient-to-br from-red-100/60 via-orange-100/60 to-yellow-100/60 dark:from-red-900/40 dark:via-orange-900/40 dark:to-yellow-900/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-orange-300/50 dark:border-orange-600/50 mx-2 sm:mx-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-800 dark:text-white">
                  Important boundaries
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mb-6 sm:mb-8 rounded-full"></div>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                  <p>I won't pretend to have all the answers. I won't sugarcoat hard truths. I won't judge your choices.</p>
                  <p>I won't push you to book again. I won't chase you. I won't pressure you.</p>
                  <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                    This is your space. You control it.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* If This Resonates - CTA */}
        <section className="relative py-16 sm:py-24 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="bg-gradient-to-br from-purple-200/80 via-pink-200/80 to-orange-200/80 dark:from-purple-900/60 dark:via-pink-900/60 dark:to-orange-900/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-16 shadow-2xl border border-purple-300/50 dark:border-purple-600/50 hover:scale-105 transition-all duration-500 mx-2 sm:mx-0">
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-purple-600 dark:text-purple-400 animate-pulse" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent text-center">
                  If this resonates
                </h2>
                <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 sm:mb-8 rounded-full"></div>
                <div className="space-y-3 sm:space-y-6 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-8 sm:mb-12 text-center">
                  <p>If something on this page feels familiar, you're probably in the right place.</p>
                  <p>You can book a session. Or you can just reach out with a question.</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                    No obligation. No follow-up pressure. No expectations.
                  </p>
                  <p className="italic text-sm sm:text-base">Only if it feels right to you.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Stunning Footer with Photo 7 - Mobile Optimized */}
        <section className="relative py-12 sm:py-16 md:py-32 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="relative rounded-xl sm:rounded-2xl lg:rounded-[4rem] overflow-hidden shadow-2xl group">
                {/* Photo 7 - Footer Background */}
                <div className="relative h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden">
                  <img 
                    src={photo7} 
                    alt="Footer" 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-orange-600/30 mix-blend-multiply"></div>
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 lg:p-8">
                  <div className="text-center text-white max-w-4xl">
                    <ScrollReveal delay={200} immediate={true}>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 lg:mb-8 leading-tight">
                        Ready to talk?
                      </h2>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={400} immediate={true}>
                      <div className="inline-flex items-center gap-1 sm:gap-2 lg:gap-3 px-3 sm:px-4 lg:px-6 lg:px-8 py-1.5 sm:py-2 lg:py-4 rounded-xl lg:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-4 sm:mb-6 lg:mb-12">
                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-yellow-400" />
                        <span className="text-base sm:text-lg lg:text-2xl font-bold">$100</span>
                        <span className="text-xs sm:text-sm lg:text-lg">/ session (Negotiable)</span>
                      </div>
                    </ScrollReveal>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-0">
                      <ScrollReveal delay={600} immediate={true}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openBookingModal();
                          }}
                          className="group w-full sm:w-auto px-6 sm:px-8 lg:px-12 py-3 sm:py-3 lg:py-6 bg-white text-purple-600 rounded-full font-black text-sm sm:text-base lg:text-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-2xl hover:shadow-white/50"
                        >
                          BOOK NOW
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </ScrollReveal>
                      
                      <ScrollReveal delay={800} immediate={true}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openContactModal();
                          }}
                          className="group w-full sm:w-auto px-6 sm:px-8 lg:px-12 py-3 sm:py-3 lg:py-6 bg-white/10 backdrop-blur-xl text-white rounded-full font-bold text-sm sm:text-base lg:text-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                        >
                          Message First
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </ScrollReveal>
                    </div>
                    
                    <ScrollReveal delay={1000} immediate={true}>
                      <p className="text-sm sm:text-base lg:text-xl text-white/80 italic animate-pulse">
                        Life doesn't need to be figured out all at once.
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
                
                {/* Floating decorative elements - smaller on mobile */}
                <div className="absolute top-4 left-4 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-yellow-400 rounded-full animate-bounce opacity-70"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-pink-400 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute top-1/2 left-1/4 w-2 h-2 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-blue-400 rounded-full animate-spin opacity-70" style={{ animationDuration: '4s' }}></div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Final Footer */}
        <footer className="relative py-12 sm:py-16 px-4 bg-gradient-to-b from-transparent to-purple-100/50 dark:to-purple-900/30">
          <div className="max-w-3xl mx-auto text-center px-2 sm:px-0">
            <ScrollReveal immediate={true}>
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400 animate-pulse flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Whenever you're ready.
                </h2>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 dark:text-pink-400 animate-pulse flex-shrink-0" />
              </div>
            </ScrollReveal>
            <ScrollReveal immediate={true}>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                Sometimes one honest conversation is enough to change the direction.
              </p>
            </ScrollReveal>
            <ScrollReveal immediate={true}>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 italic">
                © 2026 RentMe — Real conversations, real support.
              </p>
            </ScrollReveal>
          </div>
        </footer>

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-purple-200/50 dark:border-purple-700/50 relative z-[10000]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  Send a Message
                </h3>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {formStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Message sent successfully!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">I'll get back to you soon.</p>
                </div>
              ) : formStatus === 'loading' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 border-4 border-purple-600 dark:border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Sending message...</p>
                </div>
              ) : formStatus === 'error' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Something went wrong</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please try again later.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Tell me what's on your mind..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white rounded-lg py-3 font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-purple-200/50 dark:border-purple-700/50 relative z-[10000] my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Book a Session
                </h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {formStatus === 'success' ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Booking request sent!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">I'll confirm the details soon.</p>
                </div>
              ) : formStatus === 'loading' ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-6 h-6 border-4 border-purple-600 dark:border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Processing booking...</p>
                </div>
              ) : formStatus === 'error' ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <X className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Something went wrong</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please try again later.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Preferred Time
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      >
                        <option value="">Select time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Session Duration
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    >
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Session Type
                    </label>
                    <select
                      name="sessionType"
                      value={formData.sessionType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    >
                      <option value="">Select type</option>
                      <option value="general">General Conversation</option>
                      <option value="career">Career Guidance</option>
                      <option value="personal">Personal Growth</option>
                      <option value="decision">Decision Making</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  {formData.sessionType === 'other' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Please specify
                      </label>
                      <input
                        type="text"
                        name="otherSessionType"
                        value={formData.otherSessionType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="Describe what you'd like to discuss"
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      What would you like to discuss?
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                      placeholder="Tell me what's on your mind or what you'd like to explore..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white rounded-lg py-3 font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    Book Session
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Floating Cursor Effect */}
        <div
          className="hidden md:block fixed w-8 h-8 rounded-full border-2 border-purple-500 dark:border-purple-400 pointer-events-none z-40 mix-blend-difference transition-transform duration-200"
          style={{
            left: `${mousePosition.x - 16}px`,
            top: `${mousePosition.y - 16}px`,
          }}
        />

        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -50px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(50px, 50px) scale(1.05); }
          }
          
          .animate-blob {
            animation: blob 20s infinite ease-in-out;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
            50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
          }

          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #a855f7, #ec4899);
            border-radius: 5px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, #9333ea, #db2777);
          }

          /* Smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Selection styling */
          ::selection {
            background: linear-gradient(45deg, #a855f7, #ec4899);
            color: white;
          }

          /* Image hover effects */
          .img-hover-zoom {
            overflow: hidden;
          }

          .img-hover-zoom img {
            transition: transform 0.5s ease;
          }

          .img-hover-zoom:hover img {
            transform: scale(1.1);
          }

          /* Parallax effect for scroll */
          .parallax-slow {
            transition: transform 0.5s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default FriendBookingWebsite;
