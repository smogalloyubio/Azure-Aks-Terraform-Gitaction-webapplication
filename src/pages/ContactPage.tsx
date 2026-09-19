import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Car, 
  Send, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/mockData';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('General Dining Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
    showToast('Your inquiry has been sent to Table & Taste guest relations.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block">
          We’re Here for You
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100">
          Contact &amp; Location
        </h1>
        <p className="text-sm text-stone-400">
          Have a question regarding reservations, private dining buyout, cellar acquisitions, or dietary accommodations? We look forward to connecting with you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Form (Left) */}
        <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-stone-100">Send an Inquiry</h2>
            <p className="text-xs text-stone-400">Our hospitality concierge responds within 4 hours during business days.</p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-100">Message Dispatched</h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Thank you, {name}. A member of our floor management team will reach out to {email} promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-stone-400 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. eleanor@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-stone-400 font-medium">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="(310) 555-0192"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 font-medium">Inquiry Type</label>
                  <select
                    value={inquiryType}
                    onChange={e => setInquiryType(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="General Dining Inquiry">General Dining Inquiry</option>
                    <option value="Private Dining & Events">Private Dining &amp; Events</option>
                    <option value="Dietary & Allergy Accommodations">Dietary &amp; Allergy Accommodations</option>
                    <option value="Media & Press Relations">Media &amp; Press Relations</option>
                    <option value="Careers & Stage">Careers &amp; Stage</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 font-medium">Your Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can our hospitality team assist you?"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-xl uppercase tracking-wider text-xs shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Info & Location Column (Right) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Restaurant Details Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-stone-100 border-b border-stone-800 pb-3">
              Direct Contact &amp; Hours
            </h3>

            <div className="space-y-4 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-100 block">Table &amp; Taste Restaurant</strong>
                  <span className="text-stone-400">
                    {RESTAURANT_INFO.address}
                  </span>
                  <span className="text-[11px] text-amber-500/90 block mt-0.5">
                    Cross Street: Olympic Blvd &amp; Wilshire Corridor
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-amber-400 transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-amber-400 transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="pt-4 border-t border-stone-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-stone-200 font-bold mb-2">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Service Operating Hours</span>
              </div>
              <div className="space-y-2 text-xs">
                {RESTAURANT_INFO.hours.map(h => (
                  <div key={h.days} className="py-1 border-b border-stone-850/60 text-stone-400">
                    <div className="font-medium text-stone-300 mb-0.5">{h.days}</div>
                    <div className="flex justify-between text-[11px] text-stone-400">
                      <span>Lunch: {h.lunch}</span>
                      <span className="text-amber-400/90">Dinner: {h.dinner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Valet & Parking Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-base font-bold">
              <Car className="w-4 h-4" />
              <h4>Valet &amp; Parking</h4>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Complimentary curbside valet service is offered at our main porte-cochère starting 30 minutes prior to dinner service. EV Level 2 chargers are available in our private rear courtyard.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
