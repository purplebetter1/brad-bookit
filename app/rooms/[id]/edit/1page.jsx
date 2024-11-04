import Heading from "@/components/Heading";
import EditMyRoomForm from "@/components/EditMyRoomForm";
import { toast } from "react-toastify";
import editMyRoom from "@/app/actions/editMyRoom";
import getSingleRoom from "@/app/actions/getSingleRoom";

const EditRoomPage = async ({ params }) => {
  const { id } = params;

  const room = await getSingleRoom(id);

  if (!room) {
    return <Heading title="Room Not Found" />;
  }

  const editedRoom = await editMyRoom(id);

  return (
    <>
      <Heading title="Update This Room" />
      <EditMyRoomForm room={room} />
    </>
  );
};

export default EditRoomPage;
