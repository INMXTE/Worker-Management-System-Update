import { Card } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      </header>

      <Card className="p-6 glass-card">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Profile Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Your email"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Notification Settings</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />

                <span>Email notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />

                <span>SMS notifications</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => console.log("Save settings clicked")}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
