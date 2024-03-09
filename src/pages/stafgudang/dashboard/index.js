import React from 'react';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/stafgudang';
import Header from '../../../components/header';
import TabDash from '../../../components/tabDashboard';

const Dashboard = (props) => {

  return (
    <div className='flex w-screen h-screen'>
        <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
        <div className='w-full h-screen flex flex-col'>
            <Header title=''/>
            <div className="text-3xl font-bold mb-10 ml-10 mt-8">Dashboard</div>
            <TabDash />
        </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);