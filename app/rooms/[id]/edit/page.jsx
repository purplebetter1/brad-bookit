import EditMyRoomForm from "@/components/EditMyRoomForm";
import Heading from "@/components/Heading";
import getSingleRoom from "@/app/actions/getSingleRoom";
import { toast } from "react-toastify";

const EditRoomPage = async ({ params }) => {
  const { id } = params;
  console.log(id);

  const room = await getSingleRoom(id);

  if (!room) {
    return <Heading title="Room Not Found" />;
  }

  return (
    <>
      <Heading title="Update This Room" />
      <EditMyRoomForm room={room} />
    </>
  );
};

export default EditRoomPage;
