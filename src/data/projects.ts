export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  demoLink: string;
  detailsLink: string;
  features: string[];
  slug: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Food Recommendation Chatbot",
    description:
      "A chatbot powered by Retrieval-Augmented Generation (RAG) that recommends food places based on user queries and real-time context such as meal time. Built with LangChain, AWS Bedrock, and Qdrant for vector search, this system provides personalized food recommendations enriched with restaurant cards including menu highlights, price range, and links.",
    image: "/img/food-recommendation-chatbot.png",
    category: "AI/ML, Chatbot",
    technologies: ["Python", "LangChain", "AWS Bedrock", "Qdrant", "Next.js"],
    demoLink: "https://food-recomendation-chatbot.vercel.app",
    detailsLink: "https://github.com/Fauza27/Food-Recommendation-Chatbot",
    features: [
      "Food recommendations powered by RAG",
      "Context-aware suggestions (meal time based)",
      "Interactive chatbot interface built with Next.js",
      "Restaurant cards with menu, price range, and links",
      "Fallback answers when data is limited",
    ],
    slug: "food-recommendation-chatbot",
  },
  {
    id: 2,
    title: "Customer Churn Project",
    description: "This program is designed to predict the likelihood of customers unsubscribing using Machine Learning algorithms. This model helps businesses take preventive actions to improve customer retention.",
    image: "/img/customer-churn.png",
    category: "AI/ML",
    technologies: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
    demoLink: "https://customer-churn-project-fauza.streamlit.app/",
    detailsLink: "https://github.com/Fauza27/Customer-Churn-Project",
    features: ["Machine Learning prediction models", "Interactive Streamlit dashboard", "Data visualization and analysis", "Preventive customer retention strategies"],
    slug: "customer-churn-project",
  },
  {
    id: 3,
    title: "Sales Forecasting Project",
    description: "This project aims to predict future sales figures using time series models and machine learning. It helps businesses in stock planning and marketing strategies more accurately.",
    image: "/img/sales-forecasting.png",
    category: "AI/ML",
    technologies: ["Python", "Pandas", "Prophet", "Scikit-learn", "Streamlit"],
    demoLink: "https://sales-forecasting-fauza.streamlit.app/",
    detailsLink: "https://github.com/Fauza27/sales-forecasting-project",
    features: ["Time series forecasting models", "Prophet algorithm implementation", "Interactive forecasting dashboard", "Business intelligence insights"],
    slug: "sales-forecasting-project",
  },
];
