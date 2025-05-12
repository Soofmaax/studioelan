'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import { useAuth } from '@/lib/auth';
import { useBookings } from '@/hooks/use-bookings';
import { ErrorMessage } from '@/components/ui/error-message';
import { loadStripe } from '@stripe/stripe-js';

const locales = { fr };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function ReservationPage() {
  const { user } = useAuth();
  const { bookings, isLoading, error } = useBookings();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleBooking = async (data) => {
    try {
      const stripe = await stripePromise;
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedSlot.courseId,
          date: selectedSlot.start,
          userId: user.id,
        }),
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif text-sage mb-8">Réserver un cours</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Calendar
            localizer={localizer}
            events={bookings}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            messages={{
              next: "Suivant",
              previous: "Précédent",
              today: "Aujourd'hui",
              month: "Mois",
              week: "Semaine",
              day: "Jour"
            }}
            onSelectSlot={(slotInfo) => setSelectedSlot(slotInfo)}
            selectable
          />
        </div>

        {selectedSlot && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-serif text-sage mb-4">Détails de la réservation</h2>
            <form onSubmit={handleSubmit(handleBooking)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="text"
                  value={format(selectedSlot.start, 'Pp', { locale: fr })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  disabled
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sage hover:bg-gold text-white py-2 px-4 rounded-md transition-colors duration-300"
              >
                Procéder au paiement
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}