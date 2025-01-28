import Stripe from 'stripe';
import { supabase } from '../src/lib/supabase';

const stripe = new Stripe('sk_test_51Qm3KhGdUymdF3LzcVyJ8a8fOPpi1cuJYh31PgPqXXyZpiFHEWrxKUrdEZqUnfltiQuZ4OJJGZOpRB30m3m5toas00R3fpZuY9', {
  apiVersion: '2023-10-16'
});

const endpointSecret = 'whsec_your_signing_secret'; // You'll get this from Stripe Dashboard

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return new Response('No signature', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const { donation_id, project_id } = paymentIntent.metadata;

        // Start a transaction to update both donation and project
        const { error: donationError } = await supabase
          .from('donations')
          .update({ status: 'completed' })
          .eq('id', donation_id);

        if (donationError) throw donationError;

        // Update project's raised amount
        const { data: donation } = await supabase
          .from('donations')
          .select('amount')
          .eq('id', donation_id)
          .single();

        if (donation) {
          const { error: projectError } = await supabase.rpc('increment_project_raised', {
            p_project_id: project_id,
            p_amount: donation.amount
          });

          if (projectError) throw projectError;
        }

        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const { donation_id } = paymentIntent.metadata;

        const { error } = await supabase
          .from('donations')
          .update({ status: 'failed' })
          .eq('id', donation_id);

        if (error) throw error;
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}