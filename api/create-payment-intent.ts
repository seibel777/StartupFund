import Stripe from 'stripe';
import { supabase } from '../src/lib/supabase';

const stripe = new Stripe('sk_test_51Qm3KhGdUymdF3LzcVyJ8a8fOPpi1cuJYh31PgPqXXyZpiFHEWrxKUrdEZqUnfltiQuZ4OJJGZOpRB30m3m5toas00R3fpZuY9', {
  apiVersion: '2023-10-16'
});

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { amount, donation_id, project_id } = await req.json();

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        donation_id,
        project_id
      }
    });

    // Update the donation with the payment intent ID
    const { error: updateError } = await supabase
      .from('donations')
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq('id', donation_id);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}