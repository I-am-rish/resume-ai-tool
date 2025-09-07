// import React from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Stack,
// } from "@mui/material";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import DescriptionIcon from "@mui/icons-material/Description";
// import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
// import ArticleIcon from "@mui/icons-material/Article";
// import WorkIcon from "@mui/icons-material/Work";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
// import { motion } from "framer-motion";

// const features = [
//   {
//     title: "Smart Resume Analysis",
//     description:
//       "AI-powered analysis identifies gaps and suggests improvements to make your resume stand out.",
//     tag: "ATS Optimized",
//     icon: DescriptionIcon,
//     color: "#1976d2", // Blue for documents
//   },
//   {
//     title: "AI Interview Practice",
//     description:
//       "Practice with our AI Interviewer for behavioral and technical questions with real-time feedback.",
//     tag: "Voice Enabled",
//     icon: RecordVoiceOverIcon,
//     color: "#4caf50", // Green for communication
//   },
//   {
//     title: "Custom Cover Letters",
//     description:
//       "Generate tailored cover letters in multiple styles - formal, casual, short, or detailed.",
//     tag: "Multiple Styles",
//     icon: ArticleIcon,
//     color: "#ff9800", // Orange for writing
//   },
//   {
//     title: "Job-Specific Optimization",
//     description:
//       "Match your resume perfectly to job descriptions with AI-powered keyword optimization.",
//     tag: "Smart Matching",
//     icon: WorkIcon,
//     color: "#9c27b0", // Purple for work
//   },
//   {
//     title: "Progress Tracking",
//     description:
//       "Monitor your improvement with detailed analytics and personalized career insights.",
//     tag: "Analytics",
//     icon: TrendingUpIcon,
//     color: "#f44336", // Red for growth
//   },
//   {
//     title: "Mock Interviews",
//     description:
//       "Complete 30 or 60-minute timed interviews with comprehensive performance analysis.",
//     tag: "Timed Sessions",
//     icon: QuestionAnswerIcon,
//     color: "#009688", // Teal for Q&A
//   },
// ];

// const fadeInUp = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
// };

// const slideInLeft = {
//   hidden: { opacity: 0, x: -100 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
// };

// const slideInRight = {
//   hidden: { opacity: 0, x: 100 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
// };

// const CareerLanding = () => {
//   const buttonBaseStyles = {
//     textTransform: "none",
//     fontSize: "1rem",
//     fontWeight: 600,
//     px: 4,
//     py: 1.5,
//     borderRadius: 3,
//     transition: "transform 0.3s ease, color 0.3s ease, background 0.3s ease",
//     ":hover": {
//       transform: "scale(1.1)",
//     },
//   };

//   return (
//     <Box>
//       {/* Hero Section */}
//       <motion.div
//         variants={fadeInUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             textAlign: "center",
//             py: { xs: 8, md: 12 },
//             px: 2,
//             backgroundColor: "white",
//           }}
//         >
//           <Typography
//             variant="h2"
//             sx={{ fontWeight: 800, mb: 3, color: "text.primary" }}
//           >
//             Land Your Dream Job with AI
//           </Typography>

//           <Typography
//             variant="h6"
//             sx={{
//               maxWidth: 700,
//               mx: "auto",
//               mb: 5,
//               color: "text.secondary",
//               lineHeight: 1.6,
//             }}
//           >
//             Transform your resume, practice interviews, and get personalized
//             insights with our AI-powered career platform. Join thousands who've
//             accelerated their career success.
//           </Typography>

//           <Stack
//             direction={{ xs: "column", sm: "row" }}
//             spacing={3}
//             justifyContent="center"
//           >
//             <motion.div
//               variants={slideInLeft}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.2 }}
//             >
//               <Button
//                 variant="contained"
//                 size="large"
//                 sx={{
//                   ...buttonBaseStyles,
//                   background: "linear-gradient(90deg, #6a11cb, #2575fc)",
//                   ":hover": {
//                     ...buttonBaseStyles[":hover"],
//                     background: "linear-gradient(90deg, #5b0ec9, #1e63d9)",
//                   },
//                 }}
//               >
//                 Start Free Today
//               </Button>
//             </motion.div>

//             <motion.div
//               variants={slideInRight}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.2 }}
//             >
//               <Button
//                 variant="outlined"
//                 size="large"
//                 startIcon={<PlayArrowIcon />}
//                 sx={{
//                   ...buttonBaseStyles,
//                   border: "2px solid #2575fc",
//                   ":hover": {
//                     ...buttonBaseStyles[":hover"],
//                     color: "#2575fc",
//                   },
//                 }}
//               >
//                 Watch Demo
//               </Button>
//             </motion.div>
//           </Stack>
//         </Box>
//       </motion.div>

