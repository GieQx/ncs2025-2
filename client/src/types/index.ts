export type Speaker = {
  id: number;
  name: string;
  role: string;
  bio: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  imageUrl?: string;
};

export type SessionLocation = 'Main Hall' | 'Workshop Room A' | 'Workshop Room B' | 'Meeting Room C' | 'Exhibition Hall';
export type SessionLocationType = 'primary' | 'secondary' | 'accent' | 'neutral';

export type Panelist = {
  name: string;
  role?: string;
};

export type Session = {
  id: number;
  time: string;
  duration: string;
  title: string;
  location: SessionLocation;
  locationType: SessionLocationType;
  description: string;
  speaker?: {
    name: string;
    role: string;
  };
  panelists?: Panelist[];
  date: Date;
  day: 'day1' | 'day2' | 'day3';
};

export type Resource = {
  id: number;
  title: string;
  description: string;
  fileType: 'pdf' | 'excel' | 'powerpoint' | 'video' | 'dataset';
  fileSize: string;
  publishDate: string;
  downloadUrl: string;
};

export type StatisticalTool = {
  id: number;
  name: string;
  icon: string;
  color: string;
  description?: string;
  demoUrl?: string;
};

export type Attendee = {
  id: number;
  name: string;
  role: string;
  organization?: string;
  interests?: string[];
  profileImageUrl?: string;
};

export type QASession = {
  id: number;
  speaker: string;
  speakerRole?: string;
  topic: string;
  status: 'live' | 'upcoming' | 'completed';
  viewers?: number;
  timeToStart?: string;
  recording?: string;
};

export type NetworkingEvent = {
  id: number;
  title: string;
  time: string;
  description: string;
  attendees: number;
  location?: string;
  capacity?: number;
};

export type RegistrationType = {
  name: string;
  price: number;
  regularPrice?: number;
  discount?: string;
  deadline?: string;
  description: string;
  note?: string;
};

export type ChatMessage = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};
