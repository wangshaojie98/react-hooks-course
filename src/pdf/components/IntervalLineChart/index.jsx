import React from 'react';
import './style.scss';
// const colors = ["#73A0FA", "#73DEB3", "#63779A"];
const colors = [
    {
        bgColor: '#73A0FA',
        color: '#F6F6F6'
    },
    {
        bgColor: '#73DEB3',
        color: '#595959'
    },
    {
        bgColor: '#63779A',
        color: '#F6F6F6'
    }
];

const IntervalLineItem = ({ lines = [], isFirst = false, data = [], label = '' }) => {
    const baseClass = 'intervalLineItem';
    return (
        <div className={`${baseClass}`}>
            <div className={`${baseClass}__label`}>{label}</div>
            <div className={`${baseClass}__content`}>
                {
                    data.map((item, index) => {
                        const bgColor = colors[index % colors.length].bgColor;
                        const color = colors[index % colors.length].color;
                        return (
                            <div key={index} style={{ flex: item, backgroundColor: bgColor, color }}>
                                <span className={`${baseClass}__subContent`}>{`${Number(item * 100).toFixed(1)}%`}</span>
                            </div>
                        );
                    })
                }
                {
                    lines.map((item, index) => {
                        const titleStyle = { left: `${isFirst ? '-7px' : 0}`, top: `${isFirst ? '-20px' : 0}` };
                        const lineStyle = { left: `${item * 100}%`, height: `${isFirst ? '30px' : '24px'}`, top: `${isFirst ? '-10px' : '-4px'}` };
                        return (
                            <div className={`${baseClass}__line`} style={lineStyle} key={index}>
                                {
                                    isFirst && (
                                        <span className={`${baseClass}__lineTitle`} style={titleStyle}>{`${item * 100}%`}</span>
                                    )
                                }
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

// position="label*value" label代表标识，value代表数据，标识*数据可以自定义key
const IntervalLine = ({ category = [], lines = [], data = [], position = 'label*value' }) => {
    const baseClass = 'itervalLine';
    const keyMap = position.split('*');
    return (
        <section className={`${baseClass}`}>
            <ul>
                {
                    category.map((item, index) => {
                        const bgColor = colors[index % colors.length].bgColor;
                        return (
                            <li key={index}>
                                <span className="colorBlock" style={{ backgroundColor: bgColor }} />
                                {item}
                            </li>
                        );
                    })
                }
            </ul>
            <main>
                {
                    data.map((item, index) => (
                        <IntervalLineItem
                            key={index}
                            lines={lines}
                            isFirst={index === 0}
                            data={item[keyMap[1]]}
                            label={item[keyMap[0]]}
                        />
                    ))
                }
            </main>
        </section>
    );
};

export default IntervalLine;