//       {/* Features Section */}
//       <Container sx={{ py: { xs: 8, md: 12 } }}>
//         <motion.div
//           variants={fadeInUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             sx={{ fontWeight: 700, mb: 2 }}
//           >
//             Everything You Need to Succeed
//           </Typography>
//           <Typography
//             variant="h6"
//             align="center"
//             sx={{
//               mb: 8,
//               color: "text.secondary",
//               fontWeight: 400,
//               lineHeight: 1.6,
//             }}
//           >
//             Our comprehensive AI platform covers every aspect of your job search
//             journey
//           </Typography>
//         </motion.div>

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "1fr 1fr",
//               md: "1fr 1fr 1fr",
//             },
//             gap: 4,
//             justifyContent: "center",
//           }}
//         >
//           {features.map((feature, index) => {
//             const IconComponent = feature.icon;
//             return (
//               <motion.div
//                 key={index}
//                 variants={fadeInUp}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.2 }}
//               >
//                 <Card
//                   sx={{
//                     p: 3,
//                     borderRadius: 4,
//                     boxShadow: 4,
//                     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     ":hover": {
//                       transform: "translateY(-10px)",
//                       boxShadow: 8,
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ textAlign: "center" }}>
//                     <Box
//                       sx={{
//                         mb: 3,
//                         display: "inline-flex",
//                         transition: "transform 0.3s ease",
//                         "&:hover": {
//                           transform: "scale(1.2)",
//                         },
//                       }}
//                     >
//                       <IconComponent
//                         sx={{ fontSize: 48, color: feature.color }}
//                       />
//                     </Box>
//                     <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
//                       {feature.title}
//                     </Typography>
//                     <Typography
//                       variant="body1"
//                       sx={{ mb: 3, color: "text.secondary", lineHeight: 1.6 }}
//                     >
//                       {feature.description}
//                     </Typography>
//                     <Typography
//                       variant="subtitle2"
//                       sx={{ color: "primary.main", fontWeight: 700 }}
//                     >
//                       {feature.tag}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </Box>
//       </Container>

