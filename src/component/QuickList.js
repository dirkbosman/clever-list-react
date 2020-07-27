import React, { useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import QuickListData from "../Data/QuickListData";

import "react-tabs/style/react-tabs.css";

class HideAndShowDivOnClick extends React.Component {
  state = {
    showDiv: false,
  };

  onButtonPress = (event) => {
    const id = event.target.innerHTML;
    const quickItem = this.props.createInput.current;
    quickItem.value = id;
  };

  render() {
    const { showDiv } = this.state;
    return (
      <div className="quicklist-container">
        <button
          className="quicklist"
          onClick={() => this.setState({ showDiv: !showDiv })}
        >
          {showDiv ? "Hide Quicklist" : "Show Quicklist"}
        </button>
        {showDiv && (
          <Tabs>
            <TabList>
              {Object.keys(QuickListData).map((v, i) => (
                <Tab key={i}>{v}</Tab>
              ))}
            </TabList>
            {Object.keys(QuickListData).map((v, index) => (
              <TabPanel key={index}>
                <h3>{v}</h3>
                <ul className="quicklist-content">
                  {QuickListData[v].map((item, itemIndex) => (
                    <li className="quicklist-item" key={itemIndex}>
                      <button
                        className="quicklist-item-btn"
                        onClick={this.onButtonPress}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            ))}
          </Tabs>
        )}
      </div>
    );
  }
}

export default HideAndShowDivOnClick;
