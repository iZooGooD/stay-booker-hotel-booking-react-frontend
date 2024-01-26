import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto">
      <ul className="flex border-b">
        {children.map((child) => {
          const { label } = child.props;

          return (
            <li
              className={`mr-2 ${activeTab === label ? 'border-blue-500' : ''}`}
              key={label}
            >
              <button
                onClick={() => onClickTabItem(label)}
                className={`inline-flex p-4 ${
                  activeTab === label
                    ? 'text-brand border-b-2 text-lg font-bold'
                    : 'text-slate-600 text-lg font-bold'
                }`}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="p-4">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
