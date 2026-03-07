export type EventType = 'month-long' | 'single-day' | 'multi-day';

export interface CommunityEvent {
    id: number;
    title: string;
    type: EventType;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
    themeColor: string; // Hex code for the glassmorphic glow
    description: string;
}

export const COMMUNITY_EVENTS: CommunityEvent[] = [
    // ==========================================
    // AWARENESS MONTHS (Global & National)
    // ==========================================
    { id: 1, title: "Black History Month", type: "month-long", startDate: "2026-02-01", endDate: "2026-02-28", themeColor: "#EAB308", description: "Honoring the triumphs and struggles of African Americans throughout U.S. history." },
    { id: 2, title: "Women's History Month", type: "month-long", startDate: "2026-03-01", endDate: "2026-03-31", themeColor: "#9333EA", description: "Celebrating the vital role of women in American history and our local community." },
    { id: 3, title: "National Volunteer Month", type: "month-long", startDate: "2026-04-01", endDate: "2026-04-30", themeColor: "#FFC300", description: "A month dedicated to recognizing the importance of volunteering and community service." },
    { id: 4, title: "Earth Month", type: "month-long", startDate: "2026-04-01", endDate: "2026-04-30", themeColor: "#10B981", description: "Focusing on environmental protection and sustainability initiatives in Sammamish." },
    { id: 5, title: "Mental Health Awareness Month", type: "month-long", startDate: "2026-05-01", endDate: "2026-05-31", themeColor: "#22C55E", description: "Raising awareness and reducing the stigma surrounding mental health issues." },
    { id: 6, title: "Asian American and Pacific Islander Heritage Month", type: "month-long", startDate: "2026-05-01", endDate: "2026-05-31", themeColor: "#F43F5E", description: "Recognizing the contributions and influence of Asian Americans and Pacific Islanders." },
    { id: 7, title: "Pride Month", type: "month-long", startDate: "2026-06-01", endDate: "2026-06-30", themeColor: "#EC4899", description: "Celebrating LGBTQ+ culture, rights, and identity." },
    { id: 8, title: "Men's Health Month", type: "month-long", startDate: "2026-06-01", endDate: "2026-06-30", themeColor: "#3B82F6", description: "Encouraging early detection and treatment of disease among men and boys." },
    { id: 9, title: "National Minority Mental Health Awareness Month", type: "month-long", startDate: "2026-07-01", endDate: "2026-07-31", themeColor: "#06B6D4", description: "Bringing awareness to the unique struggles that racial and ethnic minority communities face regarding mental illness." },
    { id: 10, title: "Hispanic Heritage Month", type: "month-long", startDate: "2026-09-15", endDate: "2026-10-15", themeColor: "#F97316", description: "Celebrating the histories, cultures, and contributions of American citizens whose ancestors came from Spain, Mexico, the Caribbean, and Central and South America." },
    { id: 11, title: "Breast Cancer Awareness Month", type: "month-long", startDate: "2026-10-01", endDate: "2026-10-31", themeColor: "#F472B6", description: "An annual campaign to increase awareness of the disease and raise funds for research." },
    { id: 12, title: "Native American Heritage Month", type: "month-long", startDate: "2026-11-01", endDate: "2026-11-30", themeColor: "#B45309", description: "Celebrating the rich and diverse cultures, traditions, and histories of Native people." },

    // ==========================================
    // LOCAL SAMMAMISH & PNW EVENTS
    // ==========================================
    { id: 13, title: "Sammamish Farmers Market Opening Day", type: "single-day", startDate: "2026-05-06", endDate: "2026-05-06", themeColor: "#FFC300", description: "The seasonal return of fresh produce and local artisans to the Sammamish Commons." },
    { id: 14, title: "Sammamish Fourth on the Plateau", type: "single-day", startDate: "2026-07-04", endDate: "2026-07-04", themeColor: "#EF4444", description: "The city's premier Independence Day celebration with food trucks and fireworks." },
    { id: 15, title: "Sammamish Days & Nights", type: "multi-day", startDate: "2026-08-14", endDate: "2026-08-15", themeColor: "#FFC300", description: "A weekend festival celebrating the diverse cultures and community of Sammamish." },
    { id: 16, title: "Issaquah Salmon Days", type: "multi-day", startDate: "2026-10-03", endDate: "2026-10-04", themeColor: "#F97316", description: "Neighboring Issaquah's massive festival celebrating the return of the salmon." },
    { id: 17, title: "Very Merry Sammamish", type: "single-day", startDate: "2026-12-04", endDate: "2026-12-04", themeColor: "#10B981", description: "The annual holiday tree lighting and winter festival at the Sammamish Commons." },
    { id: 18, title: "Sammamish Earth Day Celebration", type: "single-day", startDate: "2026-04-22", endDate: "2026-04-22", themeColor: "#22C55E", description: "Local volunteer planting and park cleanup events across the city." },
    { id: 19, title: "Sammamish Lunar New Year Festival", type: "single-day", startDate: "2026-02-17", endDate: "2026-02-17", themeColor: "#DC2626", description: "Community celebration featuring traditional dances, food, and martial arts." },
    { id: 20, title: "Pine Lake Summer Concert Series Kickoff", type: "single-day", startDate: "2026-07-09", endDate: "2026-07-09", themeColor: "#8B5CF6", description: "The first outdoor music event of the summer at Pine Lake Park." },
    { id: 21, title: "Sammamish Diwali Celebration", type: "single-day", startDate: "2026-11-08", endDate: "2026-11-08", themeColor: "#F59E0B", description: "The festival of lights celebrated with local performances and food vendors." },
    { id: 22, title: "Eastside Tech & Innovation Fair", type: "single-day", startDate: "2026-09-20", endDate: "2026-09-20", themeColor: "#0EA5E9", description: "Local students and professionals showcase STEM projects in Redmond/Sammamish." },

    // ==========================================
    // JANUARY
    // ==========================================
    { id: 23, title: "New Year's Day", type: "single-day", startDate: "2026-01-01", endDate: "2026-01-01", themeColor: "#FFC300", description: "Welcome to 2026! A fresh start for the Sammamish community." },
    { id: 24, title: "World Braille Day", type: "single-day", startDate: "2026-01-04", endDate: "2026-01-04", themeColor: "#3B82F6", description: "Raising awareness of the importance of Braille as a means of communication." },
    { id: 25, title: "Martin Luther King Jr. Day", type: "single-day", startDate: "2026-01-19", endDate: "2026-01-19", themeColor: "#EAB308", description: "A day of service honoring the life and legacy of the civil rights leader." },
    { id: 26, title: "International Day of Education", type: "single-day", startDate: "2026-01-24", endDate: "2026-01-24", themeColor: "#8B5CF6", description: "Celebrating the role of education for peace and development." },
    { id: 27, title: "Data Privacy Day", type: "single-day", startDate: "2026-01-28", endDate: "2026-01-28", themeColor: "#64748B", description: "Empowering individuals and encouraging businesses to respect privacy." },
    { id: 28, title: "National Blood Donor Month", type: "month-long", startDate: "2026-01-01", endDate: "2026-01-31", themeColor: "#EF4444", description: "Encouraging life-saving blood donations during the winter shortage." },
    { id: 29, title: "Global Family Day", type: "single-day", startDate: "2026-01-01", endDate: "2026-01-01", themeColor: "#14B8A6", description: "A day of peace and sharing promoted by the United Nations." },
    { id: 30, title: "National Youth Day", type: "single-day", startDate: "2026-01-12", endDate: "2026-01-12", themeColor: "#F43F5E", description: "Celebrating the potential and power of young people." },
    { id: 31, title: "World Religion Day", type: "single-day", startDate: "2026-01-18", endDate: "2026-01-18", themeColor: "#D946EF", description: "Fostering interfaith understanding and harmony." },
    { id: 32, title: "Holocaust Remembrance Day", type: "single-day", startDate: "2026-01-27", endDate: "2026-01-27", themeColor: "#475569", description: "Honoring the victims of the Holocaust." },

    // ==========================================
    // FEBRUARY
    // ==========================================
    { id: 33, title: "Groundhog Day", type: "single-day", startDate: "2026-02-02", endDate: "2026-02-02", themeColor: "#A16207", description: "Will we have six more weeks of winter in the PNW?" },
    { id: 34, title: "World Cancer Day", type: "single-day", startDate: "2026-02-04", endDate: "2026-02-04", themeColor: "#9333EA", description: "Uniting the world in the fight against cancer." },
    { id: 35, title: "Safer Internet Day", type: "single-day", startDate: "2026-02-10", endDate: "2026-02-10", themeColor: "#3B82F6", description: "Promoting a safer and more responsible use of online technology." },
    { id: 36, title: "Valentine's Day", type: "single-day", startDate: "2026-02-14", endDate: "2026-02-14", themeColor: "#E11D48", description: "A day to celebrate love, friendship, and community appreciation." },
    { id: 37, title: "Presidents' Day", type: "single-day", startDate: "2026-02-16", endDate: "2026-02-16", themeColor: "#1D4ED8", description: "Honoring all past presidents of the United States." },
    { id: 38, title: "Lunar New Year", type: "single-day", startDate: "2026-02-17", endDate: "2026-02-17", themeColor: "#DC2626", description: "Welcoming the Year of the Horse in the traditional lunisolar calendar." },
    { id: 39, title: "Random Acts of Kindness Day", type: "single-day", startDate: "2026-02-17", endDate: "2026-02-17", themeColor: "#10B981", description: "Encouraging spontaneous moments of kindness around Sammamish." },
    { id: 40, title: "World Day of Social Justice", type: "single-day", startDate: "2026-02-20", endDate: "2026-02-20", themeColor: "#F59E0B", description: "Promoting efforts to tackle issues such as poverty, exclusion, and unemployment." },
    { id: 41, title: "Rare Disease Day", type: "single-day", startDate: "2026-02-28", endDate: "2026-02-28", themeColor: "#8B5CF6", description: "Raising awareness for rare diseases and improving access to treatment." },
    { id: 42, title: "National Wear Red Day", type: "single-day", startDate: "2026-02-06", endDate: "2026-02-06", themeColor: "#EF4444", description: "Raising awareness about heart disease in women." },

    // ==========================================
    // MARCH
    // ==========================================
    { id: 43, title: "Zero Discrimination Day", type: "single-day", startDate: "2026-03-01", endDate: "2026-03-01", themeColor: "#D946EF", description: "Promoting equality before the law and in practice." },
    { id: 44, title: "World Wildlife Day", type: "single-day", startDate: "2026-03-03", endDate: "2026-03-03", themeColor: "#15803D", description: "Celebrating and raising awareness of the world's wild animals and plants." },
    { id: 45, title: "International Women's Day", type: "single-day", startDate: "2026-03-08", endDate: "2026-03-08", themeColor: "#9333EA", description: "A global day celebrating the social, economic, cultural, and political achievements of women." },
    { id: 46, title: "Pi Day", type: "single-day", startDate: "2026-03-14", endDate: "2026-03-14", themeColor: "#0EA5E9", description: "Celebrating the mathematical constant π (3.14) and STEM education." },
    { id: 47, title: "St. Patrick's Day", type: "single-day", startDate: "2026-03-17", endDate: "2026-03-17", themeColor: "#22C55E", description: "A cultural and religious celebration recognizing the patron saint of Ireland." },
    { id: 48, title: "Global Recycling Day", type: "single-day", startDate: "2026-03-18", endDate: "2026-03-18", themeColor: "#10B981", description: "Recognizing the importance of recycling in preserving our primary resources." },
    { id: 49, title: "First Day of Spring (Vernal Equinox)", type: "single-day", startDate: "2026-03-20", endDate: "2026-03-20", themeColor: "#A3E635", description: "Welcoming warmer weather and blooming trails in the PNW." },
    { id: 50, title: "World Down Syndrome Day", type: "single-day", startDate: "2026-03-21", endDate: "2026-03-21", themeColor: "#3B82F6", description: "Raising public awareness and advocating for the rights of people with Down syndrome." },
    { id: 51, title: "World Water Day", type: "single-day", startDate: "2026-03-22", endDate: "2026-03-22", themeColor: "#0284C7", description: "Focusing attention on the importance of freshwater." },
    { id: 52, title: "Ramadan Begins", type: "month-long", startDate: "2026-02-18", endDate: "2026-03-19", themeColor: "#14B8A6", description: "The Islamic holy month of fasting, introspection, and prayer." },
    { id: 53, title: "Eid al-Fitr", type: "single-day", startDate: "2026-03-20", endDate: "2026-03-20", themeColor: "#14B8A6", description: "The Festival of Breaking the Fast, marking the end of Ramadan." },
    { id: 54, title: "Transgender Day of Visibility", type: "single-day", startDate: "2026-03-31", endDate: "2026-03-31", themeColor: "#60A5FA", description: "Celebrating transgender people and raising awareness of discrimination faced by transgender people worldwide." },
    { id: 55, title: "National Read Across America Day", type: "single-day", startDate: "2026-03-02", endDate: "2026-03-02", themeColor: "#EF4444", description: "Promoting reading and literacy programs for children." },
    { id: 56, title: "Holi", type: "single-day", startDate: "2026-03-03", endDate: "2026-03-03", themeColor: "#D946EF", description: "The Hindu festival of colors, spring, and love." },
    { id: 57, title: "International Day of Happiness", type: "single-day", startDate: "2026-03-20", endDate: "2026-03-20", themeColor: "#FDE047", description: "Recognizing the relevance of happiness and well-being as universal goals." },

    // ==========================================
    // APRIL
    // ==========================================
    { id: 58, title: "April Fools' Day", type: "single-day", startDate: "2026-04-01", endDate: "2026-04-01", themeColor: "#F97316", description: "A day for harmless community pranks and good humor." },
    { id: 59, title: "World Autism Awareness Day", type: "single-day", startDate: "2026-04-02", endDate: "2026-04-02", themeColor: "#3B82F6", description: "Highlighting the need to help improve the quality of life of those with autism." },
    { id: 60, title: "Passover Begins", type: "multi-day", startDate: "2026-04-01", endDate: "2026-04-09", themeColor: "#1D4ED8", description: "The major Jewish spring festival commemorating the liberation of the Israelites from Egyptian slavery." },
    { id: 61, title: "Good Friday", type: "single-day", startDate: "2026-04-03", endDate: "2026-04-03", themeColor: "#64748B", description: "Christian holiday commemorating the crucifixion of Jesus." },
    { id: 62, title: "Easter Sunday", type: "single-day", startDate: "2026-04-05", endDate: "2026-04-05", themeColor: "#D8B4FE", description: "Christian festival celebrating the resurrection of Jesus." },
    { id: 63, title: "World Health Day", type: "single-day", startDate: "2026-04-07", endDate: "2026-04-07", themeColor: "#10B981", description: "Drawing worldwide attention to a subject of major importance to global health." },
    { id: 64, title: "National Pet Day", type: "single-day", startDate: "2026-04-11", endDate: "2026-04-11", themeColor: "#F59E0B", description: "Celebrating our furry friends and advocating for pet adoption." },
    { id: 65, title: "Tax Day (US)", type: "single-day", startDate: "2026-04-15", endDate: "2026-04-15", themeColor: "#475569", description: "The deadline for filing US income tax returns." },
    { id: 66, title: "Earth Day", type: "single-day", startDate: "2026-04-22", endDate: "2026-04-22", themeColor: "#15803D", description: "Global event demonstrating support for environmental protection." },
    { id: 67, title: "World Book Day", type: "single-day", startDate: "2026-04-23", endDate: "2026-04-23", themeColor: "#8B5CF6", description: "Promoting reading, publishing, and copyright." },
    { id: 68, title: "Arbor Day", type: "single-day", startDate: "2026-04-24", endDate: "2026-04-24", themeColor: "#166534", description: "Encouraging individuals and groups to plant trees." },
    { id: 69, title: "International Jazz Day", type: "single-day", startDate: "2026-04-30", endDate: "2026-04-30", themeColor: "#EAB308", description: "Celebrating the virtues of jazz as an educational tool, and a force for peace." },
    { id: 70, title: "National Siblings Day", type: "single-day", startDate: "2026-04-10", endDate: "2026-04-10", themeColor: "#F472B6", description: "A day to honor the relationships between siblings." },
    { id: 71, title: "Record Store Day", type: "single-day", startDate: "2026-04-18", endDate: "2026-04-18", themeColor: "#1F2937", description: "Celebrating the culture of the independently owned record store." },
    { id: 72, title: "Administrative Professionals Day", type: "single-day", startDate: "2026-04-22", endDate: "2026-04-22", themeColor: "#0EA5E9", description: "Recognizing the work of secretaries, administrative assistants, and receptionists." },

    // ==========================================
    // MAY
    // ==========================================
    { id: 73, title: "May Day", type: "single-day", startDate: "2026-05-01", endDate: "2026-05-01", themeColor: "#A3E635", description: "A traditional spring festival and international day honoring workers." },
    { id: 74, title: "Cinco de Mayo", type: "single-day", startDate: "2026-05-05", endDate: "2026-05-05", themeColor: "#10B981", description: "Celebrating Mexican heritage and pride." },
    { id: 75, title: "National Nurses Day", type: "single-day", startDate: "2026-05-06", endDate: "2026-05-06", themeColor: "#0284C7", description: "Honoring the contributions and sacrifices of nurses." },
    { id: 76, title: "Mother's Day", type: "single-day", startDate: "2026-05-10", endDate: "2026-05-10", themeColor: "#F472B6", description: "Honoring mothers and motherhood." },
    { id: 77, title: "International Day against Homophobia, Transphobia and Biphobia", type: "single-day", startDate: "2026-05-17", endDate: "2026-05-17", themeColor: "#EC4899", description: "Coordinating international events that raise awareness of LGBT rights violations." },
    { id: 78, title: "World Bee Day", type: "single-day", startDate: "2026-05-20", endDate: "2026-05-20", themeColor: "#FDE047", description: "Acknowledging the role of bees and other pollinators for the ecosystem." },
    { id: 79, title: "Memorial Day", type: "single-day", startDate: "2026-05-25", endDate: "2026-05-25", themeColor: "#1D4ED8", description: "Honoring the men and women who died while serving in the U.S. military." },
    { id: 80, title: "Eid al-Adha Begins", type: "multi-day", startDate: "2026-05-26", endDate: "2026-05-30", themeColor: "#14B8A6", description: "The Feast of Sacrifice, the second of two main holidays celebrated in Islam." },
    { id: 81, title: "World Multiple Sclerosis Day", type: "single-day", startDate: "2026-05-30", endDate: "2026-05-30", themeColor: "#F97316", description: "Sharing stories, raising awareness and campaigning with everyone affected by MS." },
    { id: 82, title: "World No Tobacco Day", type: "single-day", startDate: "2026-05-31", endDate: "2026-05-31", themeColor: "#94A3B8", description: "Encouraging a 24-hour period of abstinence from all forms of tobacco consumption." },
    { id: 83, title: "National Bike Month", type: "month-long", startDate: "2026-05-01", endDate: "2026-05-31", themeColor: "#22C55E", description: "Promoting bicycling as an eco-friendly and healthy transit option." },
    { id: 84, title: "Teacher Appreciation Week", type: "multi-day", startDate: "2026-05-04", endDate: "2026-05-08", themeColor: "#EAB308", description: "A week to honor the educators shaping the next generation." },
    { id: 85, title: "Star Wars Day", type: "single-day", startDate: "2026-05-04", endDate: "2026-05-04", themeColor: "#000000", description: "May the 4th be with you! A fun pop-culture celebration." },
    { id: 86, title: "National Physical Fitness & Sports Month", type: "month-long", startDate: "2026-05-01", endDate: "2026-05-31", themeColor: "#3B82F6", description: "Encouraging residents to get active at Sammamish parks." },
    { id: 87, title: "National Foster Care Month", type: "month-long", startDate: "2026-05-01", endDate: "2026-05-31", themeColor: "#0EA5E9", description: "Acknowledging foster parents, family members, volunteers, and child welfare professionals." },

    // ==========================================
    // JUNE
    // ==========================================
    { id: 88, title: "Global Day of Parents", type: "single-day", startDate: "2026-06-01", endDate: "2026-06-01", themeColor: "#F472B6", description: "Appreciating all parents in all parts of the world for their selfless commitment." },
    { id: 89, title: "World Environment Day", type: "single-day", startDate: "2026-06-05", endDate: "2026-06-05", themeColor: "#15803D", description: "Encouraging worldwide awareness and action to protect our environment." },
    { id: 90, title: "World Oceans Day", type: "single-day", startDate: "2026-06-08", endDate: "2026-06-08", themeColor: "#0284C7", description: "Celebrating the ocean, its importance in our lives, and how we can protect it." },
    { id: 91, title: "Flag Day (US)", type: "single-day", startDate: "2026-06-14", endDate: "2026-06-14", themeColor: "#EF4444", description: "Commemorating the adoption of the flag of the United States." },
    { id: 92, title: "World Blood Donor Day", type: "single-day", startDate: "2026-06-14", endDate: "2026-06-14", themeColor: "#DC2626", description: "Thanking voluntary, unpaid blood donors for their life-saving gifts." },
    { id: 93, title: "Juneteenth", type: "single-day", startDate: "2026-06-19", endDate: "2026-06-19", themeColor: "#DC2626", description: "Commemorating the ending of slavery in the United States." },
    { id: 94, title: "First Day of Summer (Summer Solstice)", type: "single-day", startDate: "2026-06-21", endDate: "2026-06-21", themeColor: "#FFC300", description: "The longest day of the year in the Pacific Northwest." },
    { id: 95, title: "Father's Day", type: "single-day", startDate: "2026-06-21", endDate: "2026-06-21", themeColor: "#3B82F6", description: "Honoring fathers and celebrating fatherhood." },
    { id: 96, title: "World Refugee Day", type: "single-day", startDate: "2026-06-20", endDate: "2026-06-20", themeColor: "#8B5CF6", description: "Honoring the courage, strength, and determination of women, men, and children forced to flee their homeland." },
    { id: 97, title: "International Day of Yoga", type: "single-day", startDate: "2026-06-21", endDate: "2026-06-21", themeColor: "#14B8A6", description: "Raising awareness worldwide of the many benefits of practicing yoga." },
    { id: 98, title: "National Indigenous Peoples Day (Canada)", type: "single-day", startDate: "2026-06-21", endDate: "2026-06-21", themeColor: "#B45309", description: "Recognizing and celebrating the cultures and contributions of First Nations, Inuit, and Métis Indigenous peoples." },
    { id: 99, title: "Micro-, Small and Medium-sized Enterprises Day", type: "single-day", startDate: "2026-06-27", endDate: "2026-06-27", themeColor: "#0EA5E9", description: "Recognizing the contribution of small businesses to sustainable development." },
    { id: 100, title: "National Trails Day", type: "single-day", startDate: "2026-06-06", endDate: "2026-06-06", themeColor: "#166534", description: "A day to hit the Sammamish trail network and appreciate public lands." },
    { id: 101, title: "National Safety Month", type: "month-long", startDate: "2026-06-01", endDate: "2026-06-30", themeColor: "#F59E0B", description: "Focusing on reducing leading causes of injury and death at work, on the road, and in homes." },
    { id: 102, title: "Alzheimer's and Brain Awareness Month", type: "month-long", startDate: "2026-06-01", endDate: "2026-06-30", themeColor: "#A855F7", description: "An opportunity to hold a conversation about the brain, and share the fact that Alzheimer's disease and other dementias are a major public health issue." },

    // ==========================================
    // JULY
    // ==========================================
    { id: 103, title: "Canada Day", type: "single-day", startDate: "2026-07-01", endDate: "2026-07-01", themeColor: "#EF4444", description: "Celebrating our neighbors to the north." },
    { id: 104, title: "Independence Day (US)", type: "single-day", startDate: "2026-07-04", endDate: "2026-07-04", themeColor: "#1D4ED8", description: "Celebrating the adoption of the Declaration of Independence." },
    { id: 105, title: "World Population Day", type: "single-day", startDate: "2026-07-11", endDate: "2026-07-11", themeColor: "#6366F1", description: "Focusing attention on the urgency and importance of population issues." },
    { id: 106, title: "Malala Day", type: "single-day", startDate: "2026-07-12", endDate: "2026-07-12", themeColor: "#EC4899", description: "Honoring Malala Yousafzai and the right to education for all children." },
    { id: 107, title: "Nelson Mandela International Day", type: "single-day", startDate: "2026-07-18", endDate: "2026-07-18", themeColor: "#22C55E", description: "A call to action for individuals to help change the world for the better." },
    { id: 108, title: "National Ice Cream Day", type: "single-day", startDate: "2026-07-19", endDate: "2026-07-19", themeColor: "#FDE047", description: "A perfect excuse to visit local Sammamish dessert shops." },
    { id: 109, title: "International Self-Care Day", type: "single-day", startDate: "2026-07-24", endDate: "2026-07-24", themeColor: "#38BDF8", description: "Promoting self-care as a vital foundation for health." },
    { id: 110, title: "National Parents' Day", type: "single-day", startDate: "2026-07-26", endDate: "2026-07-26", themeColor: "#8B5CF6", description: "Honoring all parents and their dedication to their children." },
    { id: 111, title: "World Hepatitis Day", type: "single-day", startDate: "2026-07-28", endDate: "2026-07-28", themeColor: "#F59E0B", description: "Raising global awareness of hepatitis and encouraging prevention, diagnosis, and treatment." },
    { id: 112, title: "International Day of Friendship", type: "single-day", startDate: "2026-07-30", endDate: "2026-07-30", themeColor: "#F472B6", description: "Promoting the idea that friendship between peoples, countries, and cultures can inspire peace efforts." },
    { id: 113, title: "National Minority Mental Health Awareness Month", type: "month-long", startDate: "2026-07-01", endDate: "2026-07-31", themeColor: "#0EA5E9", description: "Bringing awareness to the unique struggles that racial and ethnic minority communities face regarding mental illness." },
    { id: 114, title: "Plastic Free July", type: "month-long", startDate: "2026-07-01", endDate: "2026-07-31", themeColor: "#10B981", description: "A global movement that helps millions of people be part of the solution to plastic pollution." },
    { id: 115, title: "Disability Pride Month", type: "month-long", startDate: "2026-07-01", endDate: "2026-07-31", themeColor: "#8B5CF6", description: "Celebrating the history, culture, and contributions of people with disabilities." },
    { id: 116, title: "World Nature Conservation Day", type: "single-day", startDate: "2026-07-28", endDate: "2026-07-28", themeColor: "#15803D", description: "Recognizing that a healthy environment is the foundation for a stable and healthy human society." },
    { id: 117, title: "System Administrator Appreciation Day", type: "single-day", startDate: "2026-07-31", endDate: "2026-07-31", themeColor: "#64748B", description: "Showing appreciation for the IT professionals who keep our digital world running." },

    // ==========================================
    // AUGUST
    // ==========================================
    { id: 118, title: "International Youth Day", type: "single-day", startDate: "2026-08-12", endDate: "2026-08-12", themeColor: "#F43F5E", description: "Bringing youth issues to the attention of the international community." },
    { id: 119, title: "World Humanitarian Day", type: "single-day", startDate: "2026-08-19", endDate: "2026-08-19", themeColor: "#0EA5E9", description: "Paying tribute to aid workers who risk their lives in humanitarian service." },
    { id: 120, title: "National Senior Citizens Day", type: "single-day", startDate: "2026-08-21", endDate: "2026-08-21", themeColor: "#A855F7", description: "Honoring the wisdom and contributions of our older residents." },
    { id: 121, title: "Women's Equality Day", type: "single-day", startDate: "2026-08-26", endDate: "2026-08-26", themeColor: "#D946EF", description: "Commemorating the passage of the 19th Amendment, granting women the right to vote." },
    { id: 122, title: "National Dog Day", type: "single-day", startDate: "2026-08-26", endDate: "2026-08-26", themeColor: "#F59E0B", description: "A day to celebrate all breeds, pure and mixed, and advocate for adoption." },
    { id: 123, title: "International Overdose Awareness Day", type: "single-day", startDate: "2026-08-31", endDate: "2026-08-31", themeColor: "#64748B", description: "Raising awareness and reducing the stigma of drug-related death." },
    { id: 124, title: "National Immunization Awareness Month", type: "month-long", startDate: "2026-08-01", endDate: "2026-08-31", themeColor: "#14B8A6", description: "Highlighting the importance of vaccination for people of all ages." },
    { id: 125, title: "National Farmers Market Week", type: "multi-day", startDate: "2026-08-02", endDate: "2026-08-08", themeColor: "#22C55E", description: "Celebrating the vital role farmers markets play in the food system." },
    { id: 126, title: "Purple Heart Day", type: "single-day", startDate: "2026-08-07", endDate: "2026-08-07", themeColor: "#7E22CE", description: "Honoring military personnel wounded or killed in battle." },
    { id: 127, title: "World Elephant Day", type: "single-day", startDate: "2026-08-12", endDate: "2026-08-12", themeColor: "#94A3B8", description: "Dedicated to the preservation and protection of the world's elephants." },
    { id: 128, title: "Left Handers Day", type: "single-day", startDate: "2026-08-13", endDate: "2026-08-13", themeColor: "#F97316", description: "Celebrating the uniqueness and differences of left-handed individuals." },
    { id: 129, title: "National Nonprofit Day", type: "single-day", startDate: "2026-08-17", endDate: "2026-08-17", themeColor: "#3B82F6", description: "Recognizing the positive impacts nonprofits have on communities." },
    { id: 130, title: "World Photography Day", type: "single-day", startDate: "2026-08-19", endDate: "2026-08-19", themeColor: "#000000", description: "Celebrating the art, craft, science, and history of photography." },
    { id: 131, title: "Grief Awareness Day", type: "single-day", startDate: "2026-08-30", endDate: "2026-08-30", themeColor: "#475569", description: "A day for raising awareness of the ways individuals cope with loss." },
    { id: 132, title: "Back to School Prep Week", type: "multi-day", startDate: "2026-08-24", endDate: "2026-08-30", themeColor: "#EAB308", description: "Local resources and drives for Lake Washington & Issaquah school districts." },

    // ==========================================
    // SEPTEMBER
    // ==========================================
    { id: 133, title: "Labor Day", type: "single-day", startDate: "2026-09-07", endDate: "2026-09-07", themeColor: "#1D4ED8", description: "Honoring the American labor movement and the contributions of workers." },
    { id: 134, title: "International Day of Charity", type: "single-day", startDate: "2026-09-05", endDate: "2026-09-05", themeColor: "#EC4899", description: "Promoting charitable efforts to alleviate poverty worldwide." },
    { id: 135, title: "World Suicide Prevention Day", type: "single-day", startDate: "2026-09-10", endDate: "2026-09-10", themeColor: "#F59E0B", description: "Promoting worldwide commitment and action to prevent suicides." },
    { id: 136, title: "Patriot Day (9/11 Remembrance)", type: "single-day", startDate: "2026-09-11", endDate: "2026-09-11", themeColor: "#475569", description: "A day of remembrance for the victims of the September 11 attacks." },
    { id: 137, title: "International Day of Peace", type: "single-day", startDate: "2026-09-21", endDate: "2026-09-21", themeColor: "#14B8A6", description: "A day devoted to strengthening the ideals of peace." },
    { id: 138, title: "First Day of Fall (Autumnal Equinox)", type: "single-day", startDate: "2026-09-22", endDate: "2026-09-22", themeColor: "#D97706", description: "Welcoming the changing colors and crisp air of PNW autumn." },
    { id: 139, title: "National Voter Registration Day", type: "single-day", startDate: "2026-09-22", endDate: "2026-09-22", themeColor: "#EF4444", description: "A civic holiday encouraging Americans to register to vote." },
    { id: 140, title: "World Tourism Day", type: "single-day", startDate: "2026-09-27", endDate: "2026-09-27", themeColor: "#0EA5E9", description: "Fostering awareness of tourism's social, cultural, political, and economic value." },
    { id: 141, title: "World Heart Day", type: "single-day", startDate: "2026-09-29", endDate: "2026-09-29", themeColor: "#E11D48", description: "Informing people that heart disease and stroke are the world’s leading causes of death." },
    { id: 142, title: "Suicide Prevention Awareness Month", type: "month-long", startDate: "2026-09-01", endDate: "2026-09-30", themeColor: "#8B5CF6", description: "Raising awareness, reducing stigma, and promoting resources." },
    { id: 143, title: "National Preparedness Month", type: "month-long", startDate: "2026-09-01", endDate: "2026-09-30", themeColor: "#F59E0B", description: "Encouraging Sammamish residents to prepare for emergencies and natural disasters." },
    { id: 144, title: "Rosh Hashanah Begins", type: "multi-day", startDate: "2026-09-11", endDate: "2026-09-13", themeColor: "#1D4ED8", description: "The Jewish New Year, a time of reflection and resolution." },
    { id: 145, title: "Yom Kippur", type: "single-day", startDate: "2026-09-21", endDate: "2026-09-21", themeColor: "#64748B", description: "The holiest day of the year in Judaism, focusing on atonement and repentance." },
    { id: 146, title: "National Public Lands Day", type: "single-day", startDate: "2026-09-26", endDate: "2026-09-26", themeColor: "#15803D", description: "The nation's largest single-day volunteer effort for public lands." },
    { id: 147, title: "World Rabies Day", type: "single-day", startDate: "2026-09-28", endDate: "2026-09-28", themeColor: "#EF4444", description: "Raising awareness about rabies prevention and to highlight progress in defeating this horrifying disease." },

    // ==========================================
    // OCTOBER
    // ==========================================
    { id: 148, title: "World Teachers' Day", type: "single-day", startDate: "2026-10-05", endDate: "2026-10-05", themeColor: "#EAB308", description: "Celebrating the critical role of teachers in guiding children, youth, and adults." },
    { id: 149, title: "World Mental Health Day", type: "single-day", startDate: "2026-10-10", endDate: "2026-10-10", themeColor: "#22C55E", description: "Raising awareness of mental health issues around the world and mobilizing efforts in support of mental health." },
    { id: 150, title: "Indigenous Peoples' Day (US)", type: "single-day", startDate: "2026-10-12", endDate: "2026-10-12", themeColor: "#B45309", description: "Honoring the history, cultures, and contributions of Native American peoples." },
    { id: 151, title: "World Food Day", type: "single-day", startDate: "2026-10-16", endDate: "2026-10-16", themeColor: "#F59E0B", description: "Promoting global awareness and action for those who suffer from hunger." },
    { id: 152, title: "United Nations Day", type: "single-day", startDate: "2026-10-24", endDate: "2026-10-24", themeColor: "#0284C7", description: "Marking the anniversary of the entry into force of the UN Charter in 1945." },
    { id: 153, title: "Halloween", type: "single-day", startDate: "2026-10-31", endDate: "2026-10-31", themeColor: "#EA580C", description: "Trick-or-treating and community harvest festivals across Sammamish." },
    { id: 154, title: "Domestic Violence Awareness Month", type: "month-long", startDate: "2026-10-01", endDate: "2026-10-31", themeColor: "#9333EA", description: "Connecting advocates across the nation who are working to end violence within the home." },
    { id: 155, title: "National Bullying Prevention Month", type: "month-long", startDate: "2026-10-01", endDate: "2026-10-31", themeColor: "#0EA5E9", description: "A nationwide campaign to unite communities nationwide to educate and raise awareness of bullying prevention." },
    { id: 156, title: "Global Handwashing Day", type: "single-day", startDate: "2026-10-15", endDate: "2026-10-15", themeColor: "#38BDF8", description: "Increasing awareness and understanding about the importance of handwashing with soap." },
    { id: 157, title: "International Day for the Eradication of Poverty", type: "single-day", startDate: "2026-10-17", endDate: "2026-10-17", themeColor: "#475569", description: "Acknowledging the effort and struggle of people living in poverty." },
    { id: 158, title: "World Polio Day", type: "single-day", startDate: "2026-10-24", endDate: "2026-10-24", themeColor: "#D946EF", description: "Highlighting global efforts toward a polio-free world." },
    { id: 159, title: "Make a Difference Day", type: "single-day", startDate: "2026-10-24", endDate: "2026-10-24", themeColor: "#10B981", description: "The largest national day of community service." },
    { id: 160, title: "National First Responders Day", type: "single-day", startDate: "2026-10-28", endDate: "2026-10-28", themeColor: "#EF4444", description: "Honoring the paramedics, EMTs, police officers, and firefighters who serve our community." },
    { id: 161, title: "World Stroke Day", type: "single-day", startDate: "2026-10-29", endDate: "2026-10-29", themeColor: "#DC2626", description: "Emphasizing the serious nature and high rates of stroke, and raising awareness of the prevention and treatment." },
    { id: 162, title: "Navrati Begins", type: "multi-day", startDate: "2026-10-10", endDate: "2026-10-18", themeColor: "#EC4899", description: "A major Hindu festival celebrating the victory of good over evil." },
    { id: 163, title: "Filipino American History Month", type: "month-long", startDate: "2026-10-01", endDate: "2026-10-31", themeColor: "#FDE047", description: "Commemorating the first recorded presence of Filipinos in the continental United States." },
    { id: 164, title: "LGBTQ+ History Month", type: "month-long", startDate: "2026-10-01", endDate: "2026-10-31", themeColor: "#D946EF", description: "Observing lesbian, gay, bisexual, and transgender history." },

    // ==========================================
    // NOVEMBER
    // ==========================================
    { id: 165, title: "All Saints' Day", type: "single-day", startDate: "2026-11-01", endDate: "2026-11-01", themeColor: "#E2E8F0", description: "A Christian solemnity celebrating all the saints, known and unknown." },
    { id: 166, title: "Day of the Dead (Día de los Muertos)", type: "multi-day", startDate: "2026-11-01", endDate: "2026-11-02", themeColor: "#F97316", description: "A Mexican holiday where families welcome back the souls of their deceased relatives." },
    { id: 167, title: "Election Day (US)", type: "single-day", startDate: "2026-11-03", endDate: "2026-11-03", themeColor: "#1D4ED8", description: "Make your voice heard at the local polls." },
    { id: 168, title: "Veterans Day", type: "single-day", startDate: "2026-11-11", endDate: "2026-11-11", themeColor: "#1E3A8A", description: "Honoring military veterans who have served in the United States Armed Forces." },
    { id: 169, title: "World Kindness Day", type: "single-day", startDate: "2026-11-13", endDate: "2026-11-13", themeColor: "#F472B6", description: "Highlighting good deeds in the community focusing on the positive power of kindness." },
    { id: 170, title: "Transgender Day of Remembrance", type: "single-day", startDate: "2026-11-20", endDate: "2026-11-20", themeColor: "#60A5FA", description: "Memorializing those who have been murdered as a result of transphobia." },
    { id: 171, title: "World Children's Day", type: "single-day", startDate: "2026-11-20", endDate: "2026-11-20", themeColor: "#38BDF8", description: "Promoting international togetherness, awareness among children worldwide, and improving children's welfare." },
    { id: 172, title: "Thanksgiving Day", type: "single-day", startDate: "2026-11-26", endDate: "2026-11-26", themeColor: "#D97706", description: "A national holiday of giving thanks and gathering with family and community." },
    { id: 173, title: "Small Business Saturday", type: "single-day", startDate: "2026-11-28", endDate: "2026-11-28", themeColor: "#0284C7", description: "Supporting local Sammamish businesses during the holiday shopping season." },
    { id: 174, title: "Giving Tuesday", type: "single-day", startDate: "2026-12-01", endDate: "2026-12-01", themeColor: "#10B981", description: "A global generosity movement unleashing the power of people to transform their communities." }, // Occurs slightly after Thanksgiving
    { id: 175, title: "Movember / Men's Health Awareness", type: "month-long", startDate: "2026-11-01", endDate: "2026-11-30", themeColor: "#3B82F6", description: "Raising awareness of men's health issues, such as prostate cancer and men's suicide." },
    { id: 176, title: "National Adoption Month", type: "month-long", startDate: "2026-11-01", endDate: "2026-11-30", themeColor: "#8B5CF6", description: "Increasing national awareness of the need for permanent families for children and youth in the foster care system." },
    { id: 177, title: "World Diabetes Day", type: "single-day", startDate: "2026-11-14", endDate: "2026-11-14", themeColor: "#0EA5E9", description: "The primary global awareness campaign focusing on diabetes mellitus." },
    { id: 178, title: "International Men's Day", type: "single-day", startDate: "2026-11-19", endDate: "2026-11-19", themeColor: "#1D4ED8", description: "Celebrating the positive value men bring to the world, their families, and communities." },
    { id: 179, title: "Native American Heritage Day", type: "single-day", startDate: "2026-11-27", endDate: "2026-11-27", themeColor: "#B45309", description: "Honoring the heritage and contributions of Native Americans." },

    // ==========================================
    // DECEMBER
    // ==========================================
    { id: 180, title: "World AIDS Day", type: "single-day", startDate: "2026-12-01", endDate: "2026-12-01", themeColor: "#DC2626", description: "Dedicated to raising awareness of the AIDS pandemic and mourning those who have died of the disease." },
    { id: 181, title: "International Day of Persons with Disabilities", type: "single-day", startDate: "2026-12-03", endDate: "2026-12-03", themeColor: "#8B5CF6", description: "Promoting the rights and well-being of persons with disabilities." },
    { id: 182, title: "International Volunteer Day", type: "single-day", startDate: "2026-12-05", endDate: "2026-12-05", themeColor: "#10B981", description: "A chance for volunteer organizations and individual volunteers to celebrate their efforts." },
    { id: 183, title: "Hanukkah Begins", type: "multi-day", startDate: "2026-12-04", endDate: "2026-12-12", themeColor: "#1E3A8A", description: "The Jewish Festival of Lights." },
    { id: 184, title: "Human Rights Day", type: "single-day", startDate: "2026-12-10", endDate: "2026-12-10", themeColor: "#0EA5E9", description: "Commemorating the adoption of the Universal Declaration of Human Rights." },
    { id: 185, title: "First Day of Winter (Winter Solstice)", type: "single-day", startDate: "2026-12-21", endDate: "2026-12-21", themeColor: "#64748B", description: "The shortest day of the year; welcoming winter in the Pacific Northwest." },
    { id: 186, title: "Christmas Eve", type: "single-day", startDate: "2026-12-24", endDate: "2026-12-24", themeColor: "#DC2626", description: "The evening before Christmas, often celebrated with community carols and services." },
    { id: 187, title: "Christmas Day", type: "single-day", startDate: "2026-12-25", endDate: "2026-12-25", themeColor: "#15803D", description: "Christian holiday celebrating the birth of Jesus Christ." },
    { id: 188, title: "Kwanzaa Begins", type: "multi-day", startDate: "2026-12-26", endDate: "2026-12-31", themeColor: "#B45309", description: "Annual celebration of African-American culture spanning seven days." },
    { id: 189, title: "New Year's Eve", type: "single-day", startDate: "2026-12-31", endDate: "2026-12-31", themeColor: "#FCD34D", description: "Saying goodbye to 2026 and celebrating the year ahead." },
    { id: 190, title: "Universal Month for Human Rights", type: "month-long", startDate: "2026-12-01", endDate: "2026-12-31", themeColor: "#0284C7", description: "A month dedicated to reflecting on the importance of human rights globally." },
    { id: 191, title: "National Special Education Day", type: "single-day", startDate: "2026-12-02", endDate: "2026-12-02", themeColor: "#9333EA", description: "Commemorating the signing of the first federal special education law." },
    { id: 192, title: "Pearl Harbor Remembrance Day", type: "single-day", startDate: "2026-12-07", endDate: "2026-12-07", themeColor: "#475569", description: "Honoring the 2,403 Americans who were killed in the 1941 attack." },
    { id: 193, title: "International Anti-Corruption Day", type: "single-day", startDate: "2026-12-09", endDate: "2026-12-09", themeColor: "#F59E0B", description: "Raising public awareness for anti-corruption initiatives." },
    { id: 194, title: "International Mountain Day", type: "single-day", startDate: "2026-12-11", endDate: "2026-12-11", themeColor: "#1E293B", description: "Highlighting the importance of sustainable mountain development—highly relevant in the PNW." },
    { id: 195, title: "National Wreaths Across America Day", type: "single-day", startDate: "2026-12-19", endDate: "2026-12-19", themeColor: "#166534", description: "Coordinating wreath-laying ceremonies at Arlington National Cemetery and local veterans' cemeteries." },
    { id: 196, title: "Festivus", type: "single-day", startDate: "2026-12-23", endDate: "2026-12-23", themeColor: "#94A3B8", description: "A secular holiday popularized by pop culture as an alternative to commercialized Christmas." },
    { id: 197, title: "Boxing Day", type: "single-day", startDate: "2026-12-26", endDate: "2026-12-26", themeColor: "#EAB308", description: "A holiday celebrated the day after Christmas, historically when servants received gifts." },
    { id: 198, title: "Pledge of Allegiance Day", type: "single-day", startDate: "2026-12-28", endDate: "2026-12-28", themeColor: "#1D4ED8", description: "Commemorating the day Congress formally recognized the Pledge of Allegiance." },
    { id: 199, title: "Tick Tock Day", type: "single-day", startDate: "2026-12-29", endDate: "2026-12-29", themeColor: "#EF4444", description: "A reminder to complete unfinished business before the end of the year." },
    { id: 200, title: "No Interruptions Day", type: "single-day", startDate: "2026-12-31", endDate: "2026-12-31", themeColor: "#14B8A6", description: "The last day of the year dedicated to quiet reflection and final preparations." }

];