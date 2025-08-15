// import React from 'react'
// import PageHeaderDate from '@/components/shared/pageHeader/PageHeaderDate'
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";

const Home = () => {
  return (
    <>
      <PageHeader>{/* <PageHeaderDate /> */}</PageHeader>
      <h1>Home</h1>
      <div className="main-content">
        <div className="row">
          {/* <SiteOverviewStatistics />
                    <PaymentRecordChart />
                    <SalesMiscellaneous isFooterShow={true} dataList={projectsDataTwo} />
                    <TasksOverviewChart />
                    <LeadsOverviewChart chartHeight={315} />
                    <LatestLeads title={"Latest Leads"} />
                    <Schedule title={"Upcoming Schedule"} />
                    <Project cardYSpaceClass="hrozintioal-card" borderShow={true} title="Project Status" />
                    <TeamProgress title={"Team Progress"} footerShow={true} /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
