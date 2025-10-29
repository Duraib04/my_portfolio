// Personal Information Database for AI Chat Agent
// This file contains Durai's personal information that the AI can access and calculate from

export interface PersonalInfo {
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD format
  location: {
    city: string;
    state: string;
    country: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  education: {
    current: string;
    field: string;
    specialization: string;
    graduationYear: number;
  };
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  interests: string[];
  personalityTraits: string[];
  careerGoals: string[];
}

// Durai's Personal Information
export const DURAI_PERSONAL_INFO: PersonalInfo = {
  fullName: "Durai B",
  dateOfBirth: "2003-06-15", // You can update this with Durai's actual birth date
  location: {
    city: "Cuddalore District",
    state: "Tamil Nadu",
    country: "India"
  },
  contact: {
    email: "duraib@gmail.com",
    phone: "+91 8770 6343"
  },
  education: {
    current: "Bachelor of Engineering in Computer Science",
    field: "Computer Science",
    specialization: "IoT (Internet of Things)",
    graduationYear: 2025
  },
  languages: [
    { name: "Tamil", proficiency: "Native" },
    { name: "English", proficiency: "Intermediate" }
  ],
  interests: [
    "Developing Technology-Driven Mini Projects",
    "Transforming Data/Interface and Database Design", 
    "Full Stack Development & Cloud Computing",
    "AI/ML Implementation",
    "Project-based Learning",
    "Healthcare Technology Solutions",
    "IoT and Smart Systems",
    "Open Source Contribution"
  ],
  personalityTraits: [
    "Curious and always eager to learn",
    "Problem-solver with analytical thinking",
    "Collaborative team player",
    "Detail-oriented in code quality",
    "Passionate about technology's social impact",
    "Patient mentor and teacher",
    "Innovative solution finder",
    "Reliable and deadline-focused"
  ],
  careerGoals: [
    "Become a full-stack development expert",
    "Lead innovative healthcare technology projects",
    "Contribute to open-source communities",
    "Mentor aspiring developers",
    "Build scalable IoT solutions",
    "Work with cutting-edge AI/ML technologies",
    "Start a tech company focused on social impact"
  ]
};

// Helper functions for the AI to use
export class PersonalInfoHelper {
  static calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  static getFormattedAge(): string {
    const age = this.calculateAge(DURAI_PERSONAL_INFO.dateOfBirth);
    return `${age} years old`;
  }

  static getBirthDate(): string {
    const date = new Date(DURAI_PERSONAL_INFO.dateOfBirth);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  static getZodiacSign(): string {
    const date = new Date(DURAI_PERSONAL_INFO.dateOfBirth);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    return "Pisces";
  }

  static getAgeInDays(): number {
    const today = new Date();
    const birthDate = new Date(DURAI_PERSONAL_INFO.dateOfBirth);
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static getNextBirthday(): string {
    const today = new Date();
    const birthDate = new Date(DURAI_PERSONAL_INFO.dateOfBirth);
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = nextBirthday.getTime() - today.getTime();
    const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (daysUntil === 0) {
      return "Today! 🎉";
    } else if (daysUntil === 1) {
      return "Tomorrow! 🎂";
    } else {
      return `${daysUntil} days`;
    }
  }

  static getPersonalDetail(category: keyof PersonalInfo): any {
    return DURAI_PERSONAL_INFO[category];
  }

  static searchPersonalInfo(query: string): string | null {
    const lowerQuery = query.toLowerCase();
    
    // Age-related queries
    if (lowerQuery.includes('age') || lowerQuery.includes('old') || lowerQuery.includes('years')) {
      return `Durai is currently ${this.getFormattedAge()}. He was born on ${this.getBirthDate()}.`;
    }
    
    // Birthday-related queries
    if (lowerQuery.includes('birthday') || lowerQuery.includes('birth') || lowerQuery.includes('born')) {
      const nextBday = this.getNextBirthday();
      return `Durai was born on ${this.getBirthDate()}. His next birthday is ${nextBday === "Today! 🎉" || nextBday === "Tomorrow! 🎂" ? nextBday : `in ${nextBday}`}`;
    }
    
    // Zodiac/Astrology
    if (lowerQuery.includes('zodiac') || lowerQuery.includes('sign') || lowerQuery.includes('astrology')) {
      return `Durai's zodiac sign is ${this.getZodiacSign()}. He was born on ${this.getBirthDate()}.`;
    }
    
    // Location queries
    if (lowerQuery.includes('where') && (lowerQuery.includes('live') || lowerQuery.includes('from') || lowerQuery.includes('location'))) {
      const location = DURAI_PERSONAL_INFO.location;
      return `Durai is from ${location.city}, ${location.state}, ${location.country}.`;
    }
    
    // Language queries
    if (lowerQuery.includes('language') || lowerQuery.includes('speak')) {
      const languages = DURAI_PERSONAL_INFO.languages.map(l => `${l.name} (${l.proficiency})`).join(', ');
      return `Durai speaks: ${languages}.`;
    }
    
    // Education queries
    if (lowerQuery.includes('study') || lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('college') || lowerQuery.includes('university')) {
      const edu = DURAI_PERSONAL_INFO.education;
      return `Durai is currently pursuing a ${edu.current} with specialization in ${edu.specialization}. He's expected to graduate in ${edu.graduationYear}.`;
    }
    
    // Personality queries
    if (lowerQuery.includes('personality') || lowerQuery.includes('character') || lowerQuery.includes('person') || lowerQuery.includes('like as')) {
      const traits = DURAI_PERSONAL_INFO.personalityTraits.slice(0, 4).join(', ');
      return `Durai is ${traits}. He's passionate about using technology to solve real-world problems!`;
    }
    
    // Goals and ambitions
    if (lowerQuery.includes('goal') || lowerQuery.includes('ambition') || lowerQuery.includes('future') || lowerQuery.includes('plan')) {
      const goals = DURAI_PERSONAL_INFO.careerGoals.slice(0, 3).join(', ');
      return `Durai's career goals include: ${goals}. He's focused on making a positive impact through technology!`;
    }
    
    return null;
  }
}