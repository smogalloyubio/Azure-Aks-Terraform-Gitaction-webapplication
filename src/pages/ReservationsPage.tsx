import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CalendarDays, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Info, 
  Flame, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SeatingArea, Reservation } from '../types';

export const ReservationsPage: React.FC = () => {
  const { customerProfile, makeReservation, setCurrentPage } = useApp();

  // Reservation Form State
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('7:00 PM');
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('Main Dining Hall');
  const [occasion, setOccasion] = useState<string>('Casual Dining');
  
  // Contact
  const [name, setName] = useState(customerProfile.name);
  const [email, setEmail] = useState(customerProfile.email);
  const [phone, setPhone] = useState(customerProfile.phone);
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmation state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Realistic mock time slots with simulated availability status
  const timeSlots = [
    { label: 'Lunch Service', times: [
      { time: '11:30 AM', status: 'available' },
      { time: '12:00 PM', status: 'available' },
      { time: '12:30 PM', status: 'limited' },
      { time: '1:00 PM', status: 'available' },
      { time: '1:30 PM', status: 'limited' },
      { time: '2:00 PM', status: 'available' },
    ]},
    { label: 'Dinner Service (Peak)', times: [
      { time: '5:00 PM', status: 'available' },
      { time: '5:30 PM', status: 'available' },
      { time: '6:00 PM', status: 'limited' },
      { time: '6:30 PM', status: 'sold_out' },
      { time: '7:00 PM', status: 'limited' },
      { time: '7:30 PM', status: 'available' },
      { time: '8:00 PM', status: 'limited' },
      { time: '8:30 PM', status: 'available' },
      { time: '9:00 PM', status: 'available' },
      { time: '9:30 PM', status: 'available' },
    ]}
  ];

  const seatingOptions: { name: SeatingArea; desc: string; tag?: string }[] = [
    { 
      name: 'Main Dining Hall', 
      desc: 'Warm vaulted ambiance, direct hearth view, polished white oak tables.' 
    },
    { 
      name: 'Garden Terrace & Patio', 
      desc: 'Heated open-air terrace with century-old olive trees and ambient fountains.',
      tag: 'Most Romantic'
    },
    { 
      name: 'Chef’s Interactive Counter', 
      desc: 'Front row to the wood hearth brigade with sommelier insights.',
      tag: 'Culinary Focus'
    },
    { 
      name: 'Private Velvet Booth', 
      desc: 'Intimate recessed velvet seating for deep conversation and celebrations.',
      tag: 'Intimate'
    }
  ];

  const occasions = [
    'Casual Dining',
    'Anniversary Celebration',
    'Birthday Gathering',
    'Romantic Date Night',
    'Business Dinner',
    'Special Milestone'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert('Please fill in your contact information.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = makeReservation({
        date,
        time: selectedTime,
        guests,
        seatingArea,
        name,
        email,
        phone,
        occasion,
        specialRequests: specialRequests || undefined,
      });

      setIsSubmitting(false);
      setConfirmedReservation(res);
    }, 800);
  };

  if (confirmedReservation) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8 animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 mx-auto shadow-xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
            Table Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            We Look Forward to Welcoming You
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
            A formal confirmation and calendar invitation have been dispatched to <strong className="text-stone-200">{confirmedReservation.email}</strong>.
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 text-left space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />

          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <span className="text-[11px] text-stone-400 uppercase tracking-wider block">Booking Reference</span>
              <span className="font-mono text-xl font-bold text-amber-400">{confirmedReservation.reservationCode}</span>
            </div>
            <span className="px-3 py-1 bg-emerald-950 border border-emerald-800/60 text-emerald-400 rounded-full text-xs font-semibold">
              Confirmed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-stone-500 block mb-0.5">Date &amp; Arrival</span>
              <span className="font-bold text-stone-100 text-sm">
                {confirmedReservation.date} at {confirmedReservation.time}
              </span>
            </div>

            <div>
              <span className="text-stone-500 block mb-0.5">Party Size</span>
              <span className="font-bold text-stone-100 text-sm">
                {confirmedReservation.guests} {confirmedReservation.guests === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>

            <div>
              <span className="text-stone-500 block mb-0.5">Seating Preference</span>
              <span className="font-bold text-stone-100 text-sm">{confirmedReservation.seatingArea}</span>
            </div>

            <div>
              <span className="text-stone-500 block mb-0.5">Occasion</span>
              <span className="font-bold text-stone-100 text-sm">{confirmedReservation.occasion}</span>
            </div>

            {confirmedReservation.specialRequests && (
              <div className="col-span-2 pt-2 border-t border-stone-800 text-stone-300">
                <span className="text-stone-500 block mb-0.5">Guest Requests:</span>
                <span className="italic">"{confirmedReservation.specialRequests}"</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Tables are held for 15 minutes past reservation time. Valet is complimentary.</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setCurrentPage('my-reservations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>View My Reservations</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setCurrentPage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
          >
            Explore Dinner Menu in Advance
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block">
          Hospitality &amp; Tables
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100">
          Table Reservations
        </h1>
        <p className="text-sm text-stone-400">
          Join us for wood-fired gastronomy, curated cellar pairings, and an unforgettable dining experience.
        </p>
      </div>

      {/* Reservation Wizard Form */}
      <form onSubmit={handleSubmit} className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl">
        
        {/* Step 1: Party Size & Date */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-serif text-lg font-bold">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-mono">1</span>
            <h3>Party Size &amp; Date</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Number of Guests */}
            <div className="space-y-2">
              <label className="text-xs text-stone-400 font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                Number of Guests
              </label>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      guests === num
                        ? 'bg-amber-500 text-stone-950 shadow-md'
                        : 'bg-stone-950 border border-stone-800 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setGuests(10)}
                  className={`col-span-2 py-2 rounded-xl text-xs font-bold transition-all ${
                    guests >= 9
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-950 border border-stone-800 text-stone-400 hover:bg-stone-800'
                  }`}
                >
                  9+ (Large)
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-xs text-stone-400 font-medium flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
                Dining Date
              </label>
              <input
                type="date"
                required
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Available Time Slots */}
        <div className="space-y-4 pt-4 border-t border-stone-800">
          <div className="flex items-center gap-2 text-amber-400 font-serif text-lg font-bold">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-mono">2</span>
            <h3>Available Time Slots (Mock Availability)</h3>
          </div>

          <div className="space-y-4">
            {timeSlots.map((block, idx) => (
              <div key={idx} className="space-y-2">
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                  {block.label}
                </span>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {block.times.map(slot => {
                    const isSelected = selectedTime === slot.time;
                    const isSoldOut = slot.status === 'sold_out';

                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={isSoldOut}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`p-2.5 rounded-xl text-xs flex flex-col items-center justify-center gap-1 border transition-all ${
                          isSoldOut
                            ? 'bg-stone-950/40 border-stone-800/40 text-stone-600 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-amber-500 border-amber-500 text-stone-950 font-bold shadow-md'
                            : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-500/50 hover:bg-stone-850'
                        }`}
                      >
                        <span>{slot.time}</span>
                        {!isSoldOut && (
                          <span className={`text-[9px] ${isSelected ? 'text-stone-900 font-semibold' : slot.status === 'limited' ? 'text-amber-400' : 'text-stone-500'}`}>
                            {slot.status === 'limited' ? '2 Left' : 'Available'}
                          </span>
                        )}
                        {isSoldOut && <span className="text-[9px] text-stone-600">Full</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Seating Preference & Occasion */}
        <div className="space-y-4 pt-4 border-t border-stone-800">
          <div className="flex items-center gap-2 text-amber-400 font-serif text-lg font-bold">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-mono">3</span>
            <h3>Atmosphere &amp; Occasion</h3>
          </div>

          <div className="space-y-3">
            <label className="text-xs text-stone-400 font-medium block">
              Seating Preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {seatingOptions.map(opt => {
                const isSelected = seatingArea === opt.name;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setSeatingArea(opt.name)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                        : 'bg-stone-950 border-stone-800 text-stone-300 hover:bg-stone-850'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <strong className="font-serif text-sm text-stone-100">{opt.name}</strong>
                        {opt.tag && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                            {opt.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs text-stone-400 font-medium">Dining Occasion</label>
              <select
                value={occasion}
                onChange={e => setOccasion(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              >
                {occasions.map(occ => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-stone-400 font-medium">Dietary &amp; Accessibility Notes (Optional)</label>
              <input
                type="text"
                placeholder="e.g., Severe nut allergy, wheelchair access, high chair..."
                value={specialRequests}
                onChange={e => setSpecialRequests(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Step 4: Contact Information */}
        <div className="space-y-4 pt-4 border-t border-stone-800">
          <div className="flex items-center gap-2 text-amber-400 font-serif text-lg font-bold">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-mono">4</span>
            <h3>Guest Contact Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-stone-400 font-medium">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-stone-400 font-medium">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-stone-400 font-medium">Mobile Phone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero cancellation fee up to 2 hours prior to reservation.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-xl transition-all"
          >
            {isSubmitting ? 'Securing Table...' : `Confirm Table for ${guests} Guests`}
          </button>
        </div>

      </form>

    </div>
  );
};
