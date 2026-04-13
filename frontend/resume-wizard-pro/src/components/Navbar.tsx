import { Bell } from "lucide-react";
import { useState } from "react";
import AuthDialog from "./auth/AuthDialog";

const Navbar = () => {

      //Auth
      const [isOpen, setIsOpen] = useState(false);
      const [authOpen,setauthopen] = useState(false);
      const [isLoggedIn, setIsLoggedIn] = useState(false); // replace with real auth later
    
      //Notification
      const [notifOpen, setNotifOpen] = useState(false);
    
      const [notifications, setNotifications] = useState<string[]>([]);

    return(
        <>
        <AuthDialog open={authOpen} onClose={() => setauthopen(false)}/>
        <div className=" cursor-pointer flex items-center gap-2" onClick={() => window.location.href = "/"}>
          <span className="font-display font-bold text-lg">MiraiCV</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">Dashboard</a>
          <a href="#" className="hover:text-foreground transition">My Resumes</a>
          <a href="/template" className="hover:text-foreground transition">Templates</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
        </nav>

        {/* Right: Actions + User */}
        <div className="flex items-center gap-4">

        <div className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative p-2 rounded-lg hover:bg-muted transition"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />

          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>

        {/* Notification Dropdown */}
        {notifOpen && (
          <div className="absolute right-0 mt-3 w-80 bg-background border border-border rounded-xl shadow-lg p-4 z-50 animate-fade-in">
            
            <h3 className="font-semibold mb-3">Notifications</h3>

            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No new notifications yet
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map((note, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-lg bg-muted text-sm"
                  >
                    {note}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setNotifOpen(false)}
              className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition"
            >
              Close
            </button>
          </div>
        )}
      </div>

        <div className="relative">
          {/* Avatar */}
          <div
            onClick={() => {if(!isLoggedIn) setauthopen(true)}}
            className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-semibold cursor-pointer hover:opacity-90"
          >
            U
          </div>

          {/* Dropdown (if logged in) */}
          {isOpen && isLoggedIn && (
            <div className="absolute right-0 mt-2 w-44 bg-background border border-border rounded-lg shadow-md p-2 z-50">
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md">
                My Resumes
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md">
                Settings
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-muted rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        </div>
        </>
    )
}

export default Navbar;