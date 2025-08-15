import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root";
import LayoutApplications from "../layout/layoutApplications";
import LoginCover from "../pages/login-cover";

import LayoutSetting from "../layout/layoutSetting";

// import Home from "../pages/home/Home";

//My Account
import MyAccount from "../pages/my-account/MyAccount";

import LayoutAuth from "../layout/layoutAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import Unauthorized from "../pages/Unauthorized";

//Users
import UserList from "../pages/users/Users";
import EditUser from "../pages/users/EditUser";
import AddUser from "../pages/users/AddUser";

//students
import StudentList from "../pages/students/StudentsList";
import AddStudent from "../pages/students/AddStudent";
// import EditStudent from "../pages/students/EditStudent";
import Index from "../pages/students/Index";

//schools
import SchoolsList from "../pages/schools/SchoolsList";
import AddSchool from "../pages/schools/AddSchool";
import EditSchool from "../pages/schools/EditSchool";

/**
 * website contents
 */
import SiteMap from "../pages/contents/SiteMap";
import HomeWelcome from "../pages/contents/home_welcome/HomeWelcome";
//home multiple section
import HomeMultipleSection from "../pages/contents/home_multiple_section/HomeMultipleSection";
//facebook
import Facebook from "../pages/contents/facebook/FaceBook";
//twitter
import Twitter from "../pages/contents/twitter/Twitter";
//catalog
import SeniorCatalog from "../pages/contents/catalog/SeniorCatalog";
import ClassRingCatalog from "../pages/contents/catalog/ClassRingCatalog";
//custom photography
import CustomPhotographyPage from "../pages/contents/custom_photography/CustomPhotography";
//contact us
import PictureOfOfficeBuilding from "../pages/contents/contact_us/PictureOfOfficeBuilding";
import PictureOfStaff1 from "../pages/contents/contact_us/PictureOfStaff1";
import PictureOfStaff2 from "../pages/contents/contact_us/PictureOfStaff2";
import PictureOfStaff3 from "../pages/contents/contact_us/PictureOfStaff3";
//online orders
import TermsAndConditions from "../pages/contents/online_orders/TermsAndConditions";
import ShippingMessage from "../pages/contents/online_orders/ShippingMessage";
import FeeConfiguration from "../pages/contents/online_orders/FeeConfiguration";
import LayawayConfiguration from "../pages/contents/online_orders/LayawayConfiguration";

//online payments
import PaymentTermsAndConditions from "../pages/contents/online_payments/TermsAndConditions";
import PaymentClassRings from "../pages/contents/online_payments/ClassRings";
import PaymentGraduationSupplies from "../pages/contents/online_payments/Graduation_supplies";
import PaymentLettermanJacket from "../pages/contents/online_payments/Letterman_jacket";
import PaymentChampionshipRings from "../pages/contents/online_payments/ChampionshipRings";
import PyemntFeeConfiguration from "../pages/contents/online_payments/FeeConfiguration";

//faqs
import Rings from "../pages/contents/faqs/Rings";
import CapAndDown from "../pages/contents/faqs/CapAndDown";
import GraduationSupplies from "../pages/contents/faqs/GraduationSupplies";

//basic content sections
import Recognition from "../pages/contents/basic_content_sections/Recognition";
import MotivationalServices from "../pages/contents/basic_content_sections/MotivationalServices";
import PromotionalServices from "../pages/contents/basic_content_sections/PromotionalServices";
import Refunds from "../pages/contents/basic_content_sections/Refunds";
import Legal from "../pages/contents/basic_content_sections/Legal";
import Notes from "../pages/contents/basic_content_sections/Notes";

//products & packages
import ProductList from "../pages/products&packages/products/ProductList";
//categories
import CategoryList from "../pages/products&packages/categories/CategoryList";
//packages
import PackageList from "../pages/products&packages/packages/PackageList";

//orders & payments
import OrdersList from "../pages/orders&payments/orders/OrdersList";
import PaymentsList from "../pages/orders&payments/payments/PaymentsList";

//reports
import ReportsList from "../pages/reports/ReportsList";
import CustomPhotography from "../pages/contents/custom_photography/CustomPhotography";

//Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

