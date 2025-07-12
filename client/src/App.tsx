import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Teachers from "@/pages/teachers";
import Students from "@/pages/students";
import Classes from "@/pages/classes";
import Reports from "@/pages/reports";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Teachers} />
      <Route path="/teachers" component={Teachers} />
      <Route path="/students" component={Students} />
      <Route path="/classes" component={Classes} />
      <Route path="/reports" component={Reports} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
