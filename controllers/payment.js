import Stripe from "stripe";

const stripe = new Stripe("sk_test_51OueggSC4tZo71faRJExWCUe7F6GOgvFWbWMhX9colXhHR0J0e8dvzDP5sfZbiaP6zmGaVvmOfNOpVMexiCNRynf00di1dsUpY");

export const checkout = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price * 100, // Stripe expects amount in paise (1 INR = 100 paise)
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
