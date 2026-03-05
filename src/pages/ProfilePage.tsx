import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Save } from "lucide-react";
import { getProfile, saveProfile, type UserProfile } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const defaultProfile: UserProfile = {
  name: "",
  age: 25,
  height: 165,
  weight: 60,
  lifestyle: "moderate",
  cycleLength: 28,
  lastPeriodDate: "",
  stressLevel: "moderate",
  sleepPattern: "regular",
  dietPreference: "balanced",
  activityLevel: "moderate",
};

const selectOptions = {
  lifestyle: ["Sedentary", "Light", "Moderate", "Active", "Very Active"],
  stressLevel: ["Low", "Moderate", "High"],
  sleepPattern: ["Regular", "Irregular", "Night Owl", "Early Bird"],
  dietPreference: ["Balanced", "Vegetarian", "Vegan", "Keto", "Paleo", "Mediterranean"],
  activityLevel: ["Sedentary", "Light", "Moderate", "Active", "Very Active"],
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    const saved = getProfile();
    if (saved) setProfile(saved);
  }, []);

  const update = (key: keyof UserProfile, value: string | number) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveProfile(profile);
    toast.success("Profile saved!");
  };

  const InputField = ({ label, field, type = "text", ...props }: { label: string; field: keyof UserProfile; type?: string; [key: string]: unknown }) => (
    <div>
      <label className="text-sm font-medium text-muted-foreground block mb-1.5">{label}</label>
      <input
        type={type}
        value={profile[field] as string | number}
        onChange={e => update(field, type === "number" ? Number(e.target.value) : e.target.value)}
        className="w-full rounded-xl border border-border bg-card p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        {...props}
      />
    </div>
  );

  const SelectField = ({ label, field, options }: { label: string; field: keyof UserProfile; options: string[] }) => (
    <div>
      <label className="text-sm font-medium text-muted-foreground block mb-1.5">{label}</label>
      <select
        value={profile[field] as string}
        onChange={e => update(field, e.target.value)}
        className="w-full rounded-xl border border-border bg-card p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        {options.map(o => (
          <option key={o} value={o.toLowerCase()}>{o}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold flex items-center gap-2 mb-2">
          <User className="h-7 w-7 text-primary" /> Your Profile
        </h1>
        <p className="text-muted-foreground mb-8">This information helps personalize your wellness insights.</p>

        <div className="space-y-6">
          <div className="gradient-card-rose rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4">Personal Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Name" field="name" placeholder="Your name" />
              <InputField label="Age" field="age" type="number" />
              <InputField label="Height (cm)" field="height" type="number" />
              <InputField label="Weight (kg)" field="weight" type="number" />
            </div>
          </div>

          <div className="gradient-card-lavender rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4">Cycle Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Cycle Length (days)" field="cycleLength" type="number" />
              <InputField label="Last Period Date" field="lastPeriodDate" type="date" />
            </div>
          </div>

          <div className="gradient-card-sage rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4">Lifestyle</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Lifestyle" field="lifestyle" options={selectOptions.lifestyle} />
              <SelectField label="Stress Level" field="stressLevel" options={selectOptions.stressLevel} />
              <SelectField label="Sleep Pattern" field="sleepPattern" options={selectOptions.sleepPattern} />
              <SelectField label="Diet Preference" field="dietPreference" options={selectOptions.dietPreference} />
              <SelectField label="Activity Level" field="activityLevel" options={selectOptions.activityLevel} />
            </div>
          </div>

          <Button onClick={handleSave} size="lg" className="w-full rounded-full text-base gap-2">
            <Save className="h-4 w-4" /> Save Profile
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
