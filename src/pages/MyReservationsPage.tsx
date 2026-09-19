import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CalendarDays, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const MyReservationsPage: React.FC = () => {
  const { reservations, cancelReservation, setCurrentPage } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block mb-1">
            Table Bookings
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            My Reservations
          </h1>
        </div>

        <button
          onClick={() => {
            setCurrentPage('reservations');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Book a New Table</span>
        </button>
      </div>

      {/* Reservations List */}
      {reservations.length === 0 ? (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-800 text-amber-500 flex items-center justify-center mx-auto">
            <CalendarDays className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-100">No Reservations Yet</h3>
          <p className="text-xs text-stone-400">
            Reserve an intimate table by our wood-fired hearth or on our olive grove garden terrace.
          </p>
          <button
            onClick={() => setCurrentPage('reservations')}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            Find a Table
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reservations.map(res => {
            const isCancelled = res.status === 'cancelled';
            const isCompleted = res.status === 'completed';

            return (
              <div 
                key={res.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all shadow-md relative overflow-hidden"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      Ref #{res.reservationCode}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                      res.status === 'confirmed'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : res.status === 'seated'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                        : res.status === 'completed'
                        ? 'bg-stone-800 text-stone-400'
                        : 'bg-rose-950 text-rose-400 border border-rose-800/60'
                    }`}>
                      {res.status}
                    </span>
                  </div>

                  {/* Date & Time Big Display */}
                  <div className="space-y-1 mb-4">
                    <div className="font-serif text-2xl font-bold text-stone-100">
                      {res.date}
                    </div>
                    <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                      <Clock className="w-4 h-4" />
                      <span>{res.time}</span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs text-stone-300">
                    <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
                      <span className="text-stone-500 block mb-0.5">Guests</span>
                      <span className="font-bold text-stone-100 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-500" />
                        {res.guests} {res.guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>

                    <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
                      <span className="text-stone-500 block mb-0.5">Atmosphere</span>
                      <span className="font-bold text-stone-100 truncate block">
                        {res.seatingArea}
                      </span>
                    </div>

                    <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800 col-span-2">
                      <span className="text-stone-500 block mb-0.5">Occasion</span>
                      <span className="font-semibold text-stone-200">
                        {res.occasion}
                      </span>
                    </div>

                    {res.specialRequests && (
                      <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800 col-span-2">
                        <span className="text-stone-500 block mb-0.5">Special Requests</span>
                        <span className="italic text-stone-300">
                          "{res.specialRequests}"
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-400">
                    Booked by {res.name}
                  </span>

                  {res.status === 'confirmed' && (
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to cancel reservation ${res.reservationCode}?`)) {
                          cancelReservation(res.id);
                        }
                      }}
                      className="text-stone-400 hover:text-rose-400 text-xs transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel Table</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
