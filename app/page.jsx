import getAllRooms from "./actions/getAllRooms";
import RoomCard from "@/components/RoomCard";
import Heading from "@/components/Heading";

export default async function Home() {
  const rooms = await getAllRooms();
  return (
    <>
      <Heading title="Available Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} />)
      ) : (
        <p>No rooms available at the moment </p>
      )}
    </>
  );
}
