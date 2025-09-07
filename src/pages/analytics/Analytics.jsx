import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Tab,
  Tabs,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import {
  ArrowLeft,
  TrackChanges,
  CheckCircle,
  TrendingUp,
  AccessTime,
  Description,
  MenuBook,
  QuestionAnswer,
  Videocam,
  ArrowBack,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Mock data for analytics (unchanged)
const mockData = {
  resume: {
    totalSessions: 15,
    avgSessionTime: "12 min",
    completionRate: 85,
    lastActivity: "2 days ago",
  },
  coverLetter: {
    totalSessions: 8,
    avgSessionTime: "8 min",
    completionRate: 92,
    lastActivity: "1 day ago",
  },
  qa: {
    totalSessions: 22,
    avgSessionTime: "15 min",
    completionRate: 78,
    lastActivity: "Today",
  },
  interview: {
    totalSessions: 5,
    avgSessionTime: "25 min",
    completionRate: 100,
    lastActivity: "3 days ago",
  },
};

const weeklyActivity = [
  { day: "Mon", resume: 2, coverLetter: 1, qa: 3, interview: 1 },
  { day: "Tue", resume: 3, coverLetter: 2, qa: 4, interview: 0 },
  { day: "Wed", resume: 1, coverLetter: 1, qa: 2, interview: 2 },
  { day: "Thu", resume: 4, coverLetter: 0, qa: 5, interview: 1 },
  { day: "Fri", resume: 2, coverLetter: 3, qa: 3, interview: 1 },
  { day: "Sat", resume: 1, coverLetter: 1, qa: 1, interview: 0 },
  { day: "Sun", resume: 2, coverLetter: 0, qa: 2, interview: 0 },
];

const performanceData = [
  { name: "Resume", value: 85, color: "#4F46E5" },
  { name: "Cover Letter", value: 92, color: "#8B5CF6" },
  { name: "Q&A", value: 78, color: "#EC4899" },
  { name: "Interview", value: 100, color: "#10B981" },
];

// Animated counter component
const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [value, duration]);

  return <>{count}</>;
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: <span className="font-medium">{entry.value}</span>
          </p>
        ))}
      </motion.div>
    );
  }
  return null;
};

