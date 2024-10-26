"use client";
import { FaEdit } from "react-icons/fa";

const EditRoomButton = ({ roomId }) => {
  const handleEditRoom = () => {
    console.log("EditRoomButton Pressed");
  };

  return (
    <button
      className="bg-gray-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full 
    sm:w-auto text-center hover:bg-gray-700"
      onClick={handleEditRoom}
    >
      <FaEdit className="inline mr-1" /> Edit
    </button>
  );
};

export default EditRoomButton;
