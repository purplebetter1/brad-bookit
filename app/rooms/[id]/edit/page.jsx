import EditMyRoomForm from "@/components/EditMyRoomForm";
import Heading from "@/components/Heading";
import getSingleRoom from "@/app/actions/getSingleRoom";
import checkAuth from "@/app/actions/checkAuth";
import { FaRegComment } from "react-icons/fa";

const EditRoomPage = async ({ params }) => {
  const { id } = params;
  const { user } = await checkAuth();

  const room = await getSingleRoom(id);

  if (!room) {
    return <Heading title="Room Not Found" />;
  }

  if (user.id !== room.user_id) {
    return <Heading title="Must own room to update" />;
  }

  return (
    <>
      <Heading title="Update This Room" />
      <EditMyRoomForm room={room} />
    </>
  );
};

export default EditRoomPage;