//       {/* CTA Section */}
//       <motion.div
//         variants={fadeInUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <Box
//           sx={{
//             textAlign: "center",
//             py: { xs: 8, md: 12 },
//             backgroundColor: "white",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 700,
//               mb: 3,
//             }}
//           >
//             Ready to Accelerate Your Career?
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               maxWidth: 700,
//               mx: "auto",
//               mb: 5,
//               color: "text.secondary",
//               lineHeight: 1.6,
//             }}
//           >
//             Join thousands of professionals who've transformed their job search
//             with AI
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             sx={{
//               ...buttonBaseStyles,
//               background: "linear-gradient(90deg, #6a11cb, #2575fc)",
//               ":hover": {
//                 ...buttonBaseStyles[":hover"],
//                 background: "linear-gradient(90deg, #5b0ec9, #1e63d9)",
//               },
//             }}
//           >
//             Start Your Success Story
//           </Button>
//         </Box>
//       </motion.div>
//     </Box>
//   );
// };

// export default CareerLanding;



//dark one

// import React from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Stack,
//   useTheme,
//   alpha,
// } from "@mui/material";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import DescriptionIcon from "@mui/icons-material/Description";
// import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
// import ArticleIcon from "@mui/icons-material/Article";
// import WorkIcon from "@mui/icons-material/Work";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
// import { motion } from "framer-motion";

// // Enhanced features with more meaningful colors
// const features = [
//   {
//     title: "Smart Resume Analysis",
//     description:
//       "AI-powered analysis identifies gaps and suggests improvements to make your resume stand out.",
//     tag: "ATS Optimized",
//     icon: DescriptionIcon,
//     color: "#4F46E5", // Deep indigo for intelligence
//     gradient: "linear-gradient(135deg, #4F46E5, #818CF8)",
//   },
//   {
//     title: "AI Interview Practice",
//     description:
//       "Practice with our AI Interviewer for behavioral and technical questions with real-time feedback.",
//     tag: "Voice Enabled",
//     icon: RecordVoiceOverIcon,
//     color: "#10B981", // Emerald green for growth
//     gradient: "linear-gradient(135deg, #10B981, #34D399)",
//   },
//   {
//     title: "Custom Cover Letters",
//     description:
//       "Generate tailored cover letters in multiple styles - formal, casual, short, or detailed.",
//     tag: "Multiple Styles",
//     icon: ArticleIcon,
//     color: "#F59E0B", // Amber for creativity
//     gradient: "linear-gradient(135deg, #F59E0B, #FCD34D)",
//   },
//   {
//     title: "Job-Specific Optimization",
//     description:
//       "Match your resume perfectly to job descriptions with AI-powered keyword optimization.",
//     tag: "Smart Matching",
//     icon: WorkIcon,
//     color: "#8B5CF6", // Purple for precision
//     gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
//   },
//   {
//     title: "Progress Tracking",
//     description:
//       "Monitor your improvement with detailed analytics and personalized career insights.",
//     tag: "Analytics",
//     icon: TrendingUpIcon,
//     color: "#EC4899", // Pink for insights
//     gradient: "linear-gradient(135deg, #EC4899, #F472B6)",
//   },
//   {
//     title: "Mock Interviews",
//     description:
//       "Complete 30 or 60-minute timed interviews with comprehensive performance analysis.",
//     tag: "Timed Sessions",
//     icon: QuestionAnswerIcon,
//     color: "#3B82F6", // Blue for communication
//     gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)",
//   },
// ];

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
// };

// const slideInLeft = {
//   hidden: { opacity: 0, x: -100 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
// };

// const slideInRight = {
//   hidden: { opacity: 0, x: 100 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
// };

// const floatAnimation = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 1.5,
//       repeat: Infinity,
//       repeatType: "reverse",
//       ease: "easeInOut",
//     },
//   },
// };

// const pulseAnimation = {
//   hidden: { scale: 1 },
//   visible: {
//     scale: [1, 1.05, 1],
//     transition: {
//       duration: 3,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// };

// // Particle Background Component
// const ParticleBackground = () => {
//   const particles = Array.from({ length: 20 }, (_, i) => i);

//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         overflow: "hidden",
//         zIndex: -1,
//       }}
//     >
//       {particles.map((i) => (
//         <motion.div
//           key={i}
//           style={{
//             position: "absolute",
//             width: Math.random() * 10 + 5,
//             height: Math.random() * 10 + 5,
//             borderRadius: "50%",
//             background: `rgba(${Math.floor(
//               Math.random() * 100 + 155
//             )}, ${Math.floor(Math.random() * 100 + 155)}, 255, 0.1)`,
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//           }}
//           animate={{
//             y: [0, Math.random() * 100 - 50],
//             x: [0, Math.random() * 100 - 50],
//           }}
//           transition={{
//             duration: Math.random() * 10 + 10,
//             repeat: Infinity,
//             repeatType: "reverse",
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </Box>
//   );
// };

// // Gradient Background Component
// const GradientBackground = ({ children }) => {
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         overflow: "hidden",
//         background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
//       }}
//     >
//       {/* Animated gradient orbs */}
//       <motion.div
//         style={{
//           position: "absolute",
//           width: "500px",
//           height: "500px",
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, rgba(79, 70, 229, 0) 70%)",
//           top: "-250px",
//           left: "-100px",
//           zIndex: 0,
//         }}
//         animate={{
//           scale: [1, 1.2, 1],
//           x: [0, 50, 0],
//         }}
//         transition={{
//           duration: 15,
//           repeat: Infinity,
//           repeatType: "reverse",
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         style={{
//           position: "absolute",
//           width: "400px",
//           height: "400px",
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%)",
//           bottom: "-200px",
//           right: "-100px",
//           zIndex: 0,
//         }}
//         animate={{
//           scale: [1, 1.3, 1],
//           y: [0, -30, 0],
//         }}
//         transition={{
//           duration: 18,
//           repeat: Infinity,
//           repeatType: "reverse",
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         style={{
//           position: "absolute",
//           width: "300px",
//           height: "300px",
//           borderRadius: "50%",
//           background:
//             "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0) 70%)",
//           top: "50%",
//           left: "70%",
//           zIndex: 0,
//         }}
//         animate={{
//           scale: [1, 1.1, 1],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           repeatType: "reverse",
//           ease: "easeInOut",
//         }}
//       />
//       <ParticleBackground />
//       {children}
//     </Box>
//   );
// };

// const CareerLanding = () => {
//   const theme = useTheme();

//   const buttonBaseStyles = {
//     textTransform: "none",
//     fontSize: "1rem",
//     fontWeight: 600,
//     px: 4,
//     py: 1.5,
//     borderRadius: 3,
//     transition: "transform 0.3s ease, color 0.3s ease, background 0.3s ease",
//     ":hover": {
//       transform: "scale(1.05)",
//     },
//   };

//   return (
//     <GradientBackground>
//       {/* Hero Section */}
//       <motion.div
//         variants={fadeInUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             textAlign: "center",
//             py: { xs: 8, md: 12 },
//             px: 2,
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           <motion.div
//             variants={pulseAnimation}
//             initial="hidden"
//             whileInView="visible"
//           >
//             <Typography
//               variant="h2"
//               sx={{
//                 fontWeight: 800,
//                 mb: 3,
//                 background: "linear-gradient(90deg, #FFFFFF, #E2E8F0)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 textShadow: "0 0 30px rgba(79, 70, 229, 0.5)",
//               }}
//             >
//               Land Your Dream Job with AI
//             </Typography>
//           </motion.div>
//           <Typography
//             variant="h6"
//             sx={{
//               maxWidth: 700,
//               mx: "auto",
//               mb: 5,
//               color: "#CBD5E1",
//               lineHeight: 1.6,
//             }}
//           >
//             Transform your resume, practice interviews, and get personalized
//             insights with our AI-powered career platform. Join thousands who've
//             accelerated their career success.
//           </Typography>
//           <Stack
//             direction={{ xs: "column", sm: "row" }}
//             spacing={3}
//             justifyContent="center"
//           >
//             <motion.div
//               variants={slideInLeft}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.2 }}
//             >
//               <Button
//                 variant="contained"
//                 size="large"
//                 sx={{
//                   ...buttonBaseStyles,
//                   background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
//                   boxShadow: "0 4px 15px rgba(79, 70, 229, 0.4)",
//                   ":hover": {
//                     ...buttonBaseStyles[":hover"],
//                     background: "linear-gradient(90deg, #6366F1, #A78BFA)",
//                     boxShadow: "0 6px 20px rgba(79, 70, 229, 0.6)",
//                   },
//                 }}
//               >
//                 Start Free Today
//               </Button>
//             </motion.div>
//             <motion.div
//               variants={slideInRight}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.2 }}
//             >
//               <Button
//                 variant="outlined"
//                 size="large"
//                 startIcon={<PlayArrowIcon />}
//                 sx={{
//                   ...buttonBaseStyles,
//                   border: "2px solid #8B5CF6",
//                   color: "#E2E8F0",
//                   ":hover": {
//                     ...buttonBaseStyles[":hover"],
//                     borderColor: "#A78BFA",
//                     color: "#FFFFFF",
//                   },
//                 }}
//               >
//                 Watch Demo
//               </Button>
//             </motion.div>
//           </Stack>
//         </Box>
//       </motion.div>

//       {/* Features Section */}
//       <Container
//         sx={{ py: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}
//       >
//         <motion.div
//           variants={fadeInUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             sx={{
//               fontWeight: 700,
//               mb: 2,
//               color: "#FFFFFF",
//               textShadow: "0 0 20px rgba(79, 70, 229, 0.5)",
//             }}
//           >
//             Everything You Need to Succeed
//           </Typography>
//           <Typography
//             variant="h6"
//             align="center"
//             sx={{
//               mb: 8,
//               color: "#CBD5E1",
//               fontWeight: 400,
//               lineHeight: 1.6,
//             }}
//           >
//             Our comprehensive AI platform covers every aspect of your job search
//             journey
//           </Typography>
//         </motion.div>
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "1fr 1fr",
//               md: "1fr 1fr 1fr",
//             },
//             gap: 4,
//             justifyContent: "center",
//           }}
//         >
//           {features.map((feature, index) => {
//             const IconComponent = feature.icon;
//             return (
//               <motion.div
//                 key={index}
//                 variants={floatAnimation}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.2 }}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <Card
//                   sx={{
//                     p: 3,
//                     borderRadius: 4,
//                     boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
//                     background: "rgba(30, 41, 59, 0.7)",
//                     backdropFilter: "blur(10px)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     ":hover": {
//                       transform: "translateY(-10px)",
//                       boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ textAlign: "center" }}>
//                     <Box
//                       sx={{
//                         mb: 3,
//                         display: "inline-flex",
//                         p: 2,
//                         borderRadius: "50%",
//                         background: feature.gradient,
//                         transition: "transform 0.3s ease",
//                         "&:hover": {
//                           transform: "scale(1.1)",
//                         },
//                       }}
//                     >
//                       <IconComponent
//                         sx={{
//                           fontSize: 48,
//                           color: "#FFFFFF",
//                           filter:
//                             "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
//                         }}
//                       />
//                     </Box>
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         fontWeight: 700,
//                         mb: 2,
//                         color: "#FFFFFF",
//                       }}
//                     >
//                       {feature.title}
//                     </Typography>
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         mb: 3,
//                         color: "#CBD5E1",
//                         lineHeight: 1.6,
//                       }}
//                     >
//                       {feature.description}
//                     </Typography>
//                     <Typography
//                       variant="subtitle2"
//                       sx={{
//                         color: feature.color,
//                         fontWeight: 700,
//                         display: "inline-block",
//                         px: 2,
//                         py: 1,
//                         borderRadius: 20,
//                         background: alpha(feature.color, 0.2),
//                       }}
//                     >
//                       {feature.tag}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </Box>
//       </Container>

//       {/* CTA Section */}
//       <motion.div
//         variants={fadeInUp}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <Box
//           sx={{
//             textAlign: "center",
//             py: { xs: 8, md: 12 },
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           <motion.div
//             variants={pulseAnimation}
//             initial="hidden"
//             whileInView="visible"
//           >
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 700,
//                 mb: 3,
//                 color: "#FFFFFF",
//                 textShadow: "0 0 20px rgba(79, 70, 229, 0.5)",
//               }}
//             >
//               Ready to Accelerate Your Career?
//             </Typography>
//           </motion.div>
//           <Typography
//             variant="h6"
//             sx={{
//               maxWidth: 700,
//               mx: "auto",
//               mb: 5,
//               color: "#CBD5E1",
//               lineHeight: 1.6,
//             }}
//           >
//             Join thousands of professionals who've transformed their job search
//             with AI
//           </Typography>
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button
//               variant="contained"
//               size="large"
//               sx={{
//                 ...buttonBaseStyles,
//                 background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
//                 boxShadow: "0 4px 15px rgba(79, 70, 229, 0.4)",
//                 ":hover": {
//                   ...buttonBaseStyles[":hover"],
//                   background: "linear-gradient(90deg, #6366F1, #A78BFA)",
//                   boxShadow: "0 6px 20px rgba(79, 70, 229, 0.6)",
//                 },
//               }}
//             >
//               Start Your Success Story
//             </Button>
//           </motion.div>
//         </Box>
//       </motion.div>
//     </GradientBackground>
//   );
// };

// export default CareerLanding;



//white one
import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DescriptionIcon from "@mui/icons-material/Description";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ArticleIcon from "@mui/icons-material/Article";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { motion } from "framer-motion";

// Enhanced features with more meaningful colors
const features = [
  {
    title: "Smart Resume Analysis",
    description:
      "AI-powered analysis identifies gaps and suggests improvements to make your resume stand out.",
    tag: "ATS Optimized",
    icon: DescriptionIcon,
    color: "#4F46E5", // Deep indigo for intelligence
    gradient: "linear-gradient(135deg, #4F46E5, #818CF8)",
  },
  {
    title: "AI Interview Practice",
    description:
      "Practice with our AI Interviewer for behavioral and technical questions with real-time feedback.",
    tag: "Voice Enabled",
    icon: RecordVoiceOverIcon,
    color: "#10B981", // Emerald green for growth
    gradient: "linear-gradient(135deg, #10B981, #34D399)",
  },
  {
    title: "Custom Cover Letters",
    description:
      "Generate tailored cover letters in multiple styles - formal, casual, short, or detailed.",
    tag: "Multiple Styles",
    icon: ArticleIcon,
    color: "#F59E0B", // Amber for creativity
    gradient: "linear-gradient(135deg, #F59E0B, #FCD34D)",
  },
  {
    title: "Job-Specific Optimization",
    description:
      "Match your resume perfectly to job descriptions with AI-powered keyword optimization.",
    tag: "Smart Matching",
    icon: WorkIcon,
    color: "#8B5CF6", // Purple for precision
    gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your improvement with detailed analytics and personalized career insights.",
    tag: "Analytics",
    icon: TrendingUpIcon,
    color: "#EC4899", // Pink for insights
    gradient: "linear-gradient(135deg, #EC4899, #F472B6)",
  },
  {
    title: "Mock Interviews",
    description:
      "Complete 30 or 60-minute timed interviews with comprehensive performance analysis.",
    tag: "Timed Sessions",
    icon: QuestionAnswerIcon,
    color: "#3B82F6", // Blue for communication
    gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const floatAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const pulseAnimation = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

// Particle Background Component
const ParticleBackground = () => {
  const particles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {particles.map((i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            borderRadius: "50%",
            background: `rgba(${Math.floor(
              Math.random() * 100 + 155
            )}, ${Math.floor(Math.random() * 100 + 155)}, 255, 0.15)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 80 - 40],
            x: [0, Math.random() * 80 - 40],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </Box>
  );
};

// Light Background Component
const LightBackground = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Subtle gradient accents */}
      <motion.div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79, 70, 229, 0.05) 0%, rgba(79, 70, 229, 0) 70%)",
          top: "-300px",
          left: "-200px",
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0) 70%)",
          bottom: "-250px",
          right: "-200px",
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, rgba(236, 72, 153, 0) 70%)",
          top: "40%",
          left: "60%",
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <ParticleBackground />
      {children}
    </Box>
  );
};

const CareerLanding = () => {
  const theme = useTheme();

  const buttonBaseStyles = {
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: 600,
    px: 4,
    py: 1.5,
    borderRadius: 3,
    transition: "transform 0.3s ease, color 0.3s ease, background 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
    },
  };

  return (
    <LightBackground>
      {/* Hero Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            py: { xs: 4, md: 8 },
            px: 2,
            position: "relative",
            zIndex: 1,
            // background: "linear-gradient(90deg, #81a9f3, #f798f7)",
          }}
        >
          <motion.div
            variants={pulseAnimation}
            initial="hidden"
            whileInView="visible"
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Land Your Dream Job with AI
            </Typography>
          </motion.div>
          <Typography
            variant="h6"
            sx={{
              maxWidth: 700,
              mx: "auto",
              mb: 5,
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
            }}
          >
            Transform your resume, practice interviews, and get personalized
            insights with our AI-powered career platform. Join thousands who've
            accelerated their career success.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
          >
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  ...buttonBaseStyles,
                  background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
                  boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)",
                  ":hover": {
                    ...buttonBaseStyles[":hover"],
                    background: "linear-gradient(90deg, #6366F1, #A78BFA)",
                    boxShadow: "0 6px 20px rgba(79, 70, 229, 0.4)",
                  },
                }}
              >
                Start Free Today
              </Button>
            </motion.div>
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayArrowIcon />}
                sx={{
                  ...buttonBaseStyles,
                  border: "2px solid #8B5CF6",
                  color: "#4F46E5",
                  ":hover": {
                    ...buttonBaseStyles[":hover"],
                    borderColor: "#6366F1",
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                Watch Demo
              </Button>
            </motion.div>
          </Stack>
        </Box>
      </motion.div>

      {/* Features Section */}
      <Container
        sx={{ py: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: theme.palette.text.primary,
            }}
          >
            Everything You Need to Succeed
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: 8,
              color: theme.palette.text.secondary,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Our comprehensive AI platform covers every aspect of your job search
            journey
          </Typography>
        </motion.div>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 4,
            justifyContent: "center",
          }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={floatAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    ":hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        mb: 3,
                        display: "inline-flex",
                        p: 2,
                        borderRadius: "50%",
                        background: feature.gradient,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 48,
                          color: "#FFFFFF",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: feature.color,
                        fontWeight: 700,
                        display: "inline-block",
                        px: 2,
                        py: 1,
                        borderRadius: 20,
                        background: alpha(feature.color, 0.1),
                      }}
                    >
                      {feature.tag}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>
      </Container>

      {/* CTA Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 8, md: 12 },
            position: "relative",
            zIndex: 1,
            backgroundColor: alpha(theme.palette.primary.main, 0.03),
            borderTop: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <motion.div
            variants={pulseAnimation}
            initial="hidden"
            whileInView="visible"
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: theme.palette.text.primary,
              }}
            >
              Ready to Accelerate Your Career?
            </Typography>
          </motion.div>
          <Typography
            variant="h6"
            sx={{
              maxWidth: 700,
              mx: "auto",
              mb: 5,
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
            }}
          >
            Join thousands of professionals who've transformed their job search
            with AI
          </Typography>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                ...buttonBaseStyles,
                background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
                boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)",
                ":hover": {
                  ...buttonBaseStyles[":hover"],
                  background: "linear-gradient(90deg, #6366F1, #A78BFA)",
                  boxShadow: "0 6px 20px rgba(79, 70, 229, 0.4)",
                },
              }}
            >
              Start Your Success Story
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </LightBackground>
  );
};

export default CareerLanding;
