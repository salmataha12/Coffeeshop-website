import { useCreatePaymentIntentMutation } from '@/redux/PaymentApi';
import { CardNumberElement } from '@stripe/react-stripe-js';
import { useCallback } from 'react';

export default function useConfirmPayment() {
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  /**
   * @example
   * //this handles the payment for a 100 dollar transaction and once it is done redirects to the given /success path
   * const stripe = useStripe();
   * const elements = useElements();
   * const error = handlePayment(100, stripe, elements, "/success")
   */
  const handlePayment = useCallback(
    /**
     * @param {Number} price - the amount to checkout with.
     * @param {import('@stripe/stripe-js').Stripe} stripe - stripe object
     * @param {import('@stripe/stripe-js').StripeElements} elements - stripe elements objet
     * @param {string} return_location - the path to return for stripe to redirect to after finishing the transaction.
     */
    async (price, stripe, elements, return_location = '/home') => {
      if (!stripe || !elements) throw 'stripe or elements not loaded';

      const { data, intentError } = await createPaymentIntent(price);
      if (intentError) {
        throw intentError.data?.error ?? 'Error processing payment';
      }

      elements.submit();
      const { clientSecret } = data;

      const { stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
        return_url: `${window.location.origin}${return_location}`,
      });

      if (stripeError) {
        throw stripeError?.message ?? 'Error confirming payment';
      }
    },
    []
  );

  return [handlePayment];
}
