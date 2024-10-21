import Heading from "@/components/Heading";
import BookedRoomCard from "@/components/BookedRoomCard";
import getMyBookings from "@/app/actions/getMyBookings";

const BookingsPage = async () => {
  const bookings = await getMyBookings();
  return (
    <>
      <Heading title="My Bookings" />
      {bookings.length === 0 ? (
        <p className="text-gray-600 mt-4">You do not have any bookings yet</p>
      ) : (
        bookings.map((booking) => <h3>{booking.room_id.name}</h3>)
      )}
      <BookedRoomCard />
    </>
  );
};

export default BookingsPage;
