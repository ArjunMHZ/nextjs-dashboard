import { createOrder, khaltiOrder } from '@/app/lib/action';

const CartCheckout = ({ subTotal, totalAmount }: { subTotal: string, totalAmount: number }) => {

    const handlePayment = async () => {
        try {
            const formData = await createOrder({totalAmount});
            esewaCall(formData)
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };

    const esewaCall = (formData: any) => {
        console.log(formData);
        var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for (var key in formData) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", formData[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    };


    const handlePaymentWithKhalti = async () => {
        try {
            const response = await khaltiOrder({totalAmount});

            if (response.ok) {
                console.error("Khalti API Error:", response.statusText);
                throw new Error("Failed to initiate Khalti payment");
            }

            // const responseText = await response.text();
            // console.log("Raw Response Text:", responseText);

            // let data;
            // try {
            //     data = await response?.json();
            // } catch (jsonError) {
            //     console.error("Failed to parse JSON response:", jsonError);
            //     throw new Error("Invalid response from Khalti API.");
            // }

            // if (data.payment_url) {
            //     window.location.href = data.payment_url;
            // } else {
            //     console.error("Payment URL is not available in the response.");
            //     alert("Failed to initiate Khalti payment. Please try again.");
            // }

            // const responseText = await response.text();
            // console.log("Response Text:", responseText);

            // const data = await response.json();
            // const data = JSON.parse(responseText);
            window.location.href = response;
        } catch (error) {
            console.error("Error initiating Khalti payment:", error);
            alert("Something went wrong while initiating the payment. Please try again.");
        }
    }

    // const khaltiCall = (data: { payment_url:string }) => {
    //   window.location.href = data.payment_url;
    // };

    return (
        <div className='sm:float-right mt-8 sm:mx-16 mx-4'> 
        <div className="sm:max-w-md w-full p-6 border border-gray-200 rounded-lg shadow-sm ">
            <h2 className="sm:text-2xl text-xl font-bold mb-4">Cart totals</h2>

            <div className="border-b border-gray-300 pb-4 mb-4">
                <div className="flex justify-between mb-2">
                    <span className="sm:font-medium">Subtotal</span>
                    <span className="sm:font-medium">NPR {subTotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="sm:font-medium">Shipping</span>
                    <span className="text-sm text-gray-500">
                        Enter your address to view shipping options. <br />
                        <a href="#" className="text-red-500 underline">Calculate shipping</a>
                    </span>
                </div>
            </div>

            <div className="flex justify-between mb-6">
                <span className="font-semibold text-lg sm:text-xl">Total</span>
                <span className="font-semibold text-lg sm:text-xl">NPR {totalAmount}</span>
            </div>

            <button onClick={handlePayment} className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition mb-3">
                Proceed to esewa
            </button>
            <button onClick={handlePaymentWithKhalti} className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
                Proceed to khalti
            </button>
        </div>
        </div>
    );
}

export default CartCheckout;