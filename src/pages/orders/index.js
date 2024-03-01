import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Orders() {
  const [ordersData, setOrdersData] = useState([]);
  const fetchData = async () => {
    await fetch("api/myOrdersData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
    }).then(async (res) => {
      let response = await res.json();
      setOrdersData(response?.order_data?.order_data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {ordersData.length > 0 ? (
        <div className="container my-4 mx-auto">
          {ordersData?.map((orders) => {
            return (
              <>
                {orders.map((data) => {
                  return (
                    <>
                      {data.order_date ? (
                        <div className="font-bold text-xl mb-2">
                          {" "}
                          {data.order_date} <hr />{" "}
                        </div>
                      ) : (
                        <div className="my-4 w-96 border-black border-gradient p-4 dark:border-white rounded-lg">
                          <div className="relative w-full rounded-lg h-72">
                            <Image
                              src={data.img}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-lg"
                              alt="pizza"
                            />
                          </div>
                          <div className="font-bold text-xl">{data.name}</div>
                          <div className="flex justify-between items-center">
                            <div>{data.qty}</div>
                            <div>{data.size}</div>
                            <div className="font-semibold">{data.price}/-</div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </>
            );
          })}
        </div>
      ) : (
        <div className="flex w-screen flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold"> No previous Orders 😅</h1>
          {/* <p className="text-gray-600 mt-4">No previous Orders 😅</p> */}
          <Link
            href="/"
            className="text-violet-500 text-xl hover:font-bold mt-8"
          >
            Go back to the home
          </Link>
        </div>
      )}
    </>
  );
}

export default Orders;
