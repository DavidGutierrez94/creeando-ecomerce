
import React from 'react';
import Emoji from 'a11y-react-emoji';
import Sider from './components/nav/sider';
import { Skeleton } from 'antd';

const Home = () => {
    return (
      <>        
        <div>
          <div className="row">
          <div className="col-md-2">
              <Sider/>
            </div>
          <div className="col-md-10 offset-md-2">
            <Skeleton.Image />
            <Skeleton active/>
            </div>

          </div>

        </div>
      </>
  
    );
  }
  
  export default Home;
  