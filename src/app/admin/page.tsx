import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { StatCard } from "@/components/StatCard";
import { Logo } from "@/components/logo";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className=" w-[80%] max-[900px]:w-[95%] mx-auto pb-[40px]">
      <header className="bg-dark-300 flex items-center justify-between container  p-[25px] rounded-md sticky top-[10px] ">
        <Logo />

        <p className="text-[17px] text-dark-700 font-semibold max-[500px]:text-[15px]">
          Admin Dashboard
        </p>
      </header>

      <main className="w-full mt-[40px]">
        <section className="w-full space-y-2">
          <h1 className="text-[30px] text-light-200 font-semibold max-[500px]:text-[25px]">
            Welcome 👋
          </h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="flex gap-7 max-[600px]:flex-col max-[600px]:gap-2 w-full mt-[30px]">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <section className="mt-[50px]">
          <DataTable columns={columns} data={appointments.documents} />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