//get user from local storage and find role

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      //my account
      {
        path: "/my-account",
        element: (
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        ),
      },

      //users
      {
        path: "/users/manage-users",
        element: (
          <ProtectedRoute requiredPermission="can_manage_users">
            <UserList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-user/:id",
        element: (
          <ProtectedRoute requiredPermission="can_manage_users">
            <EditUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-user",
        element: (
          <ProtectedRoute requiredPermission="can_manage_users">
            <AddUser />
          </ProtectedRoute>
        ),
      },
    ],
  },

  //students
  {
    path: "/",
    element: <LayoutApplications />,
    children: [
      {
        path: "/students/manage-students",
        element: (
          <ProtectedRoute requiredPermission="can_manage_students">
            <StudentList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/students/add-student",
        element: (
          <ProtectedRoute requiredPermission="can_manage_students">
            <AddStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/students/edit-student/:id/:tab",
        element: (
          <ProtectedRoute requiredPermission="can_manage_students">
            <Index />
          </ProtectedRoute>
        ),
      },
    ],
  },
  //schools
  {
    path: "/",
    element: <LayoutApplications />,
    children: [
      {
        path: "/schools/manage-schools",
        element: (
          <ProtectedRoute requiredPermission="can_manage_schools">
            <SchoolsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/schools/add-school",
        element: (
          <ProtectedRoute requiredPermission="can_manage_schools">
            <AddSchool />
          </ProtectedRoute>
        ),
      },
      {
        path: "/schools/edit-school/:id",
        element: (
          <ProtectedRoute requiredPermission="can_manage_schools">
            <EditSchool />
          </ProtectedRoute>
        ),
      },

      {
        path: "/schools/shipping-rules",
        element: (
          <ProtectedRoute requiredPermission="can_manage_schools">
            <h4>shipping rules</h4>
          </ProtectedRoute>
        ),
      },

      {
        path: "/schools/global-important-dates",
        element: (
          <ProtectedRoute requiredPermission="can_manage_schools">
            <h4>global important dates</h4>
          </ProtectedRoute>
        ),
      },
    ],
  },
  //website contents
  {
    path: "/",
    element: <LayoutApplications />,
    children: [
      {
        path: "/contents/sitemap",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <SiteMap />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/home-welcome",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <HomeWelcome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/home-multiple-section",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <HomeMultipleSection />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/facebook",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <Facebook />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/twitter",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <Twitter />
          </ProtectedRoute>
        ),
      },
      //catalog
      {
        path: "/contents/senior-catalog",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <SeniorCatalog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/class-ring-catalog",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <ClassRingCatalog />
          </ProtectedRoute>
        ),
      },

      //custom photography
      {
        path: "/contents/custom-photography",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <CustomPhotography />
          </ProtectedRoute>
        ),
      },

      //contact us
      {
        path: "/contents/picture-of-office-building",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <PictureOfOfficeBuilding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/picture-of-staff-1",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <PictureOfStaff1 />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/picture-of-staff-2",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <PictureOfStaff2 />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/picture-of-staff-3",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <PictureOfStaff3 />
          </ProtectedRoute>
        ),
      },

      //online orders
      {
        path: "/contents/terms-and-conditions",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <TermsAndConditions />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/shipping-message",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <ShippingMessage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/fee-configuration",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <FeeConfiguration />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/layaway-configuration",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <LayawayConfiguration />
          </ProtectedRoute>
        ),
      },

      //online payments
      {
        path: "/contents/payment-terms-and-conditions",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <PaymentTermsAndConditions />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/payment-class-rings",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <PaymentClassRings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/payment-graduation-supplies",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <PaymentGraduationSupplies />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/payment-letterman-jacket",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <PaymentLettermanJacket />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/payment-championship-rings",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <PaymentChampionshipRings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/payment-fee-configuration",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <PyemntFeeConfiguration />
          </ProtectedRoute>
        ),
      },

      //faqs
      {
        path: "/contents/rings",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <Rings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/cap-and-gown",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <CapAndDown />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/graduation-supplies",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <GraduationSupplies />
          </ProtectedRoute>
        ),
      },

      //basic content sections
      {
        path: "/contents/recognition",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <Recognition />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/motivational-services",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <MotivationalServices />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/promotional-services",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <PromotionalServices />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/refunds",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <Refunds />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/legal",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <Legal />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contents/notes",
        element: (
          <ProtectedRoute requiredPermission="can_access_site_map">
            <Notes />
          </ProtectedRoute>
        ),
      },
    ],
  },
  //products & packages
  {
    path: "/",
    element: <LayoutApplications />,
    children: [
      {
        path: "/products/manage-products",
        element: (
          <ProtectedRoute requiredPermission="can_manage_products">
            <ProductList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories/manage-categories",
        element: (
          <ProtectedRoute requiredPermission="can_manage_categories">
            <CategoryList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/packages/manage-packages",
        element: (
          <ProtectedRoute requiredPermission="can_manage_packages">
            <PackageList />
          </ProtectedRoute>
        ),
      },
    ],
  },
  //orders & payments
  {
    path: "/",
    element: <LayoutApplications />,
    children: [
      {
        path: "/orders/manage-orders",
        element: (
          <ProtectedRoute requiredPermission="can_manage_orders">
            <OrdersList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payments/manage-payments",
        element: (
          <ProtectedRoute requiredPermission="can_manage_payments">
            <PaymentsList />
          </ProtectedRoute>
        ),
      },
    ],
  },
  //reports
  {
    path: "/",
    element: <LayoutApplications />,
    children: [
      {
        path: "/reports/reports-builder",
        element: (
          <ProtectedRoute requiredPermission="can_use_report_builder">
            <ReportsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reports/standard-reports",
        element: (
          <ProtectedRoute requiredPermission="can_access_standard_report">
            <ReportsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reports/reports-by-school",
        element: (
          <ProtectedRoute requiredPermission="can_view_report_by_school">
            <h4>reports by school</h4>
          </ProtectedRoute>
        ),
      },
      {
        path: "/reports/item-reports",
        element: (
          <ProtectedRoute requiredPermission="can_view_report_by_item">
            <h4>item reports</h4>
          </ProtectedRoute>
        ),
      },
      {
        path: "/reports/all-offices",
        element: (
          <ProtectedRoute requiredPermission="can_access_all_offices">
            <h4>all offices</h4>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      {
        path: "/authentication/login",
        element: <LoginCover />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
];

// if (role === "Technical Admin") {
//   routes.push({
//     path: "/all",
//     element: (
//       <ProtectedRoute>
//         <Dashboard />,
//       </ProtectedRoute>
//     ),
//   });
// }
// else {
//   routes.push({
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       {
//         path: "/",
//         element: (
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         ),
//       },
//     ],
//   });
// }

export const router = createBrowserRouter(routes);
