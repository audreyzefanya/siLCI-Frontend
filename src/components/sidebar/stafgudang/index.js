import React, { useEffect, useState } from 'react';
import { PiArrowsClockwiseDuotone, PiArrowsClockwiseFill, PiCaretLeft, PiCaretRight, PiChartPieDuotone, PiChartPieFill, PiGearDuotone, PiGearFill, PiNotebookDuotone, PiNotebookFill, PiUserDuotone, PiUserFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import Menu from '../../menu';
import Logo from '../../../assets/images/Logo_LC.png';

const Sidebar = (props) => {
    const [menu, setMenu] = useState([
        {
            currentNavigation: 1,
            logo: [PiChartPieDuotone, PiChartPieFill],
            title: 'Home',
            urlLink: '/staf-gudang/dashboard',
            isOpen: false,
            subMenu: [],
        },
        {
            currentNavigation: 2,
            logo: [PiNotebookDuotone, PiNotebookFill],
            title: 'Inventory',
            // urlLink: '/system-admin/report',
            isOpen: false,
            subMenu: [
                {
                    currentNavigation: 2.1,
                    logo: [PiGearDuotone, PiGearFill],
                    title: 'Daftar Gudang',
                    urlLink: '/staf-gudang/daftar-gudang',
                },
                {
                    currentNavigation: 2.2,
                    logo: [PiGearDuotone, PiGearFill],
                    title: 'Daftar Pabrik',
                    urlLink: '/staf-gudang/pabrik',
                },
            ],
        },

    ]);
    const [scout, setScout] = useState(null);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (props.currentNavigation != null) {
            const parentNavigation = Math.floor(props.currentNavigation);
            setScout(props.currentNavigation);
            setMenu((prevData) =>
                prevData.map((item) =>
                item.currentNavigation === parentNavigation
                    ? { ...item, isOpen: true }
                    : item
                )
            );
        }
    }, [props.currentNavigation]);

    const handleChangeNavigation = (currentNavigation, urlLink) => {
        setScout(currentNavigation);
        setMenu((prevData) =>
            prevData.map((item) =>
                item.currentNavigation === currentNavigation
                ? { ...item, isOpen: !item.isOpen }
                : item
            )
        );
        if (urlLink) {
            navigateTo(urlLink);
        }
    };

  return (
    <div
        className={`${
            props.isExpand ? 'w-56' : 'w-20'
        } h-screen flex flex-col bg-white border-r border-neutral40`}
    >
        <div
            className={`${
                props.isExpand ? 'px-10' : ''
            } flex justify-center items-center py-4 h-16 border-b border-neutral40`}
        >
            {props.isExpand ? (
                <img src={Logo} alt="Logo" style={{ width: '75px', height: 'auto' }} />
            ) : (
                <img src={Logo} alt="Logo" style={{ width: '60px', height: 'auto' }} />
            )}
        </div>
        <div className='flex items-center justify-center border-b border-neutral40 py-3.5 px-2 cursor-pointer' onClick={props.onClick}>
            {props.isExpand ? (
            <>
                <PiCaretLeft size="20" className='text-neutral300' />
                <p className='text-neutral300 font-semibold ml-3 text-sm'>Hide Menu</p>
            </>
            ) : (
                <PiCaretRight size="20" className='text-neutral300' />
            )}
        </div>
        <div className='py-6 px-3 flex-1 overflow-y-auto no-scrollbar'>
            <div>
                {menu.map((value) => (
                    <React.Fragment key={value.currentNavigation}>
                        <div onClick={() => handleChangeNavigation(value.currentNavigation, value.urlLink)}>
                            <Menu
                                isActive={props.isExpand ? value.currentNavigation === scout : value.currentNavigation === Math.floor(scout)}
                                title={value.title}
                                iconMenuActive={value.logo[1]}
                                iconMenuPassive={value.logo[0]}
                                type='parent'
                                urlLink={value.urlLink}
                                isHaveChild={value.subMenu.length !== 0}
                                isExpand={props.isExpand}
                                isOpen={value.isOpen}
                                subMenu={value.subMenu}
                            />
                        </div>
                        {value.isOpen && props.isExpand &&
                            value.subMenu.map((subValue) => (
                            <div>
                                <div onClick={() => handleChangeNavigation(subValue.currentNavigation, subValue.urlLink)}>
                                    <Menu
                                        key={subValue.currentNavigation}
                                        isActive={subValue.currentNavigation === scout}
                                        title={subValue.title}
                                        iconMenuActive={subValue.logo[1]}
                                        iconMenuPassive={subValue.logo[0]}
                                        type='child'
                                        urlLink={subValue.urlLink}
                                        isExpand={props.isExpand}
                                    />
                                </div>
                            </div>
                            ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Sidebar;