import { Header, StatsCard, TripCard } from "../../../components";
import { dashboardStats, user, allTrips } from "~/constants";
const { totalUsers, userJoined, totalTrips, tripCreated, userRole } =
  dashboardStats;

const dashboard = () => {
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"}`}
        description="Track activity, trends and popular dsestinations in real time"
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-copls-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={userJoined.currentMonth}
            lastMonthCount={userJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripCreated.currentMonth}
            lastMonthCount={tripCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonth}
          />
        </div>
      </section>
      <section className="flex flex-col gap-6"></section>
      <section className="container"></section>
      <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
      <div className="trip-grid">
        {allTrips.slice(0, 4).map(({id, name, imageUrls, itinerary, tags, estimatedPrice}) => (
          <TripCard 
            key={id} 
            id={id.toString()} 
            name={name} 
            imageUrl={imageUrls[0]} 
            location={itinerary?.[0]?.location ?? ''} 
            tags={tags} 
            price={estimatedPrice}
          />
        ))}
      </div>
    </main>
  );
};

export default dashboard;