export default function Analytics() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const getFilteredData = () => {
    if (activeFilter === "all") return mockData;
    return { [activeFilter]: mockData[activeFilter] };
  };

  const getTotalSessions = () => {
    const data = getFilteredData();
    return Object.values(data).reduce(
      (sum, item) => sum + item.totalSessions,
      0
    );
  };

  const getAvgCompletionRate = () => {
    const data = getFilteredData();
    const rates = Object.values(data).map((item) => item.completionRate);
    return Math.round(
      rates.reduce((sum, rate) => sum + rate, 0) / rates.length
    );
  };

  const renderIcon = (key) => {
    switch (key) {
      case "resume":
        return <Description />;
      case "coverLetter":
        return <MenuBook />;
      case "qa":
        return <QuestionAnswer />;
      case "interview":
        return <Videocam />;
      default:
        return null;
    }
  };

  // Card variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Box
      sx={{
        flex: 1,
        p: { xs: 2, md: 4 },
        bgcolor: "background.default",
        backgroundImage: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.05
        )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/dashboard")}
            variant="outlined"
            sx={{
              mb: 2,
              borderRadius: 2,
              px: 3,
              py: 1,
              backdropFilter: "blur(10px)",
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            Back to Dashboard
          </Button>
          <Box>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Analytics 
            </Typography>
            <Typography color="text.secondary" variant="h6">
              Track your job search progress and success metrics
            </Typography>
          </Box>
        </Box>
      </motion.div>

      {/* Tabs Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs
          value={activeFilter}
          onChange={(e, newValue) => setActiveFilter(newValue)}
          variant="fullWidth"
          sx={{ mb: 4 }}
        >
          <Tab label="All Activities" value="all" />
          <Tab label="Resume" value="resume" />
          <Tab label="Cover Letter" value="coverLetter" />
          <Tab label="Q&A" value="qa" />
          <Tab label="Interview" value="interview" />
        </Tabs>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            {
              title: "Total Sessions",
              value: getTotalSessions(),
              icon: <TrackChanges />,
              change: "+12%",
              color: theme.palette.primary.main,
            },
            {
              title: "Avg Completion Rate",
              value: `${getAvgCompletionRate()}%`,
              icon: <CheckCircle />,
              change: "+5%",
              color: theme.palette.secondary.main,
            },
            {
              title: "Study Streak",
              value: "7 days",
              icon: <TrendingUp />,
              change: "Keep it up!",
              color: theme.palette.success.main,
            },
            {
              title: "Total Study Time",
              value: "8.5 hrs",
              icon: <AccessTime />,
              change: "This week",
              color: theme.palette.warning.main,
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div variants={cardVariants} whileHover="hover">
                <Card
                  sx={{
                    height: "100%",
                    width: "350px",
                    borderRadius: 3,
                    backdropFilter: "blur(10px)",
                    backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    overflow: "hidden",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "4px",
                      background: item.color,
                    },
                  }}
                >
                  <CardHeader
                    title={
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="subtitle2" color="text.secondary">
                          {item.title}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            backgroundColor: alpha(item.color, 0.1),
                            color: item.color,
                          }}
                        >
                          {item.icon}
                        </Box>
                      </Box>
                    }
                    sx={{ pb: 1 }}
                  />
                  <CardContent>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      sx={{
                        mb: 1,
                        background: `linear-gradient(90deg, ${
                          item.color
                        }, ${alpha(item.color, 0.7)})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {typeof item.value === "string" ? (
                        item.value
                      ) : (
                        <AnimatedCounter value={item.value} />
                      )}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Box
                        component="span"
                        sx={{
                          mr: 0.5,
                          color: theme.palette.success.main,
                          fontWeight: "bold",
                        }}
                      >
                        {item.change}
                      </Box>
                      from last week
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Activity Breakdown - Full Width */}
      {activeFilter === "all" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Box
            sx={{
              position: "relative",
              mb: 4,
              // px: { xs: 2, md: 4 },
              py: 2,
              // bgcolor: alpha(theme.palette.background.paper, 0.3),
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                // backgroundColor: "red",
                // justifyContent: "space-evenly",

                gap: 2,
                flexDirection: { xs: "column", md: "row" }, // column on small, row on md+
              }}
            >
              {/* Weekly Activity Card */}
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}
             
              >
                <Card
                  sx={{
                    flex: 1,
                    minWidth: { xs: "100%", md: "40vw", lg: "37vw" }, // full width on xs, half on md+
                    borderRadius: 3,
                    backdropFilter: "blur(10px)",
                    backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="h6" fontWeight="bold">
                        Weekly Activity
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Box sx={{ height: 350 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={weeklyActivity}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <XAxis
                            dataKey="day"
                            stroke={theme.palette.text.secondary}
                          />
                          <YAxis stroke={theme.palette.text.secondary} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar
                            dataKey="resume"
                            fill="#4F46E5"
                            name="Resume"
                            radius={[4, 4, 0, 0]}
                            animationBegin={100}
                            animationDuration={1500}
                          />
                          <Bar
                            dataKey="coverLetter"
                            fill="#8B5CF6"
                            name="Cover Letter"
                            radius={[4, 4, 0, 0]}
                            animationBegin={300}
                            animationDuration={1500}
                          />
                          <Bar
                            dataKey="qa"
                            fill="#EC4899"
                            name="Q&A"
                            radius={[4, 4, 0, 0]}
                            animationBegin={500}
                            animationDuration={1500}
                          />
                          <Bar
                            dataKey="interview"
                            fill="#10B981"
                            name="Interview"
                            radius={[4, 4, 0, 0]}
                            animationBegin={700}
                            animationDuration={1500}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Performance by Category Card */}
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card
                  sx={{
                    flex: 1,
                    minWidth: { xs: "100%", md: "40vw", lg: "37vw" }, // full width on xs, half on md+
                    borderRadius: 3,
                    backdropFilter: "blur(10px)",
                    backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="h6" fontWeight="bold">
                        Performance by Category
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Box sx={{ height: 350 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={performanceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                            labelLine={false}
                            animationBegin={100}
                            animationDuration={1500}
                          >
                            {performanceData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke={theme.palette.background.paper}
                                strokeWidth={2}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      )}

      {/* Individual Activity Details */}
      {/* {activeFilter !== "all" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {Object.entries(getFilteredData()).map(([key, data]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <motion.div variants={cardVariants} whileHover="hover">
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      backdropFilter: "blur(10px)",
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.7
                      ),
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      overflow: "hidden",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "4px",
                        background:
                          performanceData.find(
                            (d) => d.name.toLowerCase() === key
                          )?.color || theme.palette.primary.main,
                      },
                    }}
                  >
                    <CardHeader
                      title={
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="subtitle2" fontWeight="bold">
                            {key === "coverLetter" ? "Cover Letter" : key}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              backgroundColor: alpha(
                                performanceData.find(
                                  (d) => d.name.toLowerCase() === key
                                )?.color || theme.palette.primary.main,
                                0.1
                              ),
                              color:
                                performanceData.find(
                                  (d) => d.name.toLowerCase() === key
                                )?.color || theme.palette.primary.main,
                            }}
                          >
                            {renderIcon(key)}
                          </Box>
                        </Box>
                      }
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1.5,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Sessions:
                        </Typography>
                        <Typography fontWeight="bold">
                          {data.totalSessions}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1.5,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Avg Time:
                        </Typography>
                        <Typography fontWeight="bold">
                          {data.avgSessionTime}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1.5,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Completion:
                        </Typography>
                        <Typography fontWeight="bold">
                          {data.completionRate}%
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Last Activity:
                        </Typography>
                        <Typography fontWeight="bold">
                          {data.lastActivity}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )} */}

      {/* Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card
          sx={{
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            backgroundColor: alpha(theme.palette.background.paper, 0.7),
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <CardHeader
            title={
              <Typography variant="h5" fontWeight="bold">
                💡 Insights & Recommendations
              </Typography>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              {[
                {
                  title: "🎯 Strong Performance",
                  content:
                    "Your interview completion rate is 100%! You're consistently finishing practice sessions, which shows great dedication.",
                  color: theme.palette.primary.main,
                },
                {
                  title: "📈 Growth Opportunity",
                  content:
                    "Consider spending more time on Q&A practice. Your completion rate here has room for improvement.",
                  color: theme.palette.secondary.main,
                },
                {
                  title: "🔥 Consistency",
                  content:
                    "You've maintained a 7-day study streak! Try to keep this momentum going for maximum improvement.",
                  color: theme.palette.success.main,
                },
                {
                  title: "⭐ Recommendation",
                  content:
                    "Your cover letter skills are excellent (92% completion). Consider helping others or focusing on areas that need work.",
                  color: theme.palette.warning.main,
                },
              ].map((insight, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        bgcolor: alpha(insight.color, 0.05),
                        border: `1px solid ${alpha(insight.color, 0.2)}`,
                        height: "100%",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: alpha(insight.color, 0.08),
                          boxShadow: `0 8px 20px ${alpha(insight.color, 0.15)}`,
                        },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                          mb: 1.5,
                          color: insight.color,
                        }}
                      >
                        {insight.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {insight.content}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
