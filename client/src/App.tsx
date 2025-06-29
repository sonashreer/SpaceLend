
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import ListSpace from "./pages/ListSpace";
import Explore from "./pages/Explore";
import SpaceDetail from "./pages/SpaceDetail";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import MyListings from "./pages/MyListings";
import Messages from "./pages/Messages";
import Earnings from "./pages/Earnings";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/list-space" component={ListSpace} />
          <Route path="/explore" component={Explore} />
          <Route path="/space/:id" component={SpaceDetail} />
          <Route path="/booking/:id" component={Booking} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/my-bookings" component={MyBookings} />
          <Route path="/my-listings" component={MyListings} />
          <Route path="/messages" component={Messages} />
          <Route path="/earnings" component={Earnings} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
