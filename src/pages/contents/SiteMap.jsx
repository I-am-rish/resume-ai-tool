import React from "react";
import {
  Box,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const sitemapData = [
  // {
  //   title: "Homepage Welcome",
  //   nav: "home-welcome",
  // },
  {
    title: "Home Multiple Section",
    // nav: "home-multiple-section",
    links: [
      {
        title: "Carousel",
        nav: "carousel",
      },
      {
        title: "Champion Ring",
        nav: "champion-ring",
      },
      {
        title: "Our Packages",
        nav: "our-packages",
      },
    ],
  },

  {
    title: "Catalog",
    links: [
      {
        title: "Senior Catalog",
        nav: "senior-catalog",
      },
      {
        title: "Class Ring Catalog",
        nav: "class-ring-catalog",
      },
    ],
  },
  {
    title: "Contact Us",
    nav: "contact-us",
    // links: [
    //   {
    //     title: "Picture of Office Building",
    //     nav: "picture-of-office-building",
    //   },
    //   {
    //     title: "Picture of Staff # 1",
    //     nav: "picture-of-staff-1",
    //   },
    //   {
    //     title: "Picture of Staff # 2",
    //     nav: "picture-of-staff-2",
    //   },
    //   {
    //     title: "Picture of Staff # 3",
    //     nav: "picture-of-staff-3",
    //   },
    // ],
  },
  {
    title: "Online Orders",
    links: [
      {
        title:
          "Terms and Conditions (users must agree to these terms before placing on-line orders)",
        nav: "terms-and-conditions",
      },
      {
        title:
          "Shipping Message (users will see this shipping message during checkout)",
        nav: "shipping-message",
      },
      {
        title:
          "Fee Configuration (Controls Late, Shipping, Handling, Misc. Fees)",
        nav: "fee-configuration",
      },
      {
        title: "Layaway Configuration",
        nav: "layaway-configuration",
      },
    ],
  },
  {
    title: "Online Payments",
    links: [
      {
        title:
          "Terms and Conditions (users must agree to these terms before placing on-line payments)",
        nav: "payment-terms-and-conditions",
      },
      {
        title: "Class Rings",
        nav: "payment-class-rings",
      },
      {
        title: "Graduation Supplies/Cap and Gown",
        nav: "payment-graduation-supplies",
      },
      {
        title: "Letterman Jacket",
        nav: "payment-letterman-jacket",
      },
      {
        title: "Championship Rings",
        nav: "payment-championship-rings",
      },
      {
        title:
          "Fee Configuration (Controls Late, Shipping, Handling, Misc. Fees)",
        nav: "payment-fee-configuration",
      },
    ],
  },
  {
    title: "FAQs",
    links: [
      {
        title: "Rings",
        nav: "rings",
      },
      {
        title: "Cap and Gown",
        nav: "cap-and-gown",
      },
      {
        title: "Graduation Supplies",
        nav: "graduation-supplies",
      },
    ],
  },
  {
    title: "Basic Content Sections",
    links: [
      { title: "Facebook", nav: "facebook" },
      { title: "Twitter", nav: "twitter" },
      { title: "Instagram", nav: "instagram" },
      { title: "LinkedIn", nav: "linkedin" },
      { title: "WhatsApp", nav: "whatsapp" },
      {
        title: "Recognition",
        nav: "recognition",
      },
      {
        title: "Motivational Services",
        nav: "motivational-services",
      },
      {
        title: "Promotional Services",
        nav: "promotional-services",
      },
      {
        title: "Refunds",
        nav: "refunds",
      },
      {
        title: "Legal",
        nav: "legal",
      },
      // {
      //   title: "Notes",
      //   nav: "notes",
      // },
    ],
  },
];

const Sitemap = () => {
  return (
    <Box
      sx={{
        p: 3,
        // border: "1px solid #ccc",
        // borderRadius: 2,
        // backgroundColor: "#ffffff",
        maxWidth: 800,
        // margin: "20px auto",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Sitemap
      </Typography>

      <List disablePadding>
        {sitemapData.map((section, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <ListItem
              sx={{
                pl: 0,
                alignItems: "flex-start",
                display: "list-item",
                listStyleType: "disc",
                listStylePosition: "inside",
              }}
            >
              <Link
                href={section.nav ? section.nav : "#"}
                underline="hover"
                color="primary"
              >
                {section.title}
              </Link>
            </ListItem>

            {section.links && (
              <List
                disablePadding
                sx={{
                  pl: 2,
                  mt: -1,
                }}
              >
                {section.links.map((link, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      py: 0.3,
                      display: "list-item",
                      listStyleType: "circle",
                      listStylePosition: "inside",
                    }}
                  >
                    <Link
                      href={link.nav ? link.nav : "#"}
                      underline="hover"
                      color="primary"
                    >
                      {link.title}
                    </Link>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
      </List>

      {/* Footer links */}
      <Typography variant="body2" sx={{ mt: 3 }}>
        Guest Checkout Disabled –{" "}
        <Link href="#" underline="hover">
          [click to enable]
        </Link>
      </Typography>
      <Typography variant="body2">
        Site Maintenance Mode Disabled –{" "}
        <Link href="#" underline="hover">
          [click to enable]
        </Link>
      </Typography>
    </Box>
  );
};

export default Sitemap;
