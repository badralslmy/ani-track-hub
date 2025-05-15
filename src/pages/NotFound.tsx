
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold text-anitrack-purple mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            We couldn't find the anime you were looking for. It seems to have vanished into another dimension.
          </p>
          <Link to="/">
            <Button className="gap-2 bg-anitrack-purple hover:bg-anitrack-purple-dark">
              <Home className="h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
