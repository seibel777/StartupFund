import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { stripePromise } from '../lib/stripe';
import toast from 'react-hot-toast';

interface DonateModalProps {
  show: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    user_id: string;
  };
}

function DonateModal({ show, onClose, project }: DonateModalProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in to donate');

      // Create a donation record
      const { data: donation, error: donationError } = await supabase
        .from('donations')
        .insert([{
          project_id: project.id,
          user_id: user.id,
          amount: parseFloat(amount),
          status: 'pending'
        }])
        .select()
        .single();

      if (donationError) throw donationError;

      // Create a payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          donation_id: donation.id,
          project_id: project.id
        }),
      });

      if (!response.ok) throw new Error('Failed to create payment intent');

      const { clientSecret } = await response.json();

      // Load Stripe
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Confirm the payment
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // In a real app, you would use Stripe Elements here
            token: 'tok_visa' // Test token
          },
        }
      });

      if (stripeError) throw stripeError;

      toast.success('Thank you for your donation!');
      onClose();
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-lg max-w-md w-full">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Support {project.title}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Donation Amount ($)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="0.00"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Donate Now'}
              </button>
            </form>

            <div className="mt-4 text-sm text-gray-500">
              <p>Your donation will be processed securely via Stripe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonateModal;