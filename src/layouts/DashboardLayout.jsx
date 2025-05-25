// layouts/DashboardLayout.jsx
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children, role }) {
  return (
    <div className="flex h-screen">
      <Sidebar role={role} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
