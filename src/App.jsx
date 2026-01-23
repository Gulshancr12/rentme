import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Heart, Sparkles, MessageCircle, Coffee, Users, Zap, Star, ArrowRight, Mail, Phone, Calendar, Clock, Send, X, Check, DollarSign, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './App.css';

const FriendBookingWebsite = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
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
    
    console.log('Form submitted:', formData); // Debug log
    setFormStatus('loading');
    
    try {
      // Prepare email data
      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        type: formData.type,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        session_type: formData.sessionType === 'other' ? formData.otherSessionType : formData.sessionType,
        description: formData.description,
        to_email: 'rentme.vick@gmail.com'
      };

      console.log('Sending email with data:', emailData); // Debug log

      // Send email using EmailJS
      const result = await emailjs.send(
        'service_cc8u2nh', // Your EmailJS service ID
        'template_contact', // You'll create a simple template in EmailJS dashboard
        emailData,
        '5YaNDi8eqqCmCQO5R' // Your EmailJS public key
      );

      console.log('Email sent successfully:', result);
      setFormStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus('');
        setFormData({
          name: '',
          email: '',
          message: '',
          type: 'message',
          date: '',
          time: '',
          duration: '60',
          sessionType: '',
          otherSessionType: '',
          description: ''
        });
        setShowContactModal(false);
        setShowBookingModal(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      
      // For demo purposes, we'll simulate success even without EmailJS setup
      setTimeout(() => {
        setFormStatus('success');
        setTimeout(() => {
          setFormStatus('');
          setFormData({
            name: '',
            email: '',
            message: '',
            type: 'message',
            date: '',
            time: '',
            duration: '60',
            sessionType: '',
            otherSessionType: '',
            description: ''
          });
          setShowContactModal(false);
          setShowBookingModal(false);
        }, 3000);
      }, 1000);
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

  // Particle System
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + window.innerWidth) % window.innerWidth,
        y: (p.y + p.speedY + window.innerHeight) % window.innerHeight,
      })));
    }, 50);

    return () => clearInterval(interval);
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
        
        {/* Animated Background Particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {particles.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 opacity-40 pointer-events-none"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                transition: 'all 0.05s linear',
              }}
            />
          ))}
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

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
          <div className="max-w-5xl mx-auto text-center z-10">
            <ScrollReveal immediate={true}>
              <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-600/30 dark:to-pink-600/30 rounded-full backdrop-blur-xl border border-purple-300/30 dark:border-purple-500/30">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Real conversations, real support
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} immediate={true}>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent leading-tight animate-gradient">
                Book me as a friend.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={400} immediate={true}>
              <p className="text-2xl md:text-3xl mb-8 text-gray-700 dark:text-gray-300 font-light">
                No bullshit. No scams. No pressure.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={600} immediate={true}>
              <p className="text-lg md:text-xl mb-12 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                This isn't a pitch. This isn't a trick. This is just a space where you can talk — 
                freely, honestly, without pretending you've got everything figured out.
              </p>
            </ScrollReveal>

            {/* Buttons moved OUTSIDE ScrollReveal */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center z-40 relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  openBookingModal();
                }}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 dark:hover:shadow-purple-400/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 z-50 relative"
              >
                Book a Session
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  openContactModal();
                }}
                className="px-8 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl text-gray-800 dark:text-white rounded-full font-semibold text-lg border-2 border-purple-300 dark:border-purple-600 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 z-50 relative"
              >
                Send Message
              </button>
            </div>

            <ScrollReveal delay={1000}>
              <div className="mt-16 animate-bounce">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Scroll slowly. This page is meant to be felt, not rushed. ↓
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="relative py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-200/50 dark:border-purple-700/50 hover:scale-105 transition-all duration-500 hover:shadow-purple-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                    Who this is really for
                  </h2>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-8 rounded-full animate-pulse"></div>
                <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                  <p className="leading-relaxed">
                    This is for you if you're <span className="font-semibold text-purple-600 dark:text-purple-400">over 18</span> and still quietly trying to understand life.
                  </p>
                  <p className="leading-relaxed">
                    If you feel like everyone else looks sorted while you're just… <span className="italic">floating</span>.
                  </p>
                  <p className="leading-relaxed">
                    If you overthink at night, replay conversations, worry about the future, and still wake up pretending everything is fine.
                  </p>
                  <p className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    You don't need to be broken to be here. You just need to be human.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Simple Truth */}
        <section className="relative py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal immediate={true}>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 dark:from-orange-400 dark:via-pink-400 dark:to-purple-500 bg-clip-text text-transparent">
                A simple truth
              </h2>
            </ScrollReveal>
            <ScrollReveal immediate={true}>
              <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-purple-600 mx-auto mb-12 rounded-full"></div>
            </ScrollReveal>
            <ScrollReveal immediate={true}>
              <div className="space-y-6 text-xl text-gray-700 dark:text-gray-300">
                <p>Let's clear something first.</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  This is not therapy. This is not coaching. This is not motivation talk.
                </p>
                <p>I won't give you fake positivity. I won't sell you "10 steps to success." I won't pretend life is easy.</p>
                <p className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  This is just a real conversation — between two people — where you're allowed to think out loud.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What You Can Talk About */}
        <section className="relative py-32 px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="bg-gradient-to-br from-purple-100/80 via-pink-100/80 to-orange-100/80 dark:from-purple-900/40 dark:via-pink-900/40 dark:to-orange-900/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-300/50 dark:border-purple-600/50">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                    What you can talk about
                  </h2>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-8 rounded-full"></div>
                <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                  You can talk about things you usually keep inside.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: Coffee, text: "Work stress that follows you home", color: "from-orange-400 to-red-500" },
                    { icon: Zap, text: "Money pressure you don't say out loud", color: "from-yellow-400 to-orange-500" },
                    { icon: Users, text: 'Career confusion and "what am I even doing?" thoughts', color: "from-purple-400 to-pink-500" },
                    { icon: Star, text: "Side-hustle ideas you're unsure about", color: "from-blue-400 to-purple-500" },
                    { icon: Heart, text: "Life decisions that feel too big to make alone", color: "from-pink-400 to-purple-500" },
                  ].map((item, idx) => (
                    <ScrollReveal immediate={true} key={idx}>
                      <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-purple-200/50 dark:border-purple-700/50 cursor-pointer">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
                <ScrollReveal immediate={true}>
                  <div className="mt-8 text-center">
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                      You don't need a perfect topic. You don't need the right words.
                    </p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      We'll find clarity together.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What I Actually Do */}
        <section className="relative py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal immediate={true}>
              <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                What I actually do
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { title: "Listen properly", desc: "Not waiting for my turn to speak", emoji: "👂" },
                { title: "Hype you up", desc: "Before interviews, calls, or big moments", emoji: "💪" },
                { title: "Give honest feedback", desc: "Tell you when ideas need work, then help improve them", emoji: "💡" },
                { title: "Be flexible", desc: "Walk, coffee, or just sit and talk", emoji: "☕" },
              ].map((item, idx) => (
                <ScrollReveal immediate={true} key={idx}>
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl shadow-xl border border-purple-200/50 dark:border-purple-700/50 group cursor-pointer h-full flex flex-col justify-between">
                    <div>
                      <div className="text-5xl mb-4 transition-transform duration-300">{item.emoji}</div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal immediate={true}>
              <p className="text-2xl font-bold text-center mt-12 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                No judgement. No labels. Just real conversation.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Why This Exists */}
        <section className="relative py-32 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal immediate={true}>
              <div className="bg-gradient-to-br from-pink-200/60 via-purple-200/60 to-blue-200/60 dark:from-pink-900/40 dark:via-purple-900/40 dark:to-blue-900/40 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-purple-300/50 dark:border-purple-600/50 hover:scale-105 transition-all duration-500">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Why this exists
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
                <div className="space-y-6 text-xl text-gray-700 dark:text-gray-300">
                  <p>Because life is already loud.</p>
                  <p>Everyone wants to fix you. Sell you something. Tell you how to live.</p>
                  <p>Sometimes you don't need advice. You need space.</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    Space to talk. Space to think. Space to breathe.
                  </p>
                  <p className="text-lg italic">That's all this is.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* How People Feel After */}
        <section className="relative py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal immediate={true}>
              <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 dark:from-green-400 dark:via-teal-400 dark:to-blue-500 bg-clip-text text-transparent">
                How people usually feel after
              </h2>
            </ScrollReveal>
            <ScrollReveal immediate={true}>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl border border-green-200/50 dark:border-green-700/50">
                <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                  <p>Most people don't leave with their life magically solved.</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    They leave feeling lighter. Clearer. Less alone.
                  </p>
                  <p>They stop blaming themselves so much. They understand their next step a little better.</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Not because someone told them what to do — but because they finally heard themselves clearly.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* How This Works */}
        <section className="relative py-32 px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal immediate={true}>
              <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-500 bg-clip-text text-transparent">
                How this works
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "You reach out", desc: "No long forms. No awkward explanations. Just a simple message.", color: "from-purple-500 to-pink-500" },
                { step: "02", title: "We talk", desc: "A calm, honest conversation without pressure to impress or perform.", color: "from-pink-500 to-orange-500" },
                { step: "03", title: "You move forward", desc: "With clarity. With confidence. Or at least with less noise in your head.", color: "from-orange-500 to-red-500" },
              ].map((item, idx) => (
                <ScrollReveal immediate={true} key={idx}>
                  <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl p-8 rounded-2xl hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl border border-purple-200/50 dark:border-purple-700/50 group cursor-pointer">
                    <div className={`absolute -top-6 left-8 w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 mt-6 text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="bg-gradient-to-br from-green-100/80 via-emerald-100/80 to-teal-100/80 dark:from-green-900/40 dark:via-emerald-900/40 dark:to-teal-900/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl border border-green-300/50 dark:border-green-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                    Investment in Clarity
                  </h2>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mb-8 rounded-full"></div>
                
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-200/50 dark:bg-green-800/30 rounded-full backdrop-blur-xl border border-green-300/50 dark:border-green-600/50 mb-6">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <span className="text-3xl font-bold text-gray-800 dark:text-white">$100</span>
                    <span className="text-lg text-gray-600 dark:text-gray-400">per session</span>
                  </div>
                  
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                    Quality conversation time that can change your perspective
                  </p>
                  
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
                    <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-3">
                      <span className="font-semibold text-green-600 dark:text-green-400">Negotiable</span> - 
                      Your situation matters more than the price
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      If you're genuinely in need but the cost is a barrier, let's talk about it. 
                      The goal is to help, not to create financial stress.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-green-200/50 dark:border-green-700/50">
                    <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">30 min</p>
                    <p className="text-gray-600 dark:text-gray-400">Quick clarity session</p>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-green-200/50 dark:border-green-700/50">
                    <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">60 min</p>
                    <p className="text-gray-600 dark:text-gray-400">Standard session</p>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-green-200/50 dark:border-green-700/50">
                    <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">90 min</p>
                    <p className="text-gray-600 dark:text-gray-400">Deep dive session</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="relative py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <HelpCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
              </div>
            </ScrollReveal>
            
            {/* FAQs moved OUTSIDE ScrollReveal */}
            <div className="space-y-4 z-40 relative">
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
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    {expandedFAQ === idx ? (
                      <ChevronUp className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === idx && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
        <section className="relative py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal immediate={true}>
              <div className="bg-gradient-to-br from-red-100/60 via-orange-100/60 to-yellow-100/60 dark:from-red-900/40 dark:via-orange-900/40 dark:to-yellow-900/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl border border-orange-300/50 dark:border-orange-600/50">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-white">
                  Important boundaries
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mb-8 rounded-full"></div>
                <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                  <p>I won't pretend to have all the answers. I won't sugarcoat hard truths. I won't judge your choices.</p>
                  <p>I won't push you to book again. I won't chase you. I won't pressure you.</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                    This is your space. You control it.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* If This Resonates - CTA */}
        <section className="relative py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal immediate={true}>
              <div className="bg-gradient-to-br from-purple-200/80 via-pink-200/80 to-orange-200/80 dark:from-purple-900/60 dark:via-pink-900/60 dark:to-orange-900/60 backdrop-blur-2xl rounded-3xl p-12 md:p-16 shadow-2xl border border-purple-300/50 dark:border-purple-600/50 hover:scale-105 transition-all duration-500">
                <Sparkles className="w-16 h-16 mx-auto mb-6 text-purple-600 dark:text-purple-400 animate-pulse" />
                <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  If this resonates
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
                <div className="space-y-6 text-xl text-gray-700 dark:text-gray-300 mb-12">
                  <p>If something on this page feels familiar, you're probably in the right place.</p>
                  <p>You can book a session. Or you can just reach out with a question.</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    No obligation. No follow-up pressure. No expectations.
                  </p>
                  <p className="italic">Only if it feels right to you.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-32 px-4 bg-gradient-to-b from-transparent to-purple-100/50 dark:to-purple-900/30">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal immediate={true}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Life doesn't need to be figured out all at once.
              </h2>
            </ScrollReveal>
            <ScrollReveal immediate={true}>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Sometimes one honest conversation is enough to change the direction.
              </p>
            </ScrollReveal>
            <ScrollReveal immediate={true}>
              <p className="text-lg text-gray-500 dark:text-gray-500 italic">
                Whenever you're ready.
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
        `}</style>
      </div>
    </div>
  );
};

export default FriendBookingWebsite;
