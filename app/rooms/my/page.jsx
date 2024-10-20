import Heading from "@/components/Heading";
import MyRoomCard from "@/components/MyRoomCard";
import getMyRooms from "@/app/actions/getMyRooms";

const MyRoomsPage = async () => {
  const rooms = await getMyRooms();

  return (
    <>
      <Heading title="My Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => <MyRoomCard key={room.$id} room={room} />)
      ) : (
        <h3>You have no rooms listed</h3>
      )}
    </>
  );
};

export default MyRoomsPage;
