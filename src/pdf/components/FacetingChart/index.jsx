import React from 'react';
import './style.scss';
// const colors = ["#73A0FA", "#73DEB3", "#63779A"];
const _defaultColor = '#FFCCC7';

const FacetingItem = ({ data = [], label = '', defaultColor = _defaultColor }) => {
    const baseClass = 'facetingItem';
    return (
        <div className={`${baseClass}`}>
            <div className={`${baseClass}__label`}>{label}</div>
            <div className={`${baseClass}__content`}>
                {
                    data.map((item, index) => {
                        const bgColor = defaultColor;
                        const width = `${item * 100}%`;

                        const style = { width, backgroundColor: bgColor };
                        return (
                            <div key={index} className={`${baseClass}__subItem`} >
                                <div style={style} >
                                    <span className={`${baseClass}__subContent`}>{`${Number(item * 100).toFixed(1)}%`}</span>

                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

// position="label*value" label代表标识，value代表数据，标识*数据可以自定义key
const Faceting = ({ category = [], data = [], position = 'label*value', defaultColor }) => {
    const baseClass = 'faceting';
    const keyMap = position.split('*');
    return (
        <section className={`${baseClass}`}>
            <ul>
                {
                    category.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))
                }
            </ul>
            <main>
                {
                    data.map((item, index) => (
                        <FacetingItem
                            key={index}
                            isFirst={index === 0}
                            data={item[keyMap[1]]}
                            label={item[keyMap[0]]}
                            defaultColor={defaultColor}
                        />
                    ))
                }
            </main>
        </section>
    );
};

export default Faceting;