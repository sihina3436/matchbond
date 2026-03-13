import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      {/* Main content */}
      <main className="flex-1 pt-16 pb-32">
        <Outlet />
      </main>

      <BottomNav />

    </div>
  );
};

export default App;