import { CartContext } from "@/utils/ContextReducer";
import { useRouter } from "next/router";

import React, { useContext, useState } from "react";

function Cart() {
  const { state, dispatch } = useContext(CartContext);
  const [errorMessage, setErrorMessage] = useState(
    "Your order was canceled 😔"
  );
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log(localStorage.getItem("userEmail"));
    if (
      localStorage.getItem("userEmail") === null ||
      localStorage.getItem("userEmail") === undefined
    ) {
      router.push("/login");
    } else {
      await fetch("api/ordersData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: state,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      }).then((response) => {
        if (response.status === 200) {
          dispatch({ type: "DROP" });
          setSuccess(true);
        } else if (response.status === 400) {
          setErrorMessage(
            "If not logged in then, Please log in and try again."
          );
          setFail(true);
        }
      });
    }
  };
  let totalPrice = state.reduce((total, food) => total + food.price, 0);
  return (
    <>
      {success && (
        <div
          class="bg-teal-100 border-t-4 max-w-sm mx-auto flex justify-self-center border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div class="py-1">
              <svg
                class="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <p class="font-bold">Wohooo !</p>
                <p class="text-sm">Your Order has been accepted 😋</p>
              </div>
              <button
                type="button"
                class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-3"
                aria-label="Close"
                onClick={() => setSuccess(false)}
              >
                <span class="sr-only">Close</span>
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {fail && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <div className="flex">
            <div class="py-1">
              <svg
                class="fill-current h-6 w-6 text-red-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <p class="font-bold">Holy smokes !!</p>
                <p class="text-sm">{errorMessage}</p>
              </div>
              <button
                type="button"
                class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-3"
                aria-label="Close"
                onClick={() => setFail(false)}
              >
                <span class="sr-only">Close</span>
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{ minHeight: "95vh" }} className="flex items-center ">
        <div class="container mx-auto flex border-gradient p-3 pb-10 m-10  rounded-lg flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                {state.length > 0 ? (
                  <>
                    <table class="min-w-full text-left text-lg font-light">
                      <thead class="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" class="px-6 py-4 ">
                            #
                          </th>
                          <th scope="col" class="px-6 py-4 ">
                            <div className="flex items-center">
                              Item name
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 mx-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                                />
                              </svg>
                            </div>
                          </th>
                          <th scope="col" class="px-6 py-4 ">
                            <div className="flex items-center">
                              Size
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 mx-1"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                                />
                              </svg>
                            </div>
                          </th>
                          <th scope="col" class="px-6 py-4 ">
                            <div className="flex items-center">
                              Quantity
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 mx-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                                />
                              </svg>
                            </div>
                          </th>
                          <th scope="col" class="px-6 py-4  ">
                            <div className="flex items-center">
                              Price
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 mx-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          </th>
                          <th scope="col" class="px-6 py-4 "></th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.map((data, index) => {
                          return (
                            <tr
                              key={index}
                              class="border-b dark:border-neutral-500"
                            >
                              <td class="whitespace-nowrap px-6 py-4 font-medium">
                                {index + 1}
                              </td>
                              <td class="whitespace-nowrap px-6 py-4">
                                {data.name}
                              </td>
                              <td class="whitespace-nowrap px-6 py-4">
                                {data.size}
                              </td>
                              <td class="whitespace-nowrap  px-6 py-4">
                                <div className="  flex flex-row  ">
                                  <svg
                                    onClick={() => {
                                      dispatch({
                                        type: "INCREMENT",
                                        tempId: data.tempId,
                                        unitPrice: data.price / data.qty,
                                      });
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 hover:cursor-pointer hover:scale-125 mx-3 h-6 hover:text-green-500"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  {data.qty}
                                  <svg
                                    onClick={() => {
                                      if (data.qty > 1) {
                                        dispatch({
                                          type: "DECREMENT",
                                          tempId: data.tempId,
                                          unitPrice: data.price / data.qty,
                                        });
                                      }
                                      if (data.qty <= 1) {
                                        dispatch({
                                          type: "REMOVE",
                                          index: index,
                                        });
                                      }
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 mx-3 h-6 hover:cursor-pointer hover:scale-125 hover:text-red-500"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                              </td>
                              <td class="whitespace-nowrap px-6 py-4">
                                ₹{data.price}/-
                              </td>
                              {/* delete option */}
                              <td
                                onClick={() =>
                                  dispatch({ type: "REMOVE", index: index })
                                }
                                class="cursor-pointer whitespace-nowrap px-2 py-2 hover:text-red-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div>
                      <h1 className="font-bold my-2">
                        {" "}
                        Total Price: {totalPrice}/-
                      </h1>
                    </div>
                    <button
                      onClick={handleCheckOut}
                      className="border dark:border-gray-400 border-gray-900 rounded p-2 bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100 "
                    >
                      Check Out
                    </button>
                  </>
                ) : (
                  <div className="font-semi text-center text-4xl">
                    Your cart is empty 😕{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
