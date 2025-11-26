// src/data/siteMetadata.ts
const siteMetadata = {
  title: 'UEMS - University Exam Management System',
  author: 'Kampala International University',
  headerTitle: 'UEMS',
  description:
    'University Exam Management System for managing exam papers, question banks, and approval workflows',
  language: 'en-us',
  theme: 'system',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  siteLogo: '/static/images/kiu-logo.png',
  socialBanner: '/static/images/kiu-seal.png',
  email: 'exams@kiu.ac.ug',
  github: '',
  twitter: '',
  facebook: '',
  youtube: '',
  linkedin: '',
  locale: 'en-US',
};

export default siteMetadata;
