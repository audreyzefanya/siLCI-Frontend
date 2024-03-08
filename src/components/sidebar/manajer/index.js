import React, { useEffect, useState } from 'react';
import { PiArrowsClockwiseDuotone, PiArrowsClockwiseFill, PiCaretLeft, PiCaretRight, PiChartPieDuotone, PiChartPieFill, PiGearDuotone, PiGearFill, PiNotebookDuotone, PiNotebookFill, PiUserDuotone, PiUserFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import Menu from '../../menu';

const Sidebar = (props) => {
    const [menu, setMenu] = useState([
        {
            currentNavigation: 1,
            logo: [PiChartPieDuotone, PiChartPieFill],
            title: 'Home',
            urlLink: '/manager-operasional/dashboard',
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
                    urlLink: '',
                },
                {
                    currentNavigation: 2.2,
                    logo: [PiGearDuotone, PiGearFill],
                    title: 'Daftar Pabrik',
                    urlLink: '',
                },
                {
                    currentNavigation: 2.3,
                    logo: [PiGearDuotone, PiGearFill],
                    title: 'Daftar Barang',
                    urlLink: '/barang',
                },
            ],
        },
        {
            currentNavigation: 3,
            logo: [PiArrowsClockwiseDuotone, PiArrowsClockwiseFill],
            title: 'Sales',
            urlLink: '',
            isOpen: false,
            subMenu: [
                {
                    currentNavigation: 3.1,
                    logo: [PiArrowsClockwiseDuotone, PiArrowsClockwiseFill],
                    title: 'Client Integration',
                    // urlLink: '/system-admin/client-integration',
                },
                {
                    currentNavigation: 3.1,
                    logo: [PiArrowsClockwiseDuotone, PiArrowsClockwiseFill],
                    title: 'Biller Integration',
                    // urlLink: '/system-admin/biller-integration',
                },
            ],
        },
        {
            currentNavigation: 4,
            logo: [PiUserDuotone, PiUserFill],
            title: 'Procurement',
            urlLink: '',
            isOpen: false,
            subMenu: [
                {
                    currentNavigation: 4.1,
                    logo: [PiUserDuotone, PiUserFill],
                    title: 'Client',
                    // urlLink: '/system-admin/dashboard-client',
                },
                {
                    currentNavigation: 4.2,
                    logo: [PiUserDuotone, PiUserFill],
                    title: 'User',
                    // urlLink: '/system-admin/dashboard-user',
                },
            ],
        },
        {
            currentNavigation: 5,
            logo: [PiUserDuotone, PiUserFill],
            title: 'Shipment',
            urlLink: '',
            isOpen: false,
            subMenu: [
                {
                    currentNavigation: 4.1,
                    logo: [PiUserDuotone, PiUserFill],
                    title: 'Client',
                    // urlLink: '/system-admin/dashboard-client',
                },
                {
                    currentNavigation: 4.2,
                    logo: [PiUserDuotone, PiUserFill],
                    title: 'User',
                    // urlLink: '/system-admin/dashboard-user',
                },
            ],
        },

        {
            currentNavigation: 6,
            logo: [PiGearDuotone, PiGearFill],
            title: 'Settings',
            urlLink: '',
            isOpen: false,
            subMenu: [
                {
                    currentNavigation: 6.1,
                    logo: [PiGearDuotone, PiGearFill],
                    title: 'Register Member',
                    urlLink: '/manager-operasional/register',
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
                <img src="" alt="Logo" />
            ) : (
                <img src="" alt="Logo" />
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