
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 border-t py-6 md:py-10">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="relative w-6 h-6 overflow-hidden">
              <img
                src="/lovable-uploads/b1462c62-31bc-48bd-9dd9-fb43ec75f7a6.png"
                alt="AniTrack"
                className="object-contain w-full h-full"
              />
            </div>
            <h3 className="font-bold">
              AN<span className="text-anitrack-purple">i</span>TRACK
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your personal anime tracking companion to organize and discover your 
            favorite anime shows.
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link to="/browse" className="text-muted-foreground hover:text-foreground">
                Browse
              </Link>
            </li>
            <li>
              <Link to="/mylist" className="text-muted-foreground hover:text-foreground">
                My List
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4">Account</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Sign In
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Register
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Profile Settings
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-6 border-t">
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AniTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
