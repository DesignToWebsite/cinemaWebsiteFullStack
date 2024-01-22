<?php
// app/Http/Controllers/PaymentController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        // Set the Stripe API key
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            // Create a PaymentIntent on Stripe
            $intent = PaymentIntent::create([
                'amount' => $request->amount,
                'currency' => 'usd',
            ]);

            return response()->json(['clientSecret' => $intent->client_secret]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
