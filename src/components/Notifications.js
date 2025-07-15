import React from "react";
function Notification() {
  return (
    <div className="fixed h-[50px] top-0 left-0 right-0 z-50 bg-red-500 text-white text-sm md:text-base p-3 text-center cursor-pointer max-[377px]:text-[13px]">
      free delivery for all orders over 50$, order your food now!
    </div>
  );
}
export default Notification;