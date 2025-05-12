import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import api from '@/lib/api';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { courseId, date, userId } = session.metadata!;

    try {
      await api.post('/bookings', {
        courseId,
        date,
        userId,
        status: 'CONFIRMED',
      });
    } catch (err) {
      console.error('Error creating booking:', err);
      return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}