import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { api } from "@/api/api";
import { useAuth } from "@/Authprovider/AuthProvider";

const Setting = () => {
//   const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const {user} = useAuth();

  useEffect(() => {
    console.log(user)
  }, []);

  const handleNameUpdate = async () => {
    if (!user) return;

    try {
    //   const res = await api.patch(`/api/user/${user._id}/update`, {
    //     name: newName,
    //   });
    //   setUser({ ...user, name: res.data.name });
    //   setEditingName(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpgrade = async () => {

    window.location.href = '/pricing'
    // if (!user) return;

    // // Example: call API to upgrade subscription
    // try {
    //   const res = await api.post(`/api/subscription/upgrade`, {
    //     userId: user.id,
    //     plan: "pro",
    //   });
    // //   setUser({ ...user, plan: res.data.plan });
    // } catch (err) {
    //   console.error(err);
    // }
  };

//   if (loading) return <p className="p-6">Loading...</p>;

  if (!user) return <p className="p-6">User not found.</p>;

  return (
    <>
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Navbar />
      </header>

      <main className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* User info */}
        <div className="border rounded-xl p-6 space-y-4">
          {/* Email (read-only) */}
          <div>
            <label className="block text-sm text-muted-foreground">Email</label>
            <input
              className="w-full mt-1 p-2 border rounded"
              value={user.email}
              disabled
            />
          </div>

          {/* Name (editable) */}
          <div>
            <label className="block text-sm text-muted-foreground">Name</label>
            {editingName ? (
              <div className="flex gap-2">
                <input
                  className="flex-1 p-2 border rounded"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <Button onClick={handleNameUpdate}>Save</Button>
                <Button variant="outline" onClick={() => setEditingName(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span>{user.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingName(true)}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            )}
          </div>

          {/* Subscription plan */}
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm text-muted-foreground">
                Subscription Plan
              </label>
              <p className="mt-1">{user.plan}</p>
            </div>
            {user.plan === "free" && (
              <Button onClick={handleUpgrade}>Upgrade to Pro</Button>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Setting;