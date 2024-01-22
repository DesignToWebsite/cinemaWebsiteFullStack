<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;
use Illuminate\Support\Facades\Validator;

class StripeController extends Controller
{
    /**
     * Handle payment with JSON POST request
     */
    public function handlePayment(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'stripeToken' => 'required|string',
            'amount' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Set your Stripe API key
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            // Create a Charge on Stripe
            Charge::create([
                "amount" => $request->amount * 100, // Amount is expected in cents
                "currency" => "USD",
                "source" => $request->stripeToken,
                "description" => "Making test payment.",
            ]);

            return response()->json(['success' => 'Payment has been successfully processed.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
