export interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  lifestyle: string;
  cycleLength: number;
  lastPeriodDate: string;
  stressLevel: string;
  sleepPattern: string;
  dietPreference: string;
  activityLevel: string;
}

export interface DailyLog {
  id: string;
  date: string;
  mood: string;
  energyLevel: number;
  symptoms: string[];
  physicalActivity: string;
  foodIntake: string;
  sleepHours: number;
}

export interface WellnessInsight {
  id: string;
  date: string;
  category: string;
  title: string;
  content: string;
  icon: string;
}

const PROFILE_KEY = "ff_profile";
const LOGS_KEY = "ff_logs";
const INSIGHTS_KEY = "ff_insights";

export function getProfile(): UserProfile | null {
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getLogs(): DailyLog[] {
  const data = localStorage.getItem(LOGS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveLog(log: DailyLog) {
  const logs = getLogs();
  logs.unshift(log);
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}

export function getInsights(): WellnessInsight[] {
  const data = localStorage.getItem(INSIGHTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveInsights(insights: WellnessInsight[]) {
  localStorage.setItem(INSIGHTS_KEY, JSON.stringify(insights));
}
