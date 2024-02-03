import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Tabs = ({ children, isTabsVisible, wrapperRef }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex mt-4 items-start relative">
      <div
        className={`bg-white transition-[max-width] absolute left-4 top-0 shadow-lg md:shadow-sm overflow-hidden md:overflow-visible  md:h-auto md:static ${
          isTabsVisible ? 'max-w-[220px]' : 'max-w-0 md:max-w-[220px]'
        }`}
      >
        <div ref={wrapperRef}>
          <ul className="flex flex-col border w-[220px]">
            {children.map((child) => {
              const { label, icon } = child.props;
              return (
                <li
                  className={`flex items-center px-2 border-b ${
                    activeTab === label ? 'border-blue-500' : ''
                  }`}
                  key={label}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    color={`${activeTab === label ? '#074498' : '#475569'}`}
                  />
                  <button
                    onClick={() => onClickTabItem(label)}
                    className={`text-left w-full p-4 ${
                      activeTab === label ? 'text-brand' : 'text-slate-600'
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="px-4 w-full">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
