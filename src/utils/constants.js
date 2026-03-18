export const categoryColors = {
  Education: { bg: "#EAF3DE", text: "#3B6D11", border: "#639922" },
  Health: { bg: "#E1F5EE", text: "#0F6E56", border: "#1D9E75" },
  Environment: { bg: "#E6F1FB", text: "#185FA5", border: "#378ADD" },
  Community: { bg: "#FAEEDA", text: "#854F0B", border: "#BA7517" },
  "Human Rights": { bg: "#FBEAF0", text: "#993556", border: "#D4537E" },
};

export const categories = Object.keys(categoryColors);

export const formatDate = (date) =>
  date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const isUpcoming = (date) => date >= new Date();

export const mapPostToEvent = (post) => {
  const startDate = new Date(2026, 0, 1);
  const eventDate = new Date(startDate);
  eventDate.setDate(startDate.getDate() + post.id * 13);

  const locations = [
    "Mumbai, Maharashtra",
    "Delhi, NCR",
    "Bengaluru, Karnataka",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Hyderabad, Telangana",
    "Pune, Maharashtra",
    "Ahmedabad, Gujarat",
    "Jaipur, Rajasthan",
    "Lucknow, Uttar Pradesh",
  ];

  const eventTitles = [
    "Community Clean-Up Drive",
    "Digital Literacy Workshop",
    "Women Empowerment Summit",
    "Tree Plantation Campaign",
    "Blood Donation Camp",
    "Child Education Rally",
    "Senior Citizen Health Fair",
    "Youth Leadership Bootcamp",
    "Rural Development Forum",
    "Hunger Relief Initiative",
    "Clean Water Access Drive",
    "Disability Inclusion Workshop",
    "Mental Health Awareness Walk",
    "Animal Welfare Campaign",
    "Sustainable Farming Expo",
    "Vocational Skills Training",
    "Disaster Relief Fund Drive",
    "HIV Awareness Seminar",
    "Green Energy Symposium",
    "Street Children Outreach",
  ];

  return {
    id: post.id,
    title: eventTitles[(post.id - 1) % eventTitles.length],
    description:
      post.body.charAt(0).toUpperCase() +
      post.body.slice(1).split("\n")[0].substring(0, 90) +
      "...",
    date: eventDate,
    location: locations[post.id % locations.length],
    category: categories[post.id % categories.length],
    spots: 20 + (post.id % 80),
    organizer: `NGO Partner #${post.userId}`,
  };
};